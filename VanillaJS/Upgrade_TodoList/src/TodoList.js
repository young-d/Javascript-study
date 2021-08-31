import { isInstance } from "./instance.js";

export default function TodoList({ $target, initialState, onToggleCompleted, onRemoveTodo }) {
    //new 연산자 없을 경우
    if (!isInstance(this, TodoList)) {
        return new TodoList({ $target, initialState, onToggleCompleted, onRemoveTodo });
    }

    const $todoList = document.createElement('div');
    $target.appendChild($todoList);

    this.state = initialState;

    this.setState = nextState => {
        this.state = nextState;
        this.render();
    }

    this.render = () => {
        $todoList.innerHTML = `
            <ul>
                ${this.state.map(({ id, text, isCompleted }) => 
                    `<li data-id=${id} class="todos">
                        <input type="checkbox" class="checkbox" ${isCompleted ? 'checked' : ''}>
                        <label style="text-decoration: ${isCompleted ?  "line-through" : ''};">${text}</label>
                        <button class="deletebutton">🗑</button>
                    </li>`)
                    .join('')
                }
            </ul>
        `;        

        document.querySelectorAll('.todos').forEach((todo) => {
            const { id } = todo.dataset;
            const $checkBox = todo.getElementsByClassName('checkbox').item(0);
            const $deleteButton = todo.getElementsByClassName('deletebutton').item(0);

            $checkBox.addEventListener('change', (e) => {
                onToggleCompleted(parseInt(id));
            });

            $deleteButton.addEventListener('click', (e) => {
                onRemoveTodo(parseInt(id));
            })
        });
    }
    
    this.render();
}
