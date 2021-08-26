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
    });

    this.render();
}