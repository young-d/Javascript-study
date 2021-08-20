//  입력값 필터링하고 정렬하기
const flowers = [
    {
        name: '해바라기',
        color: ['yellow'],
        length: 200,
        season: 'summer'
    },
    {
        name: '장미',
        color: ['red', 'pink', 'blue', 'yellow', 'white'],
        length: 30,
        season: 'summer'
    },
    {
        name: '벚꽃',
        color: ['white', 'pink'],
        length: 5,
        season: 'spring'
    },
    {
        name: '튤립',
        color: ['red', 'pink', 'yellow'],
        length: 20,
        season: 'summer'
    },
]

//핑크색이 있고, 여름에 피는 꽃
//명령형
function c_filterFlowers(flowers, color) {
    const results = [];

    for (let i = 0; i < flowers.length; i++) {
        const flower = flowers[i];
        if (flower 
            && flower.color.includes(color)
            && flower.season === 'summer') {
                results.push(flower.name);
        }
    }

    return results;
}

const c_filteredFlowers = c_filterFlowers(flowers, 'pink');

document.querySelector('#command2').innerHTML = c_filteredFlowers; //장미, 튤립


//선언형
function d_filterFlowers(flowers, color) {
    return flowers.filter(flower => 
        flower 
            && flower.color.includes(color)
            && flower.season === 'summer')
        .map(flower => flower.name);
}

const d_filteredFlowers = d_filterFlowers(flowers, 'yellow');

document.querySelector('#declare2').innerHTML = d_filteredFlowers; //장미, 튤립
