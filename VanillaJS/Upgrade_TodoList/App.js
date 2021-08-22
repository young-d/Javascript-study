import Header from './Header.js';
import TodoForm from './TodoForm.js';
import TodoList from './TodoList.js';
import TodoCount from './TodoCount.js';
import { setItem , getItem } from './storage.js';

export default function App({ $target }) {
    //header 추가
    new Header({ 
        $target,
        text: 'Upgrade Todo list!' 
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

            setItem('todos', JSON.stringify(nextState));

            // this.state.totalCount = todoList.state.length;
            
            todoCount.setState({
                completedCount: todoCount.state.completedCount,
                totalCount: getItem('todos', []).length
            });
        } 
    });

    //todo list 변경시켜보기
    const todoList = new TodoList({
        $target,
        initialState: getItem('todos', []),
        onClick: (id) => {
            const nextState = [];
            todoList.state.map(todo => {
                todo.id === parseInt(id) ? nextState.push({ id: todo.id, text: todo.text, isCompleted: !todo.isCompleted }) : nextState.push(todo);
            });

            todoList.setState(nextState.length ? nextState : todoList.state);

            setItem('todos', JSON.stringify(nextState));

            // todoCount.setState(this.state);
            todoCount.setState({
                completedCount: getItem('todos', []).reduce((acc, todo) => {
                    if (todo.isCompleted) acc++;
                    return acc;
                }, 0),
                totalCount: todoCount.state.totalCount
            });
        }
    });

    const todoCount = new TodoCount({
        $target,
        initialState: {
            completedCount: getItem('todos', []).reduce((acc, todo) => {
                if (todo.isCompleted) acc++;
                return acc;
            }, 0),
            totalCount: getItem('todos', []).length
        }
    })
    

}