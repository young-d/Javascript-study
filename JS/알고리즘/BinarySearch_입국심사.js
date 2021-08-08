//10억명이면 선형탐색도 불가능 -> 무조건 log시간으로 풀어야함 (이진탐색)
//times -> 선형로그시간으로 충분히 가능!

//우리는 특정한 값을 찾는 것이 아님(이진탐색은 특정값을 찾는 알고리즘)
//그러나 문제는 최소 몇분에 끝나는지를 찾는 것이다
// => 결정문제 = 이진탐색 = 파라메트릭 서치(Parametric search)
// 최소 1분에서 10억분 * n 사이
// 각 심사관들이 몇명씩의 입국자를 처리하는가?
// 처리가능한 입국자가 n보다 작다면 분을 올려야하고, 입국자가 n보다 크다면 분을 낮춰야한다
// 심사관이 시간대비 몇명을 처리할 수 있는가? -> 시간 / 심사시간 = 심사관당 처리가능한 입국자수

function solution(n, times) {
    let min = 1; //최소시간
    let max = Math.max(...times) * n; //최대시간

    while(min <= max) {
        const mid = Math.floor((min + max) / 2); //이진 탐색 시간
        const total = times.reduce((acc, time) => acc += Math.floor(mid / time), 0); //해당 시간동안 심사관들이 담당할 수 있는 최대 입국자의 총 수

        if(total < n) {
            min = mid + 1; 
        }else {
            max = mid - 1;
        }
    }
    return min;
}