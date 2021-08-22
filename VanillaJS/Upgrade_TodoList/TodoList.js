//params.$target - 해당 컴포넌트가 추가가 될 DOM 엘리먼트
//params.initialState - 해당 컴포넌트의 초기 상태
export default function TodoList({ $target, initialState, onClick }) {
    const $todoList = document.createElement('div');
    $target.appendChild($todoList);

    //현재 내 상태를 기준으로 render하기
    this.state = initialState ? initialState : null;

    //Todo List의 상태를 변하게 하기
    this.setState = nextState => {
        this.state = nextState ? nextState : this.state;
        this.render();
    }

    this.render = () => {
        $todoList.innerHTML = `
            <ul id="todoList">
                ${this.state.map(({ text, id, isCompleted }) => 
                    `<li completed=${isCompleted}>
                        <label>${text}</label><button class="check" id=${id}>완료</button>
                    </li>`)
                    .join('')
                }
            </ul>
        `;

        const todos = $todoList.getElementsByTagName('label');
        
        for (const todo of todos) {
            if (todo.parentElement.getAttribute("completed") === 'true') {
                todo.style.textDecoration = 'line-through';
                todo.nextElementSibling.textContent = '✅';
            } else {
                todo.style.textDecoration = '';
                todo.nextElementSibling.textContent = '🟩';
            }
        }

        //초기화하면서 클릭 이벤트 추가해주기 (토글기능)
        const buttons = $todoList.getElementsByTagName('button');

        for (const b of buttons) {
            b.addEventListener('click', (e) => {
                onClick(e.target.id);
            })
        }
    }
    
    //생성되자마자 렌더링 된다.
    this.render();
   
}