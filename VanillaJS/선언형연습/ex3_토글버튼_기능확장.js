//확장된 토글버튼 만들기
function TimerButton({ $target, text, timer = 3000, onClick }) {
    const button = new ToggleButton({ $target, text, onClick: () => {
        setTimeout(() => {
            button.setState({
                ...button.state,
                toggled: !button.state.toggled
            })
        }, timer)
    }})
}

//토글버튼 만들기
function ToggleButton({
    $target,
    text,
    onClick
}) {
    const $button = document.createElement('button');  
    $target.appendChild($button); //버튼을 토글버튼 안에 추가해준다.
    // let clickCount = 0;

    //컴포넌트에 상태를 넣어서 쓰면 추상화되어서 확장성과 간결함 
    this.state = {
        clickCount: 0,
        toggled: false
    }

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();  //상태가 변하면 다시 렌더링
    }
    //토글버튼 안의 렌더 함수
    this.render = () => {
        $button.textContent = text;

        //컴포넌트 활용해서 삭선 주기
        $button.style.textDecoration = 
            this.state.toggled ? 'line-through' : 'none';
    }

    //클릭시 컴포넌트 상태를 바꿔준다.
    $button.addEventListener('click', () => {
        this.setState({
            clickCount: this.state.clickCount + 1,
            toggled: !this.state.toggled
        });

        //상태를 전달해서 외부에서 클릭이벤트 처리하게끔(선언적)
        if (onClick) {
            onClick(this.state.clickCount);
        }
    })

    //바로 렌더링
    this.render();
}



// //생성하자마자 렌더링 된다
// const button1 = new ToggleButton({
//     $target: $app,
//     text: 'Extension Button1',
//     onClick: (clickCount) => {
//         if (clickCount % 3 === 0) {
//             alert('3번째 클릭!');
//         }
//     }
// })

// const button2 = new ToggleButton({
//     $target: $app,
//     text: 'Extension Button2',
//     onClick: (clickCount) => {
//         if (clickCount % 2 === 0) {
//             alert('2번째 클릭!');
//         }
//     }
// });

// const button3 = new ToggleButton({
//     $target: $app,
//     text: 'Extension Button3'
// });



// //2. ToggleButton 외에 5초 뒤에 자동 토글되는 버튼 만들기
// new TimerButton({
//     $target: $app,
//     text: '5초 뒤에 자동으로!',
//     timer: 1000 * 5
// })


//3. ButtonGroup 만들기
function ButtonGroup({
    $target,
    buttons
}) {
    const $group = document.createElement('div');
    let isInit = false;

    this.render = () => {
        if (!isInit) {
            buttons.forEach(({ type, ...props }) => {
                if (type === 'toggle') {
                    new ToggleButton({ $target: $group, ...props });
                } else if (type === 'timer') {
                    new TimerButton({ $target: $group, ...props });
                }
            });

            $target.appendChild($group);
            isInit = true;
        }
    }
    this.render();
}

const $app = document.querySelector('#app');

new ButtonGroup({
    $target: $app,
    buttons: [
        {
            type: 'toggle',
            text: '토글 버튼',
        },
        {
            type: 'toggle',
            text: '토글 버튼'
        },
        {
            type: 'timer',
            text: '타이머1',
            timer: 1000 * 5
        }
    ]
})