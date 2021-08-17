function f4(end) {
	_.go(
		L.range(1, end, 2),
		_.each(console.log)
	);
}
f4(10); //1 3 5 7 9
