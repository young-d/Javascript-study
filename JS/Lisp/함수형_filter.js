function f1(limit, list) {
	let acc = 0;
	for (const a of L.filter(a => a & 1, list)) {
//		if (a & 1) {
			const b = a * a;
			acc += b;
			if (--limit === 0) break;
//		}
	}
	console.log(acc); 
}
