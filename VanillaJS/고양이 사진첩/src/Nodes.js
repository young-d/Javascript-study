import { checkIsArray, checkIsBoolean } from "./validate.js";

export default function Nodes({ $target, initialState, onMovePrevPath, onClickNode }) {
    const $nodes = document.createElement('div');
    $target.appendChild($nodes);
    $nodes.classList.add('Nodes');

    this.state = initialState;

    this.setState = nextState => {
        if (getNodesId(this.state.nodes) !== getNodesId(nextState.nodes)) {
            this.state = {
                isRoot: checkIsBoolean(nextState.isRoot),
                nodes: checkIsArray(nextState.nodes)
            };
            
            this.render();
        }
    }
    
    const getNodesId = (nodes = []) => {
        return Object.values(nodes).map(({ id }) => id).join('');
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

    $nodes.addEventListener('click', (e) => {
        const $node = e.target.closest('.Node');
        
        if ($node) {
            const { id } = $node.dataset;
    
            if (!id) {
                onMovePrevPath();
                return;
            } 
    
            const targetNode = this.state.nodes.find(node => node.id === id);
    
            if (targetNode) {
                onClickNode(targetNode);
            }
        }
    });

    window.addEventListener('keyup', (e) => {
        if (e.key === 'Backspace') {
            onMovePrevPath();
        }
    });
}
