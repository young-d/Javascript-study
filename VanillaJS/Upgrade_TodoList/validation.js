//todlList에 추가할 때 텍스트가 20자 이상이면 경고
export function validateTextMaxLength(todoText) {
    const isValidLength = (todoText.length <= 20);
    const type = 'maxLength';

    if (!isValidLength) {
        callError(isValidLength, type);
    }
    
    return isValidLength;
}

//중복된 todo는 경고
export function validateDuplication(newTodo, todoList) {
    const isUniqueTodo = !todoList.some((todo) => todo === newTodo);
    const type = 'duplication';

    if (!isUniqueTodo) {
        callError(isUniqueTodo, type);
    }
        
    return isUniqueTodo;
}

const callError = (validation, type) => {
    let message = '';

    if (type === 'maxLength') {
        message = '🙅🏻‍♀️ 20글자까지 작성할 수 있어요!';
    } else if (type === 'duplication') {
        message = '🙅🏻‍♀️ 동일한 Todo가 있어요!';
    }

    if (!validation) {
        alert(message);
    }
}
