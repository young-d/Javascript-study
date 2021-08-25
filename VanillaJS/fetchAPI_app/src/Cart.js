/*
{
    productName: 상품명,
    basePrice: 상품 기본 가격,
    selectedOption: [Option]
}
*/

export default function Cart({ $target, initialState, onRemove }) {
    const $cart = document.createElement('div');

    $target.appendChild($cart);

    this.state = initialState;

    this.setState = nextState => {
        this.state = nextState;
        this.render();
    }

    const calculateTotalPrice = () => {
        const { basePrice, selectedOptions } = this.state;
        return selectedOptions.reduce((acc, option) => 
            acc + ((basePrice + option.optionPrice) * option.ea), 0
        );
    }

    this.render = () => {
        const { productName, basePrice, selectedOptions } = this.state;
        $cart.innerHTML = /* html */ `
            <ul>
                ${Array.isArray(selectedOptions) && selectedOptions.map(option => /* html */  `
                    <li>${productName} - ${option.optionName} | ${basePrice + option.optionPrice} | ${option.ea}개</li>
                `).join('')}
            </ul>
            <div>
                ${calculateTotalPrice()}
            </div>
        `
    }

    this.render();
}