import { filter, go, countBy, identity, entries, head } from "./lib.js";

const solution = (participant, completion) =>
    failer(convertObj(participant), convertObj(completion));

//배열을 {"name": count} 형식의 object로 변환
const convertObj = (array) => go(
    array,
    countBy(identity)
);

const failer = (participant, completion) => go(
    participant,
    entries,  //참가자 배열을 [[name, count]] 형태로 바꿔준다
    filter(([name, count]) => (completion[name] || 0) < count),  //완주자 객체에서 완주하지 못한 선수를 찾는다
    head, //완주하지 못한 한명을 찾는다
    ([name, _]) => name
);

console.log(solution(["leo", "kiki", "eden"], ["eden", "kiki"])); //leo
console.log(solution(["marina", "josipa", "nikola", "vinko", "filipa"], ["josipa", "filipa", "marina", "nikola"])); //vinko


