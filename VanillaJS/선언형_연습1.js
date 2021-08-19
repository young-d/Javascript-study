//명령형
function c_double(arr) {
    let results = [];
		//어떻게 처리하는지에 대한 묘사
    for (let i = 0; i < arr.length; i++) {
        //숫자일 때만 출력하도록 처리(숫자가 아닌 값은 무시)
        if (typeof arr[i] === 'number') {
            results.push(arr[i] * 2);
        }
    }
    return results;
}

document.querySelector('#command1').innerHTML = c_double([1, 2, 3, 'd', null, 4, 'e']); //2, 4, 6, 8


//선언형
function d_double(arr) {
	//무엇을 원하는지에 대한 묘사
    return arr.filter(param => typeof param === 'number')
              .map(number => number * 2);
}

document.querySelector('#declare1').innerHTML = d_double([1, 2, 3, 'd', null, 4, 'e']); //2, 4, 6, 8