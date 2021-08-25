export default function TodoCount({ $target, initialState }) {
    //new 연산자 없을 경우
    if (!(this instanceof TodoCount)) {
        console.error('There is no new operator');
        //new로 다시 생성해주기
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
