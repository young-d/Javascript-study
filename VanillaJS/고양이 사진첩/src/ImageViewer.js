import { checkUrlForm } from "./validate.js";

export default function ImageViewer({ $target, onImageViewerClose }) {
    const $imageViewer = document.createElement('div');
    $imageViewer.className = 'ImageViewer Modal';
    $target.appendChild($imageViewer);

    this.state = {
        selectedImageUrl: null
    }

    this.setState = nextState => {
        //변경 사항이 있을 경우에만 상태 변경 및 렌더링
        if (this.state.selectedImageUrl !== nextState) {
            this.state = {
                selectedImageUrl: nextState ? checkUrlForm(nextState) : null
            };
    
            this.render();
        }
    }

    this.render = () => {
        $imageViewer.style.display = this.state.selectedImageUrl ? 'block' : 'none';

        $imageViewer.innerHTML = `
            <div class="content">
                <img src="${this.state.selectedImageUrl}" />
            </div>
        `;
    }

    this.render();

    window.addEventListener('keyup', (e) => {
        if (e.key === 'Escape') {
            onImageViewerClose();
        }
    });

    window.addEventListener('click', (e) => {
        if (Array.from(e.target.classList).includes('Modal')) {
            onImageViewerClose();
        }
    });
}
