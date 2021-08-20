const data = [
    {
        text: '자바스크립트 공부하기'
    },
    {
        text: '자바스크립트 복습하기'
    }
];

const data1 = [
    {
        text: '함수형 공부하기'
    },
    {
        text: '함수형 과제하기'
    }
];


const $app = document.querySelector('.app');

// //폼 추가
// new TodoForm({
//     $target: $app,
//     //onSubmit 콜백에서 todolist.setState 호출하기
//     onSubmit: (text) => {
//         const nextState = [...todoList.state, {
//             text
//         }];
//         todoList.setState(nextState);
//     } 
// });

// //todo list 변경시켜보기
// const todoList = new TotoList({
//     $target: $app,
//     initialState: data 
// });

// setTimeout(() => {
//     todoList.setState([
//         {
//             text: '끝내자 VanillaJS!!'
//         }
//     ])
// }, 5000);


//App.js로 역할 나눠주기
new App({
    $target: $app,
    initialState: data
});