import { isInstance } from "./instance.js";

export default function TodoForm({ $target, onSubmit }) {
    //new 연산자 없을 경우
    if (!isInstance(this, TodoForm)) {
        return new TodoForm({ $target, onSubmit });
    }
    
    const $form = document.createElement('form');
    $target.appendChild($form);

    //플래그
    let isInit = false;

    this.render = () => {
        $form.innerHTML = `
            <input type="text" name="todo" autoComplete="off"/>
            <button id="addButton">+</button>
        `;

        if (!isInit) {
            $form.addEventListener('submit', e => {
                e.preventDefault();

                const $todo = $form.querySelector('input[name=todo]');
                const text = $todo.value;

                if (text.length > 0) {
                    $todo.value = '';
                    onSubmit(text);
                }
            })
            isInit = true;
        }
    }

    this.render();
}
