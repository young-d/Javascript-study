import HomePage from "./HomePage.js";
import ListPage from "./ListPage.js";
import DetailPage from "./DetailPage.js";

export default function App({ $target }) {

    // $target.innerHTML = `
    //     <a href="/">Home</a>
    //     <a href="/#list">List</a>
    //     <a href="/#detail">Detail</a>
    // `;

    const homePage = new HomePage({ $target });
    const listPage = new ListPage({ $target });
    const detailPage = new DetailPage({ $target });

    this.render = () => {
        const { hash } = window.location;
        $target.innerHTML = '';
        
        if (hash === '') {
            // Home rendering
            homePage.render();
            return;
        } else if (hash === '#list') {
            // List rendering
            listPage.render();
        } else if (hash.includes('#detail')) {
            // detail rendering
            detailPage.render();
        } else {
            // not found page rendering
        }
    }

    this.render();

    //hash 값이 변하면 App을 렌더링 해서 해당 hash 값이 링크된 페이지컴포넌트를 렌더링 해준다.
    window.addEventListener('hashchange', () => {
        this.render();
    });
}