import Header from "./Header.js";
import TodoForm from "./TodoForm.js";
import TodoList from "./TodoList.js";
import { request } from "./api.js";

export default function App({ $target }) {
    this.state = {
        username: 'roto',
        todos: [],
        isTodoLoading: false
    }

    const header = new Header({
        $target,
        initialState: {
            username: this.state.username,
            isLoading: this.state.isTodoLoading
        }
    })

    new TodoForm({
        $target,
        onSubmit: async (content) => {
            const todo = {
                content,
                inCompleted: false
            }

            // 낙관적 업데이트
            this.setState({
                ...this.state,
                todos: [
                    ...this.state.todos,
                    todo
                ]
            })

            await request(`/${this.state.username}?delay=3000`, {
                method: 'POST',
                body: JSON.stringify(todo)
            });

            await fetchTodos();
        }
    })

    this.setState = nextState => {
        this.state = nextState;

        header.setState({
            username: this.state.username,
            isLoading: this.state.isTodoLoading
        })
        
        todoList.setState({
            isLoading: this.state.isTodoLoading,
            todos: this.state.todos
        });
    };
    
    const todoList = new TodoList({
        $target,
        initialState: {
            isLoading: this.state.isTodoLoading,
            todos: this.state.todos
        },
        onToggle: async (id) => {
            //낙관적 업데이트
            const todoIndex = this.state.todos.findIndex(todo => todo._id === id);
            const nextTodos = [...this.state.todos];

            nextTodos[todoIndex].isCompleted = !nextTodos[todoIndex].inCompleted;
            this.setState({
                ...this.state,
                todos: nextTodos
            })

            await request(`/${this.state.username}/${id}/toggle`, {
                method: 'PUT'
            })

            await fetchTodos();
        },
        onRemove: async (id) => {
            //낙관적 업데이트
            const todoIndex = this.state.todos.findIndex(todo => todo._id === id);
            const nextTodos = [...this.state.todos];

            nextTodos.splice(todoIndex, 1);

            this.setState({
                ...this.state,
                todos: nextTodos
            })

            await request(`/${this.state.username}/${id}`, {
                method: 'DELETE'
            })
            await fetchTodos();
        }
    });   

    const fetchTodos = async () => {
        const { username } = this.state;

        if (this.state.username) {
            this.setState({ 
                ...this.state,
                isTodoLoading: true
            });

            const todos = await request(`/${username}`);

            this.setState({
                ...this.state,
                todos,
                isTodoLoading: false
            });
        }
    }

    fetchTodos();
}
