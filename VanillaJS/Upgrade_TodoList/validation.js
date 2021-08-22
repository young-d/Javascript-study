//todlList에 추가할 때 텍스트가 20자 이상이면 경고
export function validateTextMaxLength(todoText) {
    const result = todoText.length <= 20 ? true : false;

    if (!result) {
        alert('🙅🏻‍♀️ 20글자까지 작성할 수 있어요!');
    }
    
    return result;
}

//중복된 todo는 경고
export function validateDuplication(todoText, todoList) {
    const result = !todoList.find((todo) => todo.text === todoText) ? true : false;

    if (!result) {
        alert('🙅🏻‍♀️ 동일한 Todo가 있어요!');
    }
    
    return result;
}
