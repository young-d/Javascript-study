const join = seperator => _.reduce((a, b) => `${a}${seperator}${b}`);

_.go(
    _.range(2, 10),
    _.map(a => _.go(
        _.range(1, 10),
        _.map(b => `${a} x ${b} = ${a * b}`),
        join('n')
    )),
    join('\n\n'),
    console.log
);
