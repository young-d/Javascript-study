//버튼을 클릭하면 삭선이 그어진다 (명령형1)
//토글버튼 만들기
const toggleButton = ($button) => {
    if ($button.style.textDecoration === '') {
        $button.style.textDecoration = 'line-through'
    } else {
        $button.style.textDecoration = ''
    }
}

//클릭 시 삭선 이벤트 추가
document.querySelectorAll('#app button').forEach($button => 
    $button.addEventListener('click', (e) => {
        toggleButton(e.target);
    })    
)
