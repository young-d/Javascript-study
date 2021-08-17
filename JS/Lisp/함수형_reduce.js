function f1(limit, list) {
	console.log(
	_.reduce((acc, a) => acc + a, //4. 하나씩 더해 누적한다.
	  L.take(limit, //3. 제곱한 값들을 limit만큼 자른다
			L.map(a => a * a,  //2. 홀수값들의 제곱을 구한다
				L.filter(a => a & 1, list))))); //1. list에서 홀수만 뽑는다
}
f1(3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]); //35

//리팩토링
function f2(limit, list) {
	_.go(list,
		L.filter(a => a % 2),
		L.map(a => a * a),
		L.take(limit),
		_.reduce((acc, a) => acc + a),
		console.log);
}
f2(3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]); //35
