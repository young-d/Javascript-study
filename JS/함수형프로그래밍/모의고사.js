import { map, take, go, countBy, groupBy, flat, zip } from "./lib.js";

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
    (a) => a,
    flat, 
    take(length)
);

//답 전체를 구해 정답과 하나씩 맞춰보면서 점수 매기기
const scoring = (answers) => ({name, pattern}) => ({
    name,
    score: go(
        randomAnswers(pattern, answers.length),
        zip(answers),
        countBy(([a, b]) => (a === b ? "o" : "x")),
        (counted) => counted.o || 0
    ),
});

//구해진 각 학생들의 점수 중에서 가장 큰 값을 찾아 그 학생의 이름을 배열에 담아 리턴
const solution = (answers) => go(
    students,
    map(scoring(answers)),
    groupBy(({ score }) => score), //숫자가 큰 키가 뒤로간다
    Object.values, //학생들의 이름을 가져온다.
    last,
    map(({ name }) => name),
    (_) => [..._]
);

console.log(solution([1, 2, 3, 4, 5])); //[1]
console.log(solution([1, 3, 2, 4, 2])); //[1, 2, 3]