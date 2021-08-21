//header와 관련된 일을 처리
export default function Header({ $target, text }) {
    const $header = document.createElement('h1');

    $target.appendChild($header);

    this.render = () => {
        $header.textContent = text;
    }

    this.render();
}