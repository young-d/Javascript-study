//버튼 3개 만든다
const $button1 = document.createElement('button');
$button1.textContent = 'Basic Button1';

const $button2 = document.createElement('button');
$button2.textContent = 'Basic Button2';

const $button3 = document.createElement('button');
$button3.textContent = 'Basic Button3';

//만든 버튼을 화면에 그린다
const $main = document.querySelector('#app');

$main.appendChild($button1);
$main.appendChild($button2);
$main.appendChild($button3);


// 버튼을 클릭하면 삭선이 그어진다. 
//명령형 방식(버튼마다 전부 이벤트 추가해주는 방법)
// $button1.addEventListener('click', () => {
//     if ($button1.style.textDecoration === 'line-through') {
//         $button1.style.textDecoration = 'none';
//     } else {
//         $button1.style.textDecoration = 'line-through';
//     }
// });
// $button2.addEventListener('click', () => {
//     if ($button1.style.textDecoration === 'line-through') {
//         $button1.style.textDecoration = 'none';
//     } else {
//         $button1.style.textDecoration = 'line-through';
//     }
// });
// $button3.addEventListener('click', () => {
//     if ($button1.style.textDecoration === 'line-through') {
//         $button1.style.textDecoration = 'none';
//     } else {
//         $button1.style.textDecoration = 'line-through';
//     }
// });
