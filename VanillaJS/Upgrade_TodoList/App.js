import Header from './Header.js';
import TodoForm from './TodoForm.js';
import TodoList from './TodoList.js';
import TodoCount from './TodoCount.js';
import { setItem , getItem } from './storage.js';
import { validateTextMaxLength, validateDuplication } from './validation.js';

export default function App({ $target, initialState }) {
    this.state = initialState;

    this.setState = nextState => {
        this.state = nextState;
    }

    //nextState로 업데이트해주는 함수
    const setTodos = nextState => {
        todoList.setState(nextState);
        setItem('todos', JSON.stringify(nextState));
        this.setState(nextState);
    }

    //완료된 todo 개수 카운팅하는 함수
    const countCompletedTodo = () => {
        this.state
        .filter(todo => todo.isCompleted)
        .length
    }

    Header({ 
        $target,
        text: 'Upgrade Todo list!' 
    });

    TodoForm({
        $target,
        onSubmit: (text) => {
            const nextState = this.state;

            //text 길이, 중복여부 체크
            if (validateTextMaxLength(text) 
                && validateDuplication(text, nextState)
                ) {
                nextState.push({
                    id: (nextState.length > 0 ? nextState[nextState.length - 1].id : 0) + 1,
                    text,
                    isCompleted: false
                });
                
                setTodos(nextState);
                
                todoCount.setState({
                    completedCount: todoCount.state.completedCount,
                    totalCount: this.state.length
                });
            }
        } 
    });

    const todoList = TodoList({
        $target,
        initialState: this.state,
        onChange: (id) => {
            const nextState = this.state.map(todo => {
                if(todo.id === id) {
                    todo.isCompleted = !todo.isCompleted;
                }
                return todo;
            });

            setTodos(nextState);

            todoCount.setState({
                completedCount: countCompletedTodo(),
                totalCount: todoCount.state.totalCount
            });
        },
        onClick: (id) => {
            const nextState = this.state.filter(todo => todo.id !== id);

            setTodos(nextState);

            todoCount.setState({
                completedCount: countCompletedTodo(),
                totalCount: this.state.length
            });
        }
    });

    const todoCount = TodoCount({
        $target,
        initialState: {
            completedCount: countCompletedTodo(),
            totalCount: this.state.length
        }
    })
}
