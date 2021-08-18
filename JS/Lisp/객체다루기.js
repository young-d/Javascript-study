const obj= {
	a: 1, 
	b: 2, 
	c: 3,
    d: 4
};

//value
const L_values = function* (obj) {
	for (const key in obj) {
		console.log(obj[key]);
		yield obj[key];
	}
}; //1 2 -> 1 2 3 4 를 다 뽑지 않으므로 평가를 최소화 할 수 있음

go(
	obj,
	L_values,
	map(a => a + 10),
	take(2),
	reduce((a, b) => a + b),
	console.log
); //23 


//keys
const L_keys = function* (obj) {
	for (const key in obj) {
		yield key;
	}
};

go(
	obj,
	L_keys,
	each(console.log)
); //a b c d

//entries
const L_keys = function* (obj) {
	for (const key in obj) {
		yield key;
	}
};

go(
	obj,
	L_keys,
	each(console.log)
);


//object
const input = [['a', 1], ['b', 2], ['c', 3]]  //-> entries를
const output = {a: 1, b: 2, c: 3} //-> 객체로 만들기

//1. map + reduce
const object = (entries) => go(
	entries,
	L_map(([key, value]) => ({ [key]: value })),
	reduce(Object.assign)
); //{a: 1, b: 2, c: 3}


//2. reduce 하나로만 만들어보기
const object1 = (entries) => 
	L_reduce((obj, [key, value]) => (obj[key] = value, obj), {}, entries); 

console.log(object1(input)); //{a: 1, b: 2, c: 3}

//3. Map 객체
let map = new Map();
map.set('a', 10);
map.set('a', 10);
map.set('a', 10);

console.log(object1(map)); //{a: 10, b: 20, c: 30} -> map은 entries로 처리하지 않아도 이미 이터러블하기 때문에 object가 처리할 수 있다.


//objectMap
const mapObject = (f, obj) => go(
    obj,
    entries,
    map(([key, value]) => ([key, f(value)])),
    L_map(([key, value]) => ({ [key]: value })),
    reduce(Object.assign)
);
  
console.log(mapObject(a => a + 10, { a: 1, b: 2, c: 3})); //{ a: 11, b: 12, c: 13}


//pick
const object = { a: 1, b: 2, c: 3, d: 4, e: 5 };

const pick = (targets, obj) => go(
	targets,
	map(key => [key, obj[key]]),
	filter(([key, value]) => value),
	L_map(([key, value]) => ({ [key]: value })),
	reduce(Object.assign)	
);

console.log(pick(['b', 'c', 'z'], object)); //{ b: 2, c: 3 }


//indexBy
const users = [
	{ id: 5, name: 'AA', age: 35 },
	{ id: 10, name: 'BB', age: 26 },
	{ id: 19, name: 'CC', age: 28 },
	{ id: 23, name: 'DD', age: 34 },
	{ id: 24, name: 'EE', age: 23 }
];

const indexBy = (f, iter) => 
	reduce((obj, a) => (obj[f(a)] = a, obj), {}, iter);

console.log(indexBy(user => user.id, users)); //