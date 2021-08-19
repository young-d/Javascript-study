import { map, go, zip, reduce, inc } from "./lib.js";

// const termsForDeploy = (progresses, speeds) => go(
//     zip(progresses)(speeds),
//     map(([progress, speed]) => Math.ceil((100 - progress) / speed))
// );


// const countFeature = (terms) => 
//     reduce(([ counts, maxTerm ], currTerm) => 
//         maxTerm < terms 
//             ? [inc(counts, counts.length), currTerm]
//             : [inc(counts, counts.length - 1), maxTerm])([[], 0], terms);


// const solution = (progresses, speeds) => go(
//     termsForDeploy(progresses, speeds),
//     countFeature,
//     head
// );

const countFeature = terms =>
    reduce(({ counts, maxTerm}, currTerm) =>
        maxTerm < currTerm
            ? { counts: inc(counts, counts.length), maxTerm: currTerm }
            : { counts: inc(counts, counts.length-1), maxTerm: maxTerm })({ counts: [], maxTerm: 0 }, terms);

const solution = (progresses, speeds) => go(
    speeds,
    zip(progresses),
    map(([progress, speed]) => Math.ceil((100 - progress) / speed)),
    countFeature,
    result => result.counts
);

console.log(solution([93, 30, 55], [1, 30, 5])); //[2, 1]
console.log(solution([95, 90, 99, 99, 80, 99], [1, 1, 1, 1, 1, 1])); //[1, 3, 2]