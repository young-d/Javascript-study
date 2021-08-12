function map(f) {
    return function* (iter) {
        for (const a of iter) yield f(a);
    }
}

function reduce(f) {
    return function (acc, iter) {
        if (!iter) acc = (iter = acc[Symbol.iterator]()).next().value;
        for (const a of iter) acc = f(acc, a);
        return acc;
    }
}

function take(limit) {
    return function* (iter) {
        for (const a of iter) {
            yield a;
            if (--limit === 0) break;
        }
    }
}

function go(arg, ...fs) {
    return reduce((arg, f) => f(arg))(arg, fs);
}

const head = ([a]) => a;
  
function inc(parent, k) {
    parent[k] ? parent[k]++ : (parent[k] = 1);
    return parent;
}
  
const countBy = (f) => (iter) =>
    reduce((counts, a) => inc(counts, f(a)))({}, iter);

const identity = a => a;

const count = countBy(identity);

const groupBy = (f) => (iter) =>
    reduce(
        (group, a, k = f(a)) => ((group[k] = (group[k] || [])).push(a), group)
    )({}, iter);


const isFlatable = a =>
    a != null && !!a[Symbol.iterator] && typeof a !== 'string';

function* flat(iter) {
    for (const a of iter) isFlatable(a) ? yield* a : yield a;
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
    }
}

const students = [
    { name: 1, pattern: [1, 2, 3, 4, 5] },
    { name: 2, pattern: [2, 1, 2, 3, 2, 4, 2, 5] },
    { name: 3, pattern: [3, 3, 1, 1, 2, 2, 4, 4, 5, 5] },
];

const last = (arr) => arr[arr.length - 1];

function* repeat(a) {
    while (true) yield a;
}

//패턴을 반복하며 문제 개수만큼 길이를 가지는 배열로 각 학생의 전체 답 구하기
const randomAnswers = (pattern, length) => go(
    pattern, 
    repeat, 
    flat, 
    take(length)
);

//
const scoring = (answers) => ({name, pattern}) => ({
    name,
    score: go(
        randomAnswers(pattern, answers.length),
        zip(answers),
        countBy(([a, b]) => (a === b ? "o" : "x")),
        (counted) => counted.o || 0
    ),
});

const solution = (answers) => go(
    students,
    map(scoring(answers)),
    groupBy(({ score }) => score), //숫자가 큰 키가 뒤로간다
    Object.values, 
    last,
    map(({ name }) => name),
    (_) => [..._]
);

console.log(solution([1,2,3,4,5]));
