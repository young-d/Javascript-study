function* range(start = 0, stop = start, step = 1) {
    if (arguments.length === 1) start = 0;
    if (arguments.length < 3 && start > stop) step *= -1;

    if (start < stop) {
        while (start < stop) {
        yield start;
        start += step;
        }
    } else {
        while (start > stop) {
        yield start;
        start += step;
        }
    }
}

function go(arg, ...fs) {
    return reduce((arg, f) => f(arg))(arg, fs);
}

const head = ([a]) => a;

const find = (f) => (iter) => head(filter(f)(iter));

function filter(f) {
    return function* (iter) {
        for (const a of iter) if (f(a)) yield a;
    }
}

function reduce(f) {
    return function (acc, iter) {
        if (!iter) acc = (iter = acc[Symbol.iterator]()).next().value;
        for (const a of iter) acc = f(acc, a);
        return acc;
    }
}

function zip(a) {
  return function* (b) {
        a = a[Symbol.iterator]();
        b = b[Symbol.iterator]();
        while (true) {
            const { value, done } = a.next();
            const { value: value2, done: done2 } = b.next();
            if (done && done2) break;
            yield [value, value2];
     }
  };
}

function* recursive(f, a) {
    while (true) yield (a = f(a));
}

const isOdd = a => Boolean(a % 2);

const calc = a =>
  isOdd(a)
    ? a * 3 + 1
    : a / 2;

const solution = (num) =>
  go(
    recursive(calc, num),
    zip(range(1, Infinity)),
    find(([count, result]) => result === 1),
    head
  );

console.log(solution(1)); // 3
console.log(solution(4)); // 2
console.log(solution(5)); // 5