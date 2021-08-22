//header와 관련된 일을 처리
export default function Header({ $target, text }) {
    //new 연산자 없을 경우
    if (!(this instanceof Header)) {
        console.erroe('There is no new operator');
        //new로 다시 생성해주기
        return new Header({ $target, text });
    }

    const $header = document.createElement('h1');
    $target.appendChild($header);

    this.render = () => {
        $header.textContent = text;
    }

    this.render();
}
