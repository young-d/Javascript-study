function f1(limit, list) {
	let acc = 0;
	for (const a of L.map(a => a * a, L.filter(a => a & 1, list))) {
//			const b = a * a;
			acc += b;
			if (--limit === 0) break;
	}
	console.log(acc); 
}
