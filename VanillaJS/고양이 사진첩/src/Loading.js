import { checkIsBoolean } from "./validate.js";

export default function Loading({ $target }) {
    const $loading = document.createElement('div');
    $loading.className = 'Loading Modal';
    $target.appendChild($loading);

    this.state = false;

    this.setState = nextState => {
        //로딩 여부가 변할 때만 상태 변경 및 렌더링
        if (this.state !== nextState) {
            this.state = checkIsBoolean(nextState);

            this.render();
        }
    }

    this.render = () => {
        $loading.innerHTML = `
            <div class="content">
                <img width="100%" src="https://cdn.roto.codes/images/nyan-cat.gif" alt="Loading..." />
            <div>
        `;

        $loading.style.display = this.state ? 'block' : 'none';
    }

    this.render();
}
