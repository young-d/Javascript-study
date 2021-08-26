import Nav from "./Nav.js";
import HomeMain from "./HomeMain.js";

export default function HomePage({ $target }) {
    const $page = document.createElement('div');

    new Nav({ $target: $page });
    new HomeMain({ $target: $page });
    // new HomeFooter({ $target: $page });

    //target에 바로 append해주지 않고 렌더링 할 때 append 해준다
    this.render = () => { 
        $target.appendChild($page);
    }
}