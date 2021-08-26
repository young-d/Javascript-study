import Nav from "./Nav.js";
import ProductDetail from "./ProductDetail.js";

export default function DetailPage({ $target }) {
    const $page = document.createElement('div');
    
    // #detail-1 => ['#detail', '1']
    // #detail-2 => ['#detail', '2']
    const getProductId = () => {
        const { hash } = window.location;
        return hash.split('-')[1];
    }

    new Nav({ $target: $page });
    const productDetail = new ProductDetail({
        $target: $page,
        initialState: {
            productId: getProductId()
        }
    });

    this.initialState = nextState => {
        this.state = nextState;
        this.render();
    }

    this.render = () => {
        productDetail.setState({
            productId: getProductId()
        })
        $target.appendChild($page);
    }
}