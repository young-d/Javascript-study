export default function TodoList({ $target, initialState, onClick }) {
    //new 연산자 없을 경우
    if (!(this instanceof TodoList)) {
        console.error('There is no new operator');
        //new로 다시 생성해주기
        return new TodoList({ $target, initialState, onClick });
    }

    const $todoList = document.createElement('div');
    $target.appendChild($todoList);

    this.state = initialState;

    this.setState = nextState => {
        this.state = nextState ? nextState : this.state;
        this.render();
    }

    this.render = () => {
        $todoList.innerHTML = `
            <ul style="list-style:none;">
                ${this.state.map(({ id, text, isCompleted }) => 
                    `<li class="todos" completed=${isCompleted}>
                        <input type="checkbox" id=${id} class="check">
                        <label class="contents">${text}</label>
                    </li>`)
                    .join('')
                }
            </ul>
        `;

        //completed 상태에 따라 취소선 및 체크박스 스타일 설정
        document.querySelectorAll('.todos').forEach((todo) => {
            const completed = todo.getAttribute('completed');
            const $checkBox = todo.firstElementChild;
            const $label = todo.lastElementChild;

            if (completed === 'true') {
                $checkBox.checked = true;
                $label.style.textDecoration = 'line-through';
            } else {
                $checkBox.checked = false;
                $label.style.textDecoration = '';
            }
        });

        //checkbox 클릭이벤트
        document.querySelectorAll('.check').forEach(check => {
            const todoId = parseInt(check.getAttribute('id'));

            check.addEventListener('click', (e) => {
                onClick(todoId);
            })
        })
    }
    
    this.render();
}
