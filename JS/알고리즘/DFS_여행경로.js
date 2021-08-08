function solution(tickets) {
    let answer = [];
    let check = Array(tickets.length).fill(false);
    DFS('ICN', 'ICN', 0);

    function DFS(departure, route, visit) {
        if(visit === tickets.length) answer.push(route);
        for(let i = 0; i < tickets.length; i++) {
            if(!check[i] && tickets[i][0] === departure) {
                check[i] = true;
                const tmp = route + ',' + tickets[i][1];

                DFS(tickets[i][1], tmp, visit + 1);
                check[i] = false;
            }
        }
    }

    return answer.sort()[0].split(',');
}

solution([["ICN", "SFO"], ["ICN", "ATL"], ["SFO", "ATL"], ["ATL", "ICN"], ["ATL","SFO"]]);