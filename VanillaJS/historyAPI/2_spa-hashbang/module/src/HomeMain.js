export default function HomeMain({ $target }) {
    const $homeMain = document.createElement('div');

    
    this.render = () => {
        $target.appendChild($homeMain);
        $homeMain.innerHTML = `
            <h1>Home</h1>
            <div>Hello</div>
        `
    }

    this.render();
}