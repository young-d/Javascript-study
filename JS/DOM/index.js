//즉시실행함수
(() => {
    document.querySelectorAll('.toolbar button').forEach((element) => {
        element.addEventListener(('click'), (e) => {
            const command = e.target.getAttribute('data-command');
            document.execCommand(command);
        });
    });

    /*
    document.querySelector('.bold').addEventListener('click', () => {
        //뭔가 해야한다!!
        document.execCommand('bold');
    });

    document.querySelector('.italic').addEventListener('click', () => {
        document.execCommand('italic');
    });

    document.querySelector('.align-left').addEventListener('click', () => {
        document.execCommand('justifyLeft');
    });

    document.querySelector('.align-right').addEventListener('click', () => {
        document.execCommand('justifyRight');
    });

    document.querySelector('.align-center').addEventListener('click', () => {
        document.execCommand('justifyCenter');
    });
    */
})();