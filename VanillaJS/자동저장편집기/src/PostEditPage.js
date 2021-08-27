import Editor from "./Editor.js";
import { setItem, getItem, removeItem } from "./storage.js";
import { request } from "./api.js";

export default function PostEditPage({ $target, initialState }) {
    const $page = document.createElement('div');

    this.state = initialState;

    //로컬스토리지 초기값 설정
    let postLocalSaveKey = `temp-post-${this.state.postId}`;

    const post = getItem(postLocalSaveKey, {
        title: '',
        content: ''
    });

    let timer = null;

    //에디팅하기
    const editor = new Editor({
        $target: $page,
        initialState: post,
        onEditing: (post) => {
            //가장 마지막에 발생한 이벤트만 실행 
            //(연속으로 입력할 때는 이벤트 발생을 지연시키다가 작성을 다 하고 1초뒤에 스토리지에 저장 => 성능최적화에 도움!)
            if (timer !== null) {
                clearTimeout(timer);
            }

            //디바운스
            timer = setTimeout(async () => {
                //작성중인 내용을 현재시간과 함께 로컬스토리지에 저장해둔다
                setItem(postLocalSaveKey, {
                    ...post,
                    tempSaveData: new Date()
                })

                //에디팅한 포스트가 새 글일 경우 DB에 추가해주기
                const isNew = this.state.postId === 'new';
                if (isNew) {
                    const createdPost = await request('/posts', {
                        method: 'POST',
                        body: JSON.stringify(post)
                    })

                    //DB에 넣고나서 url을 계속 new 로 두면 뒤로가기등으로 돌아왔을 때 동작이 이상해지기 때문에 생성된 id로 url을 바꿔준다
                    history.replaceState(null, null, `/posts/${createdPost.id}`);
                    //저장이 성공한 경우 로컬스토리지에 있던 값 지워주기
                    removeItem(postLocalSaveKey);
                } else {
                    await request(`/posts/${post.id}`, {
                        method: 'PUT',
                        body: JSON.stringify(post)
                    })
                    removeItem(postLocalSaveKey);
                }
            }, 2000);
        }
    })

    this.setState = async nextState => {
        //방어코드
        if (this.state.postId !== nextState.postId) {
            postLocalSaveKey = `temp-post-${nextState.postId}`;

            this.state = nextState;
            await fetchPost(); 
            return;
        }

        this.state = nextState;

        this.render();

        editor.setState(this.state.post
            || {
                title: '',
                content: ''
                });
    }

    //렌더링할 때 페이지 추가하기
    this.render = () => {
        $target.appendChild($page);
    }

    //fetch api로 post 가져오기
    const fetchPost = async () => {
        const { postId } = this.state;

        //새로운 페이지가 아닌 경우 기존의 포스트 꺼내오기
        if (this.state.postId !== 'new') {
            const post = await request(`/posts/${postId}`);

            //임시 포스트 (DB에 반영되기 전 수정중인 post)
            const tempPost = getItem(postLocalSaveKey, {
                title: '',
                content: ''
            })
            
            //포스트를 수정하고 날짜가 기존의 DB데이터(update_at) 보다 큰 경우(최신인경우) temp데이터를 로딩할지 물어보고 ok하면 불러오기
            if (tempPost.tempSaveData && tempPost.tempSaveData > post.updated_at) {
                if (confirm('저장되지 않은 임시 데이터가 있습니다. 불러올까요?')) {
                    this.setState({
                        ...this.state,
                        post: tempPost
                    });
                    
                    return;
                }
            }

            this.setState({
                ...this.state,
                post
            })
        }
    }
}
