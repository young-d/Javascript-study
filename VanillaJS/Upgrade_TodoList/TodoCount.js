export default function todoCount({ $target, initialState }) {
    const $todoCount = document.createElement('h3');
    $target.append($todoCount);

    this.state = initialState;

    this.setState = nextState => {
        this.state = nextState;
        this.render();
    }

    this.render = () => {
        $todoCount.textContent = `${this.state.completedCount} / ${this.state.totalCount}`;
    }

    this.render();
}