//명령형
function f1(limit, list) {
	let acc = 0;
	for (const a of list) {
		if (a & 1) {
			const b = a * a;
			acc += b;
			if (--limit === 0) break;
		}
	}
	console.log(acc); 
}
f1(3, [1, 2, 3, 4, 5, 6, 7, 8, 9]); //35 
