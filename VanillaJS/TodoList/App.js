function App({ $target, initialState }) {
    //header 추가
    new Header({ 
        $target,
        text: '간단 Todo list!' 
    });
    
    //폼 추가
    new TodoForm({
        $target: $app,
        //onSubmit 콜백에서 todolist.setState 호출하기
        onSubmit: (text) => {
            const nextState = [...todoList.state, {
                text
            }];
            todoList.setState(nextState);
        } 
    });

    //todo list 변경시켜보기
    const todoList = new TotoList({
        $target: $app,
        initialState: data 
    });

    setTimeout(() => {
        todoList.setState([
            {
                text: '끝내자 VanillaJS!!'
            }
        ])
    }, 5000);

}