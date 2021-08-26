export default function ListMain({ $target, initialState }) {
    const $listMain = document.createElement('div');

    $target.appendChild($listMain);

    this.state = initialState;

    this.render = () => {
        if (Array.isArray(this.state)) {
            $listMain.innerHTML = `
                <ul>
                    ${this.state.map(item => `
                        <li>
                            <a class="link" href="/detail/${item.id}">${item.productName}</a>
                        </li>
                    `).join('')}
                </ul>
            `
        }
    }

    this.render();
}