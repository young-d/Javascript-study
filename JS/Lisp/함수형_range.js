//명령형
function f1(end) {
	let i = 0;
	while(i < end) {
		console.log(i);
		++i;		
	}
}
f1(10); //0 1 2 3 4 5 6 7 8 9

//함수형
function f2(end) {
	_.each(console.log, L.range(end));
}
f2(10); //0 1 2 3 4 5 6 7 8 9

//명령형으로 효율적으로 홀수 찾기
function f3(end) {
	let i = 1; //1부터 시작
	while(i < end) {
		console.log(i);
		i += 2;	//2씩 증가
	}
}
f3(10); //1 3 5 7 9

//함수형으로 홀수 찾기
function f4(end) {
	_.each(console.log, L.range(1, end, 2));
}
f4(10); //1 3 5 7 9
