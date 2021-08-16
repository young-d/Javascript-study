const curry = f => (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._); 

//L.map()
L.map = curry((f, iter) => {
	for (const a of iter) {
		yield go1(a, f);
	}
});

//filter()
L.filter = curry((f, iter) => {
	for (const a of iter) {
		//Promise인 a를 프로미스가 아니도록 값을 해결한 뒤에 f에 전달해야한다
		const b = go1(a, f); //b에 a를 정형화한 값을 담는다
		//Promise일 때는 b의 값을 풀어주고, b가 true면 a(Promise인 상태)를 전달 -> 다른 곳에서 then으로 풀어서 쓸수있으므로 괜찮음
		//단, 흘려줄 값이 true가 아닐 때는 값을 받을 이후의 함수가 정상적이지 않은 값을 받으면 안된다(여기서 끝나야 한다)
//		if (b instanceof Promise) yield b.then(b => b ? a : _);
		//_ 에서 아무일도 하지 않아야만 다음 함수가 값을 이어받지 않기 때문에 이럴 때 Kleisli Composition을 활용!
		if (b instanceof Promise) yield b.then(b => b ? a : Promise.rejcet(nop));
		//Promise가 아닐 때는 a를 바로 yield해주기
		else if (b) yield a;
	}
});

//take()
take = curry((length, iter) => {
	let res = [];
	iter = iter[Symbol.iterator]();
	return function recursive() {
		let curr;
		while (!(curr = iter.next()).done) {
			const a = curr.value;
			//들어온 값(a)이 Promise일 경우
			if (a instanceof Promise) {
				return a
				.then(a => (res.push(a), res).length === length? : res : recursive())
				.catch(e => e === nop ? recursive() : Promise.reject(e));
			}
			res.push(a);
			if (res.length === length) return res;
		}
		return res;
	} ();
});

//reduce()
//a만 Promise를 풀어주도록 작성해보자
const reduceF = (acc, a, f) =>
	a instanceof Promise 
	? a.then(a => f(acc, a), e => e === nop ? acc : Promise.reject(e)) //then의 두번째 인자로 캐치해서 reject을 해줄 수 있다
	: f(acc, a);

const head = iter => go1(take(1, iter), ([h]) => h);

const reduce = curry((f, acc, iter) => {
		//2. 여기에서도 비동기 상황을 처리하도록 하여 더 안전하게 만들어보자
		//head를 먼저 뽑아서 이 값을 그대로 reduce에게 전달해준다
		//그러면 head가 acc가 되고, 거기까지 된 후에 iterator를 만들어준다
    if (!iter) return reduce(f, head(iter = acc[Symbol.iterator](), iter));

    iter = iter[Symbol.iterator]();

	return go1(acc, function recursive(acc) {
		let curr;
		while (!(curr = iter.next()).done) {
			const a = curr.value;
			acc = f(acc, a);
			//1. acc에서 a를 꺼내서 Promise를 풀어준다
			acc = reduceF(acc, curr.value, f);
			if (acc instanceof Promise) return acc.then(recursive);
		}
		return acc;
    });
});

//C.reduce()
const C = {};

function noop() {}
const catchNoop = arr =>
	(arr.forEach(a => a instanceof Promise ? a.catch(noop) : a), arr);

C.reduce = curr((f, acc, iter) => {
//	const iter2 = iter ? [...iter] : [...acc];
//	iter2.forEach(a => a.catch(function() {})); //catch하면서 아무일도 하지 않기
	const iter2 = catchNoop(iter ? [...iter] : [...acc]);
	return iter 
		? reduce(f, acc, iter2)
		: reduce(f, iter2);
});

//C.take()
C.take = curry((length, iter) => take(length, catchNoop([...iter])));
