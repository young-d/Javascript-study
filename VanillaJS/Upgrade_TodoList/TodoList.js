export default function TodoList({ $target, initialState, onChange, onClick }) {
    //new 연산자 없을 경우
    if (!(this instanceof TodoList)) {
        console.error('There is no new operator');
        //new로 다시 생성해주기
        return new TodoList({ $target, initialState, onChange, onClick });
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
                    `<li id=${id} class="todos" completed=${isCompleted}>
                        <input type="checkbox" class="check">
                        <label class="content">${text}</label>
                        <button class="deleteButton">🗑</button>
                    </li>`)
                    .join('')
                }
            </ul>
        `;        

        document.querySelectorAll('.todos').forEach((todo) => {
            const $checkBox = todo.children[0];
            const $label = todo.children[1];
            const $deletButton = todo.children[2];
            const todoId = parseInt(todo.id);
            
            if (todo.getAttribute('completed') === 'true') {
                $checkBox.checked = true;
                $label.style.textDecoration = 'line-through';
            } else {
                $checkBox.checked = false;
                $label.style.textDecoration = '';
            }

            $checkBox.addEventListener('change', (e) => {
                onChange(todoId);
            });

            $deletButton.addEventListener('click', (e) => {
                onClick(todoId);
            })
        });
    }
    
    this.render();
}
