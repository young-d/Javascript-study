export default function TodoForm({ $target, onSubmit }) {
    //new 연산자 없을 경우
    if (!(this instanceof TodoForm)) {
        console.error('There is no new operator');
        //new로 다시 생성해주기
        return new TodoForm({ $target, onSubmit });
    }
    
    const $form = document.createElement('form');
    $target.appendChild($form);

    //플래그
    let isInit = false;

    this.render = () => {
        $form.innerHTML = `
            <input type="text" name="todo"/>
            <button id="addButton">+</button>
        `;

        //submit 이벤트
        if (!isInit) {
            $form.addEventListener('submit', e => {
                e.preventDefault(); //기존 submit 이벤트 제거

                const $todo = $form.querySelector('input[name=todo]');
                const text = $todo.value;

                if (text.length > 0) {
                    $todo.value = '';
                    onSubmit(text);
                }
            })
            isInit = true;
        }
    }

    this.render();
}
