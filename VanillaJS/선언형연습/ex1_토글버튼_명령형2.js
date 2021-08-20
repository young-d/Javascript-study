//버튼을 클릭하면 삭선이 그어진다. (명령형2)
document.querySelectorAll('button').forEach($button => {
    $button.addEventListener('click', (e) => {
        const { target } = e;
        if(target.style.textDecoration === 'line-through') {
            target.style.textDecoration = 'none';
        } else {
            target.style.textDecoration = 'line-through';
        }
    })
})