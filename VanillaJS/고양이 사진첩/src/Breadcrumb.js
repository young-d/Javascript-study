import { checkIsArray } from "./validate.js";

export default function Breadcrumb({ $target, initialState, onClickItem }) {
    const $breadcrumb = document.createElement('div');
    $breadcrumb.className = 'Breadcrumb';
    $target.appendChild($breadcrumb);

    this.state = initialState;

    this.setState = nextState => {
        this.state = {
            paths: checkIsArray(nextState)
        };
        this.render();
    }

    this.render = () => {
        $breadcrumb.innerHTML = `
            <div class="Breadcrumb__item">Root</div>
            ${this.state.paths.map(({ id, name }) => `
                <div class="Breadcrumb__item" data-id="${id}">${name}</div>
            `).join('')}
        `;
    }

    this.render();

    $breadcrumb.addEventListener('click', (e) => {
        const $breadcrumbItem = e.target.closest('.Breadcrumb__item');

        if ($breadcrumbItem) {
            const { id } = $breadcrumbItem.dataset;
    
            onClickItem(id);
        }

    })
}
