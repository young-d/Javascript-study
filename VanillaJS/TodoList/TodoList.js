//params.$target - 해당 컴포넌트가 추가가 될 DOM 엘리먼트
//params.initialState - 해당 컴포넌트의 초기 상태
export default function TotoList({ $target, initialState }) {
    const $totdoList = document.createElement('div');
    $target.appendChild($totdoList);

    //현재 내 상태를 기준으로 render하기
    this.state = initialState;

    //Todo List의 상태를 변하게 하기
    this.setState = nextState => {
        this.state = nextState;
        this.render();
    }

    this.render = () => {
        //this.state = [{ text: '자바스크립트 공부하기' }, { text: '...' }]
        //위의 state 요소들을 map으로 돌리기
        //돌고 나면 ['<li>자바스크립트 공부하기</li>', '<li>...</li>']
        //join을 거치면 <li>자바스크립트 공부하기</li><li>...</li> 이렇게 한줄로 나온다!
        $totdoList.innerHTML = `
            <ul>
                ${this.state.map(({ text }) => `<li>${text}</li>`).join('')}
            </ul>
        `;
    }

    //생성되자마자 렌더링 된다.
    this.render();
}