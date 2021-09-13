import TodoList from "./TodoList.js";
import { request } from "./api.js";

export default function App({ $target }) {
    this.state = {
        todos: []
    }

    this.setState = nextState => {
        this.state = nextState;

        const { todos } = this.state;

        incompletedTodoList.setState({
            ...incompletedTodoList.state,
            todos: todos.filter(todo => !todo.isCompleted)
        });

        completedTodoList.setState({
            ...completedTodoList.state,
            todos: todos.filter(todo => todo.isCompleted)
        });
    }


    const incompletedTodoList = new TodoList({
        $target,
        initialState: {
            title: '완료되지 않은 일들',
            todos: []
        }, 
        onDrop: async (todoId) => {
            //낙관적 업데이트
            const nextTodos = [...this.state.todos];
            const todoIndex = nextTodos.findIndex(todo => todo._id === todoId);

            nextTodos[todoIndex].isCompleted = false;
            this.setState({
                ...this.state,
                todos: nextTodos
            });

            //todos 수정 요청
            await request(`/${todoId}/toggle`, {
                method: 'PUT'
            });

            //todos 조회 요청
            await fetchTodos();
        }
    });

    const completedTodoList = new TodoList({
        $target,
        initialState: {
            title: '완료된 일들',
            todos: []
        },
        onDrop: async (todoId) => {
            //낙관적 업데이트
            const nextTodos = [...this.state.todos];
            const todoIndex = nextTodos.findIndex(todo => todo._id === todoId);

            nextTodos[todoIndex].isCompleted = true;
            this.setState({
                ...this.state,
                todos: nextTodos
            });

            //todos 수정 요청
            await request(`/${todoId}/toggle`, {
                method: 'PUT'
            });

            //todos 조회 요청
            await fetchTodos();
        }
    });

    const fetchTodos = async() => {
        const todos = await request('');

        this.setState({
            ...this.state,
            todos
        });
    }

    fetchTodos();
}
