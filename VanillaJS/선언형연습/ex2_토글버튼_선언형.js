//ToggleButton 이라는 이름으로 추상화하기 (컴포넌트 방식)
//토글 버튼에 필요한 것을 토글버튼 안에 모아두는 것 (기능을 추가/확장하기가 편리해진다)
function ToggleButton({
    $target,
    text
}) {
    const $button = document.createElement('button');  
    let isInit = false;

    //토글버튼 안의 렌더 함수
    this.render = () => {
        $button.textContent = text;

        //render가 여러번 되는 것을 방지하기 위해서 append나 이벤트를 초기화해주기
        if (!isInit) {
            $target.appendChild($button); //버튼을 토글버튼 안에 추가해준다.
            //초기화하면서 클릭 이벤트 추가해주기 (토글기능)
            $button.addEventListener('click', () => {
                if ($button.style.textDecoration === '') {
                    $button.style.textDecoration = 'line-through';
                } else {
                    $button.style.textDecoration = '';
                }
            })
            isInit = true;
        }
    }

    //바로 렌더링
    this.render();
}

const $app = document.querySelector('#app');

//생성하자마자 렌더링 된다
const button1 = new ToggleButton({
    $target: $app,
    text: 'Basic Button1'
})

const button2 = new ToggleButton({
    $target: $app,
    text: 'BasicButton2'
});

const button3 = new ToggleButton({
    $target: $app,
    text: 'Basic Button3'
});