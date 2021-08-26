import Header from "./Header.js";
import UserList from "./UserList.js";
import TodoForm from "./TodoForm.js";
import TodoList from "./TodoList.js";
import { request } from "./api.js";

export default function App({ $target }) {
    const $userListContainer = document.createElement('div');
    const $todoListContainer = document.createElement('div');

    $target.append($userListContainer);
    $target.append($todoListContainer);
    
    this.state = {
        userList: [],
        selectedUsername: null,
        todos: [],
        isTodoLoading: false
    }

    this.setState = nextState => {
        this.state = nextState;

        header.setState({
            selectedUsername: this.state.selectedUsername,
            isLoading: this.state.isTodoLoading
        })
        
        todoList.setState({
            isLoading: this.state.isTodoLoading,
            todos: this.state.todos
        });

        userList.setState(this.state.userList)

        this.render();
    };

    this.render = () => {
        const { selectedUsername } = this.state;
        $todoListContainer.style.display = selectedUsername ? 'block' : 'none';
    }

    const userList = new UserList({
        $target: $userListContainer,
        initialState: this.state.userList,
        onSelect: async (username) => {
            this.setState({
                ...this.state,
                selectedUsername: username
            })

            await fetchTodos();
        }
    })

    const header = new Header({
        $target: $todoListContainer,
        initialState: {
            selectedUsername: this.state.selectedUsername,
            isLoading: this.state.isTodoLoading
        }
    })

    new TodoForm({
        $target: $todoListContainer,
        onSubmit: async (content) => {
            const isFirstTodoAdd = this.state.todos.length === 0;
            
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
             
            await request(`/${this.state.selectedUsername}`, {
                method: 'POST',
                body: JSON.stringify(todo)
            });

            await fetchTodos();

            if (isFirstTodoAdd) {
                await fetchUserList();
            }
        }
    })
    
    const todoList = new TodoList({
        $target: $todoListContainer,
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

            await request(`/${this.state.selectedUsername}/${id}/toggle`, {
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

            await request(`/${this.state.selectedUsername}/${id}`, {
                method: 'DELETE'
            })
            await fetchTodos();
        }
    });   

    //UserList를 api 연동하기
    const fetchUserList = async () => {
        const userList = await request('/users');

        this.setState({
            ...this.state,
            userList
        });
    }

    //TodoList를 api 연동하기
    const fetchTodos = async () => {
        const { selectedUsername } = this.state;

        if (this.state.selectedUsername) {
            this.setState({ 
                ...this.state,
                isTodoLoading: true
            });

            const todos = await request(`/${selectedUsername}`);

            this.setState({
                ...this.state,
                todos,
                isTodoLoading: false
            });
        }
    }

    const init = async () => {
        await fetchUserList();
    }

    init();
}
