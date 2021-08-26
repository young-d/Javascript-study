import { setItem, getItem, removeItem } from "./storage.js";

//로컬 스토리지 키값
const TODO_TEMP_SAVE_KEY = 'TODO_TEMP_SAVE_KEY';

export default function TodoForm({ $target, onSubmit }) {
    const $form = document.createElement('form');

    $target.appendChild($form);

    //서버가 통신 중일 때는 전송을 막아주기 (여기서는 하지 않을것)

    this.render = () => {
        $form.innerHTML = `
            <input type="text" placeholder="할일을 입력하세요.">
            <button>add</button>
        `;
    }

    $form.addEventListener('submit', (e) => {
        e.preventDefault();

        const $input = $form.querySelector('input');
        const content = $input.value;

        onSubmit(content);

        $input.value = '';
        removeItem(TODO_TEMP_SAVE_KEY);
    });

    this.render();

    //input에 값이 바뀔때마다 로컬 스토리지 값을 넣어준다
    const $input = $form.querySelector('input');
    $input.value = getItem(TODO_TEMP_SAVE_KEY, '');

    $input.addEventListener('keyup', (e) => {
        setItem(TODO_TEMP_SAVE_KEY, e.target.value);
    })
}