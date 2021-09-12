import { checkIsArray } from "./validate.js";

export default function Breadcrumb({ $target, initialState, onClickItem }) {
    const $breadcrumb = document.createElement('div');
    $breadcrumb.className = 'Breadcrumb';
    $target.appendChild($breadcrumb);

    this.state = initialState;

    this.setState = nextState => {
        // 변경 사항 있을 때만 상태 변경 및 렌더링
        if ([...this.state.paths].length !== [...nextState].length) {
            this.state = {
                paths: checkIsArray(nextState)
            };
    
            this.render();
        }
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
    });
}
