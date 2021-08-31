import { isInstance } from "./instance.js";

export default function Header({ $target, initialState }) {
    //new 연산자 없을 경우
    if (!isInstance(this, Header)) {
        return new Header({ $target, initialState });
    }

    this.state = initialState;

    const $header = document.createElement('h1');
    $target.appendChild($header);

    this.render = () => {
        $header.textContent = this.state.title;
    }

    this.render();
}
