import App from './App.js';
import { getItem } from './storage.js';

const initialState = getItem('todos', []);

const $target= document.querySelector('.app');

new App({
    $target,
    initialState
});