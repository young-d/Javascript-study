import Header from './Header.js';
import TodoForm from './TodoForm.js';
import TodoList from './TodoList.js';
import TodoCount from './TodoCount.js';
import { setItem , getItem } from './storage.js';
import { validateTextMaxLength, validateDuplication } from './validation.js';

export default function App({ $target }) {
    //todoList 타이틀
    new Header({ 
        $target,
        text: 'Upgrade Todo list!' 
    });

    //todoList 입력폼
    TodoForm({
        $target,
        onSubmit: (text) => {
            const nextState = getItem('todos', []);

            //text 길이, 중복여부 체크
            if (validateTextMaxLength(text) 
                && validateDuplication(text, nextState)
                ) {
                nextState.push({
                    id: todoList.state.length,
                    text,
                    isCompleted: false
                });
                todoList.setState(nextState);
                setItem('todos', JSON.stringify(nextState));
                
                todoCount.setState({
                    completedCount: todoCount.state.completedCount,
                    totalCount: getItem('todos', []).length
                });
            }
        } 
    });

    //todoList 출력과 클릭 이벤트
    const todoList = TodoList({
        $target,
        initialState: getItem('todos', []),
        onClick: (id) => {
            const nextState = getItem('todos', []);
            nextState[id].isCompleted = !nextState[id].isCompleted;

            todoList.setState(nextState);
            setItem('todos', JSON.stringify(nextState));

            todoCount.setState({
                completedCount: nextState
                                .filter(todo => todo.isCompleted)
                                .length,
                totalCount: todoCount.state.totalCount
            });
        }
    });

    //todoList의 완료개수/전체개수
    const todoCount = TodoCount({
        $target,
        initialState: {
            completedCount: getItem('todos', [])
                            .filter(todo => todo.isCompleted)
                            .length,
            totalCount: getItem('todos', []).length
        }
    })
}
