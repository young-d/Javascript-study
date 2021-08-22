import Header from './Header.js';
import TodoForm from './TodoForm.js';
import TodoList from './TodoList.js';
import TodoCount from './TodoCount.js';

export default function App({ $target }) {
    this.state = {
        completedCount: 0,
        totalCount: 0
    }

    //header 추가
    new Header({ 
        $target,
        text: '간단 Todo list!' 
    });

    //폼 추가
    new TodoForm({
        $target,
        //onSubmit 콜백에서 todolist.setState 호출하기
        onSubmit: (text) => {
            const nextState = [...todoList.state, {
                id: todoList.state.length,
                text,
                isCompleted: false
            }];

            todoList.setState(nextState ? nextState : todoList.state);

            this.state.totalCount = todoList.state.length;
            
            todoCount.setState(this.state);
        } 
    });

    //todo list 변경시켜보기
    const todoList = new TodoList({
        $target,
        initialState: [],
        onClick: (id) => {
            const nextState = [];
            todoList.state.map(todo => {
                todo.id === parseInt(id) ? nextState.push({ id: todo.id, text: todo.text, isCompleted: !todo.isCompleted }) : nextState.push(todo);
            });

            todoList.setState(nextState.length ? nextState : todoList.state);

            this.state.completedCount = todoList.state.reduce((acc, todo) => {
                if (todo.isCompleted) acc++;
                return acc;
            }, 0);

            todoCount.setState(this.state);
        }
    });

    const todoCount = new TodoCount({
        $target,
        initialState: this.state
    })
    

}