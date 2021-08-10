//go 함수
const go = (...args) => reduce((a, f) => f(a), args);

//pipe 함수
const pipe = (f, ...fs) => (...args) => go(f(...args), ...fs);

//curry
const curry = f => (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._); 

//map + curry
const map = curry((f, iter) => {
	let res = [];

	for (const i of iter) {
		res.push(f(i));
	}

	return res; 
});

//filter + curry
const filter = curry((f, iter) => {
	let res = [];

	for (const i of iter) {
		if (f(i)) res.push(i);
	}

	return res; //부수효과로 직접 변화를 주는 것이 아닌, 리턴값으로 출력하기
});

//reduce + curry
const reduce = curry((f, acc, iter) => {
	if (!iter) {
		iter = acc[Symbol.iterator]();  
		acc = iter.next().value;
	}

	for (const i of iter) {
		acc = f(acc, i);
	}

	return acc;
});
