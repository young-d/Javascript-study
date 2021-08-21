//form과 관련된 일을 처리
export default function TodoForm({ $target, onSubmit }) {
    const $form = document.createElement('form');

    $target.appendChild($form);

    //플래그
    let isInit = false;

    this.render = () => {
        $form.innerHTML = `
            <input type="text" name="todo" />
            <button>submit</button>
        `;

        //submit 이벤트
        if (!isInit) {
            $form.addEventListener('submit', e => {
                e.preventDefault(); //기존 submit 이벤트 제거

                const $todo = $form.querySelector('input[name=todo]');
                const text = $todo.value;

                //2글자 이상 입력했을 때만 onSubmit 호출
                if (text.length > 1) {
                    //submit후에 todo form은 항상 초기화 해준다 (form이 고칠 일 있으면 form만 고치면 된다!)
                    $todo.value = '';
                    //onSubmit의 구현은 외부에서 알아서 하고 submit할 때 onSubmit호출만 todoForm에서 해준다
                    onSubmit(text);
                }
            })
            isInit = true;
        }
    }

    this.render();
}