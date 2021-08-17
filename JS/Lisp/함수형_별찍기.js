const join = seperator => _.reduce((a, b) => `${a}${seperator}${b}`);

//v1
_.go(
	L.range(1, 5), // ->[1, 2, 3, 4, 5]
	L.map(L.range), // -> [0] [0, 1] [0, 1, 2] [0, 1, 2, 3] [0, 1, 2, 3, 4]
	L.map(L.map(_ => '*')), // -> [*] [*, *] [*, *, *] [*, *, *, *] [*, *, *, *, *] 
	L.map(join('')), // -> * ** *** **** *****
	join('\n'), // -> * \n ** \n *** \n **** \n *****
	console.log
);

//v2
_.go(
    L.range(1, 5),
    L.map(star => _.go(
        L.range(star),
        L.map(_ => '*'),
        join(''))
    ),
    join('\n'),
    console.log
);

/*콘솔
*
**
***
****
*****
*/
