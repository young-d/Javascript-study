export default function PhotoList({ $target, initialState, onScrollEnded }) {
    const $photoList = document.createElement('div');
    $photoList.style.alignContent = 'center';
    $target.appendChild($photoList);

    this.state = initialState;
    
    this.setState = nextState => {
        this.state = nextState;
        this.render();
    }
    
    //observer
    const observer = new IntersectionObserver(entries => {
        const { totalCount, isLoading, photos } = this.state;

        entries.forEach(entry => {
            if (entry.isIntersecting && !isLoading && photos.length < totalCount) {
                console.log('화면 끝!!', entry);
                onScrollEnded();
            }
        })
    }, {
        //root: null
        rottMargin: '200px 200px 200px 200px',
        threshold: 0.5 //해당 emenent가 뷰포트에 완전히 들어올 경우에만 감지되도록하려면 1로 주기
    });

    //ul은 초기에 한 번멘 렌더링되고 이후에는 li만 추가로 append
    let isInitialize = false;

    let $lastLi = null;

    this.render = () => {
        if (!isInitialize) {
            $photoList.innerHTML = `
                <ul class="PhotoList__photos" style="list-style: none; padding: 0;"></ul>
            `;

            isInitialize = true;
        }

        const $photos = $photoList.querySelector('.PhotoList__photos');
        const { photos, isLoading } = this.state;

        photos.forEach(photo => {
            //photo의 id 기준으로 렌더링이 되어있는지 체크
            //loading 중이 아닐 때만 append
            if ($photos.querySelector(`li[data-id="${photo.id}"]`) === null && !isLoading) {
                //없으면 li 생성하고 $photos에 appendChild
                const $li = document.createElement('li');
                $li.setAttribute('data-id', photo.id);
                // $li.style = "min-height: 800px;";
                $li.innerHTML = `<img width="100%" src="${photo.imagePath}" />`;

                $photos.appendChild($li);
            }
        })

        //observer가 감시할 대상(entry) 지정    
        const $nextLi = $photos.querySelector('li:last-child');
    
        if ($nextLi !== null) {
            //이전 감시 대상 지워주기
            if ($lastLi !== null) {
                observer.unobserve($lastLi);
            }
    
            $lastLi = $nextLi;
            observer.observe($lastLi);
        }
    }
    
    this.render();
}
