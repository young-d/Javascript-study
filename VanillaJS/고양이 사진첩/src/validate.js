const validateState = (validation, message) => {
    if (!validation) {
        throw new Error(message);
    }
}

//validate state is Array type
export const checkIsArray = (state) => {
    const validation = Array.isArray(state);
    const errorMessage = 'state type must be Array';

    validateState(validation, errorMessage);

    return state;
}

//validate state is URL form 
export const checkUrlForm = (state) => {
    const urlRegExp = new RegExp('^(http|https)://', 'i');
    const validation = urlRegExp.test(state);
    const errorMessage = 'state form must be URL';

    validateState(validation, errorMessage);

    return state;
}

//validate state is Boolean type
export const checkIsBoolean = (state) => {
    const validation = typeof state === 'boolean';
    const errorMessage = 'state type must be Boolean';

    validateState(validation, errorMessage);

    return state;
}
