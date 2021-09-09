export default function Nodes({ $target, initialState, onPrevClick, onClick }) {
    const $nodes = document.createElement('div');
    $target.appendChild($nodes);
    $nodes.classList.add('Nodes');

    this.state = initialState;

    this.setState = nextState => {
        this.state = nextState;
        this.render();
    }

    this.render = () => {
        const { isRoot, nodes } = this.state;

        $nodes.innerHTML = `
            ${isRoot ? '' : `
                <div class="Node">
                    <image src="https://cdn.roto.codes/images/prev.png">
                </div>
            `}
            ${nodes.map(node => `
                <div class="Node" data-id="${node.id}">
                    <img src="${node.type === 'DIRECTORY'
                        ? "https://cdn.roto.codes/images/directory.png"
                        : "https://cdn.roto.codes/images/file.png"
                    }">
                    ${node.name}
                </div>
            `).join('')}
        `;
    }

    this.render();

    $nodes.addEventListener('click', e => {
        const $node = e.target.closest('.Node');

        const { id } = $node.dataset;

        //id가 없는 경우는?
        if (!id) {
            //뒤로가기(<) 클릭 처리
            onPrevClick();
        }

        const node = this.state.nodes.find(node => node.id === id);

        //방어코드
        if (node) {
            onClick(node);
        } else {
            onPrevClick();
        }
    })
}