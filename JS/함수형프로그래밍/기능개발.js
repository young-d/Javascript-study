import { map, go, zip } from "./lib.js";

const termsForDeploy = (progresses, speeds) => go(
    zip(progresses)(speeds),
    map(([progress, speed]) => Math.ceil((100 - progress) / speed)),
    ([..._]) => [..._]
);

const countFeature = (terms) => {
    let max = terms[0];
    return terms.reduce((acc, term) => {
        if (!acc[acc.length - 1]) acc.push(0);
        if (term > max) {
            acc.push(1);
            max = term;
        } else {
            acc[acc.length - 1]++;
        }
        return acc; 
    }, []);
}

const solution = (progresses, speeds) => go(
    termsForDeploy(progresses, speeds),
    countFeature
);

console.log(solution([93, 30, 55], [1, 30, 5])); //[2, 1]
console.log(solution([95, 90, 99, 99, 80, 99], [1, 1, 1, 1, 1, 1])); //[1, 3, 2]