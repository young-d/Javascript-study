export default function TodoList({ $target, initialState, onToggle, onRemove }) {
    const $todo = document.createElement('div');

    $target.appendChild($todo);

    this.state = initialState;

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    }

    this.render = () => {
        const { isLoading, todos } = this.state;

        //로딩 중일 때/목록이 없을 때 처리
        if (!isLoading && todos.length === 0) {
            $todo.innerHTML = 'Todo가 없어요!';
            return;
        }

        $todo.innerHTML = /* html */ `
            <ul>
                ${todos.map(({ _id, content, isCompleted }) => `
                    <li data-id="${_id}" class="todo-item">
                        ${isCompleted ? `<s>${content}</s>` : content}
                        <button class="remove">x</button>
                    </li>
                `).join('')}
            </ul>
        `
    }

    $todo.addEventListener('click', (e) => {
        const $li = e.target.closest('.todo-item');

        if ($li) {
            const { id } = $li.dataset;

            // 실제 이벤트를 발생시킨 곳을 찾아서 이벤트 추가해주기
            const { className } = e.target;
    
            if (className === 'remove') {
                onRemove(id);
            } else {
                onToggle(id);
            }
        }

    })

    this.render();
}