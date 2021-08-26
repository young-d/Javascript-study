import HomePage from "./HomePage.js";
import ProductPage from "./ProductPage.js";

export default function App({ $target }) {
    const homePage = new HomePage({
        $target
    })
    
    const productPage = new ProductPage({
        $target,
        initialState: {
            productId: null
        }
    })
    
    this.render = () => {
        const { pathname } = location;

        $target.innerHTML = '';

        if (pathname === '/') {
            homePage.render();
        } else if (pathname.indexOf('/products/') === 0) {
            const productId = pathname.split('/')[2];
            productPage.setState({
                productId
            }) 
        }
    }

    this.render();

    window.addEventListener('click', e => {
        if (e.target.className === 'link') {
            const href = e.target.getAttribute("href");
            history.pushState(null, null, href);

            console.log(href);

            e.preventDefault();

            this.render();
        }
    })
}
