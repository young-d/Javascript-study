//타이머로 이벤트를 지연시키다가 정해진 시점에 발생시키는 역할
export default function debounce(fn, delay) {   
    let timer = null;
    return function () {
        const context = this;
        const args = arguments;
        //이벤트가 발생하기 전에 같은 이벤트가 또 들어오면 전의 이벤트 취소시키고 다시 타이머를 거는 방식 
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(context, args);
        }, delay);
    };
}