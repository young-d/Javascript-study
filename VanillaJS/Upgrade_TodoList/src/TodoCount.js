import { isInstance } from "./instance.js";

export default function TodoCount({ $target, initialState }) {
    //new 연산자 없을 경우
    if (!isInstance(this, TodoCount)) {
        return new TodoCount({ $target, initialState });
    }

    const $todoCount = document.createElement('h3');
    $target.append($todoCount);

    this.state = initialState;

    this.setState = nextState => {
        this.state = nextState;
        this.render();
    }

    this.render = () => {
        $todoCount.textContent = `Done: ${this.state.completedCount || 0} / Todo: ${this.state.totalCount || 0}`;
    }

    this.render();
}
