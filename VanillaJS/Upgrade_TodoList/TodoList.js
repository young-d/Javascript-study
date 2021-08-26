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
        this.state = nextState;
        this.render();
    }

    this.render = () => {
        $todoList.innerHTML = `
            <ul>
                ${this.state.map(({ id, text, isCompleted }) => 
                    `<li data-id=${id} class="todos">
                        <input type="checkbox" ${isCompleted ? 'checked' : ''}>
                        <label style="text-decoration: ${isCompleted ?  "line-through" : ''};">${text}</label>
                        <button class="deleteButton">🗑</button>
                    </li>`)
                    .join('')
                }
            </ul>
        `;        

        document.querySelectorAll('.todos').forEach((todo) => {
            const { id } = todo.dataset;
            const $checkBox = todo.firstElementChild;
            const $deleteButton = todo.lastElementChild;

            $checkBox.addEventListener('change', (e) => {
                onChange(parseInt(id));
            });

            $deleteButton.addEventListener('click', (e) => {
                onClick(parseInt(id));
            })
        });
    }
    
    this.render();
}
