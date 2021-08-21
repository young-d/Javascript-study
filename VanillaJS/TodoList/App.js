import Header from './Header.js';
import TodoForm from './TodoForm.js';
import TotoList from './toDoList.js';
import { setItem } from './storage.js';

export default function App({ $target, initialState }) {
    //header 추가
    new Header({ 
        $target,
        text: '간단 Todo list!' 
    });

    //폼 추가
    new TodoForm({
        $target,
        //onSubmit 콜백에서 todolist.setState 호출하기
        onSubmit: (text) => {
            const nextState = [...todoList.state, {
                text
            }];
            todoList.setState(nextState);

            //localStorage
            setItem('todos', JSON.stringify(nextState));
        } 
    });

    //todo list 변경시켜보기
    const todoList = new TotoList({
        $target,
        initialState
    });
}