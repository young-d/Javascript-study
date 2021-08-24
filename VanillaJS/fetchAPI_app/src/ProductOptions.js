export default function ProductOptions({ $target, initialState, onSelect }) {
    const $select = document.createElement('select');

    $target.appendChild($select);

    /**
     * 상품의 옵션 이름 렌더링 시 '상품명 + 옵션명 + 재고: n개' 형식으로 보여주어야 함
     * 재고가 0인 상품의 경우 옵션을 선택하지 못하게 함
     * 
     * <받아오는 데이터=state>
     * option과 stock을 따로 만들어서 가져오는 방식이 더 낫지만, 지금은 일단 한 곳에서 처리해보자
     * [
     *   {
     *      optionId: 1,
     *      optionName: '옵션 상품',
     *      optionPrice: 1000,
     *      stock: 10
     *   } ,
     *    ...
     * ]
     */
    this.state = initialState;

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    }

    //product option의 이름을 만들어주는 것을 함수로 빼두기
    const createOptionFullName = ({ optionName, optionPrice, stock }) => {
        return `${optionName} ${optionPrice > 0 ? `(옵션가 ${optionPrice})` : ''} | ${stock > 0 ? `(재고: ${stock}개)` : `재고없음`}`;
    }

    $select.addEventListener('change', (e) => {
        const optionId = parseInt(e.target.value);

        const option = this.state.find(option => option.optionId === optionId);

        console.log(option);

        if (option) {
            onSelect(option);
        }
    });

    this.render = () => {
        if (this.state && Array.isArray(this.state)) {
            $select.innerHTML = `
                <option>선택하세요</option>
                ${this.state.map(option => /* html */ ` 
                    <option ${option.stock > 0 ? '' : 'disabled'} value="${option.optionId}">
                        ${createOptionFullName(option)}
                    </option>
                `)}
            `;
        }
    }

    this.render();
}