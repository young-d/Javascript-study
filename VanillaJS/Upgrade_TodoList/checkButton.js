export default function checkButton({ $target, initialState, onClick }) {
    let $checkButton = document.createElement('button');

    this.state = initialState;

    this.setState = nextState => {
        this.state = nextState;
        this.render();
    }


    this.render = () => {
        document.querySelector('li').appendChild($checkButton);
    }

    this.render();
}