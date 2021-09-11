import { checkUrlForm } from "./validate.js";

export default function ImageViewer({ $target, onImageViewerClose }) {
    const $imageViewer = document.createElement('div');
    $imageViewer.className = 'ImageViewer Modal';
    $target.appendChild($imageViewer);

    this.state = {
        selectedImageUrl: null
    }

    this.setState = nextState => {
        this.state = {
            selectedImageUrl: nextState ? checkUrlForm(nextState) : null
        };

        this.render();
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

    //이미지 모달 닫는 이벤트
    window.addEventListener('keyup', (e) => {
        //만약 누른 키가 esc인 경우 이벤트를 호출
        if (e.key === 'Escape') {
            onImageViewerClose();
        }
    });

    window.addEventListener('click', (e) => {
        if (Array.from(e.target.classList).includes('Modal')) {
            onImageViewerClose();
        }
    })
}
