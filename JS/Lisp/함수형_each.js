function f4(end) {
	go(
		L.range(1, end, 2),
		each(console.log)
	);
}
f4(10); //1 3 5 7 9
