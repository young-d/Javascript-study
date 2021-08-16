//L.map()
const L.map = curry(functoin* (f, iter) =>
	for (const a of iter) {
		yield go1(a, f);
	}
});