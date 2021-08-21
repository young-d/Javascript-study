import App from './App.js';
import { getItem } from './storage.js';

const initialState = getItem('todos', []);

const $app = document.querySelector('.app');

//App.js로 역할 나눠주기
new App({
    $target: $app,
    initialState
});