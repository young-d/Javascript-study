import Header from "./Header.js";
import TodoForm from "./TodoForm.js";
import TodoList from "./TodoList.js";
import { request } from "./api.js";

export default function App({ $target }) {
    this.state = {
        username: 'roto',
        todos: []
    }

    new Header({
        $target,
        initialState: this.state.username
    })

    new TodoForm({
        $target,
        onSubmit: async (content) => {
            await request(`/${this.state.username}`, {
                method: 'POST',
                body: JSON.stringify({
                    content, 
                    isCompleted: false
                })
            });

            await fetchTodo();
        }
    })

    this.setState = nextState => {
        this.state = nextState;
        
        todoList.setState({
            isTodoLoading: this.state.isTodoLoading,
            todos: this.state.todos
        });
    };
    
    const todoList = new TodoList({
        $target,
        initialState: {
            isTodoLoading: this.state.isTodoLoading,
            todos: this.state.todos
        },
        onToggle: (id) => {
            alert(`${id} 토글 예정`);
        },
        onRemove: (id) => {
            alert(`${id} 삭제 예정`);
        }
    });   

    const fetchTodo = async () => {
        const { username } = this.state;

        if (this.state.username) {
            this.setState({ 
                ...this.state,
                isTodoLoading: true
            });

            const todos = await request(`/${username}?delay=5000`);

            this.setState({
                ...this.state,
                todos,
                isTodoLoading: false
            });
        }
    }

    fetchTodo();
}
