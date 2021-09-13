import TodoList from "./TodoList.js";
import { request } from "./api.js";
// import TaskManager from "./TaskManager.js";
import SyncTasksManager from "./SyncTasksManager.js";

export default function App({ $target }) {
    // const tasks = new TaskManager();
    const tasks = new SyncTasksManager();

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

            //TaskQueue에 수정 작업 추가
            // tasks.addTask(async () => {
            //     await request(`/${todoId}/toggle`, {
            //         metode: 'PUT'
            //     })
            // });

            //SyncTaskManager 로 한 번에 동기화하기
            tasks.addTask({
                url: `/${todoId}/toggle`,
                method: 'PUT'
            });
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

            //TaskQueue에 수정 작업 추가
            // tasks.addTask(async () => {
            //     await request(`/${todoId}/toggle`, {
            //         metode: 'PUT'
            //     })
            // });

            //SyncTaskManager 로 한 번에 동기화하기
            tasks.addTask({
                url: `/${todoId}/toggle`,
                method: 'PUT'
            });
        }
    });

    const fetchTodos = async() => {
        const todos = await request('');

        this.setState({
            ...this.state,
            todos
        });
    }

    //fetch는 최초 한 번만 실행
    fetchTodos();

    //taskqueue 에 있는 작업 한 번에 실행하기
    const $button = document.createElement('button');
    $button.textContent = '변경 내용 동기화';

    $target.appendChild($button);

    $button.addEventListener('click', () => tasks.run());
}
