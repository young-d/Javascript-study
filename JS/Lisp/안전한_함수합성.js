//1. map()으로 
const f = x => x + 10;
const g = x => x - 5;
const fg = x => f(g(x));

go(
	[10],
	L_map(fg),
	each(console.log)
); //15

go(
	[],
	L_map(fg),
	each(console.log)
); // 아무 값도 안나옴!(원하지 않는 값은 넘기지 않도록 합성했기 때문)


//2. filter()로
const users = [
	{ name: 'AA', age: 35 },
//	{ name: 'BB', age: 26 },
	{ name: 'CC', age: 28 },
	{ name: 'DD', age: 34 },
	{ name: 'EE', age: 23 }
];

each(console.log,
	take(1,
		L_filter(user => user.name === 'BB', users))); // 아무 값도 안나옴!(원하지 않는 값은 넘기지 않도록 합성했기 때문)

go(
    users,
    L_filter(user => user.name === 'BB'),
    take(1),
    L_map(user => user.age),
    each(console.log)
); // 아무 값도 안나옴!(원하지 않는 값은 넘기지 않도록 합성했기 때문)