function filter(f) {
    return function* (iter) {
        for (const a of iter) if (f(a)) yield a;
    };
}

function reduce(f) {
    return function (acc, iter) {
        if (!iter) acc = (iter = acc[Symbol.iterator]()).next().value;
        for (const a of iter) acc = f(acc, a);
        return acc;
    };
}

function go(arg, ...fs) {
    return reduce((arg, f) => f(arg))(arg, fs);
}

function inc(parent, k) {
    parent[k] ? parent[k]++ : (parent[k] = 1);
    return parent;
}

const countBy = (f) => (iter) =>
    reduce((counts, a) => inc(counts, f(a)))({}, iter);

const identity = (a) => a;

function* entries(obj) {
    for (const k in obj) yield [k, obj[k]];
}

const head = ([a]) => a;

//이름을 리턴하도록 첫번째 요소를 리턴
const front = (array) => array[0];

//배열을 {"name": count} 형식의 object로 변환
const convertObj = (array) => go(
    array,
    countBy(identity)
);

const solution = (participant, completion) =>
    failer(convertObj(participant), convertObj(completion));

//object로 들어오는 인자들을 받는다
//entries: 참가자 객체를 [[name, count]] 형태로 바꿔준다
//filter: 참가자 배열의 name으로 완주자 객체에서 해당하는 이름의 개수가 count보다 작은 [name, count](완주하지 못한 선수)를 반환한다
//head: 첫번째 값만 반환한다
//front: 배열에서 이름만 반환한다 
const failer = (participant, completion) => go(
    participant,
    entries,
    filter(([name, count]) => (completion[name] || 0) < count),
    head,
    front
);

console.log(solution(["leo", "kiki", "eden"], ["eden", "kiki"]));

