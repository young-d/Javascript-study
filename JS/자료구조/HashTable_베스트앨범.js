function solution(genres, plays) {
    let answer = [];
    const obj = genres.reduce((acc, element, index) => {
        if(!acc[element]) acc[element] = {'play': 0, 'songs': []};
        acc[element].play += plays[index];
        acc[element].songs.push(index);
        return acc;
    }, {});  
    
    const tmp = Object.keys(obj).sort((a, b) => {
        if(obj[a].play > obj[b].play) return -1;
        if(obj[a].play < obj[b].play) return 1; 
        else return 0;
    });

    
    for(const genre of tmp) {
        obj[genre].songs.sort((a, b) => {
            if(plays[a] > plays[b]) return -1;
            if(plays[a] < plays[b]) return 1;
            else {
                if(a < b) return -1;
                if(a > b) return 1;
            }
        });
        answer.push(obj[genre].songs[0]);
        if(obj[genre].songs.length > 1) answer.push(obj[genre].songs[1]);
    }

    return answer;
}