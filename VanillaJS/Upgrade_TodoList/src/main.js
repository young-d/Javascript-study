import App from './App.js';
import { getItem } from './storage.js';
import { TODO_LIST_KEY_NAME } from './constant.js';

const initialState = { todos: getItem(TODO_LIST_KEY_NAME, [])};
const $target= document.querySelector('.app');

new App({
    $target,
    initialState
});
