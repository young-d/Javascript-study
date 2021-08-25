import Header from './Header.js';
import TodoForm from './TodoForm.js';
import TodoList from './TodoList.js';
import TodoCount from './TodoCount.js';
import { setItem } from './storage.js';
import { validateTextMaxLength, validateDuplication } from './validation.js';

export default function App({ $target, initialState }) {
    this.state = initialState;

    this.setState = nextState => {
        this.state = nextState;
        todoList.setState(nextState);
        todoCount.setState({
            completedCount: nextState
                            .filter(todo => todo.isCompleted)
                            .length,
            totalCount: nextState.length
        })
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

                setItem('todos', JSON.stringify(nextState));

                this.setState(nextState);
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

            setItem('todos', JSON.stringify(nextState));

            this.setState(nextState);
        },
        onClick: (id) => {
            const nextState = this.state.filter(todo => todo.id !== id);

            setItem('todos', JSON.stringify(nextState));

            this.setState(nextState);
        }
    });

    const todoCount = TodoCount({
        $target,
        initialState: {
            completedCount: this.state
                            .filter(todo => todo.isCompleted)
                            .length,
            totalCount: this.state.length
        }
    })
}
