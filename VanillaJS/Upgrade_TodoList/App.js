import Header from './Header.js';
import TodoForm from './TodoForm.js';
import TodoList from './TodoList.js';
import TodoCount from './TodoCount.js';
import { setItem } from './storage.js';
import { validateTextMaxLength, validateDuplication } from './validation.js';

export default function App({ $target, initialState }) {
    this.state = {
        todos: initialState
    };

    this.setState = nextState => {
        this.state.todos = nextState;
        todoList.setState(nextState);
        todoCount.setState({
            completedCount: nextState
                            .filter(todo => todo.isCompleted)
                            .length,
            totalCount: nextState.length
        })

        setItem('todos', JSON.stringify(nextState));
    };

    Header({ 
        $target,
        text: '✍️ Record Your Todo' 
    });

    TodoForm({
        $target,
        onSubmit: (text) => {
            const nextState = this.state.todos;

            //text 길이, 중복여부 체크
            if (validateTextMaxLength(text) 
                && validateDuplication(text, nextState)
                ) {
                nextState.push({
                    id: (nextState.length > 0 ? nextState[nextState.length - 1].id : 0) + 1,
                    text,
                    isCompleted: false
                });

                this.setState(nextState);
            }
        } 
    });

    const todoList = TodoList({
        $target,
        initialState: this.state.todos,
        onToggleCompleted: (id) => {
            const nextState = this.state.todos.map(todo => {
                if(todo.id === id) {
                    todo.isCompleted = !todo.isCompleted;
                }
                return todo;
            });

            this.setState(nextState);
        },
        onRemoveTodo: (id) => {
            const nextState = this.state.todos.filter(todo => todo.id !== id);

            this.setState(nextState);
        }
    });

    const todoCount = TodoCount({
        $target,
        initialState: {
            completedCount: this.state.todos
                            .filter(todo => todo.isCompleted)
                            .length,
            totalCount: this.state.todos.length
        }
    })
}
