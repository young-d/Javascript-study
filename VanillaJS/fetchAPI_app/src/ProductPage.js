import ProductOptions from "./ProductOptions.js";
import { request } from "./api.js";
import Cart from "./Cart.js";

/* state 구조
{
    productId: 1,
    product: Product,
    optionData: []
}
*/

export default function ProductPage({ $target, initialState }) {
    const $product = document.createElement('div');

    $target.appendChild($product);

    this.state = initialState;

    const productOptions = new ProductOptions({
        $target: $product,
        initialState: [],
        onSelect: (option) => {
            const nextState = {...this.state};

            const { selectedOptions } = nextState

            const selectedOptionIndex = selectedOptions.findIndex(selectedOption => selectedOption.optionId === option.optionId);
       
            if (selectedOptionIndex > -1) {
                nextState.selectedOptions[selectedOptionIndex].ea++;
            } else {
                nextState.selectedOptions.push({
                    optionId: option.optionId,
                    optionName: option.optionName,
                    optionPrice: option.optionPrice,
                    ea: 1
                })
            }

            this.setState(nextState);
        }
    })

    const cart = new Cart({
        $target: $product,
        initialState: {
            productName: '',
            basePrice: 0,
            selectedOptions: []  //빈 배열일 때는 reduce로 돌릴 수 없으니 방어코드 짜주어야 함
        },
        onRemove: (selectedOptionIndex) => {
            const nextState = {...this.state}
            nextState.selectedOptions.splice(selectedOptionIndex, 1)
            
            this.setState(nextState);
        }
    })

    this.setState = nextState => {
        if (nextState.productId !== this.state.productId) {
            fetchOptionData(nextState.productId);
            return;
        }

        this.state = nextState;

        const { product, selectedOptions, optionData } = this.state;

        //productoptions 업데이트
        productOptions.setState(optionData);
        
        //cart 업데이트
        cart.setState({
            productName: product.name,
            basePrice: product.basePrice,
            selectedOptions: selectedOptions
        })
    }

    this.render = () => {};
    this.render();

    const fetchOptionData = (productId) => {
        return request(`/products/${productId}`)
            .then(product => {
                this.setState({
                    ...this.state,
                    product,
                    optionData: [],
                    selectedOptions: []
                });

                return request(`/product-options?product.id=${product.id}`);
            })
            .then(productOptions => {
                return Promise.all([
                    Promise.resolve(productOptions), //여기서 productOptions 꺼내주기
                    Promise.all(
                        productOptions.map(productOption => productOption.id).map(id => {
                            return request(`/product-option-stocks?productOption.id=${id}`)
                        })
                    )
                ]);
            })
            .then(data => {
                const [productOptions, stocks] = data;
                //stocks는 현재 배열로 되어있기 때문에 꺼내서 넣어주도록 한다. (단건형태로 나중에 수정하신다고 함)
                const optionData = productOptions.map((productOption, i) => {
                    const stock = stocks[i][0].stock;

                    return {
                        optionId: productOption.id,
                        optionName: productOption.optionName,
                        optionPrice: productOption.optionPrice,
                        stock
                    }
                })

                //console.log(optionData);
                this.setState({
                    ...this.state,
                    optionData
                });
            })
    }

    //const DEFAULT_PRODUCT_ID = 1;  
    //fetchOptionData(DEFAULT_PRODUCT_ID);

    fetchOptionData(this.state.productId);
}