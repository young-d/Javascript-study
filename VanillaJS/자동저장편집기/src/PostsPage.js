import PostList from "./PostsList.js";
import { request } from "./api.js";
import { push } from "./router.js";
import LinkButton from "./LinkButton.js";

export default function PostPage({ $target }) {
    const $page = document.createElement('div');

    const postList = new PostList({
        $target: $page,
        initialState: []
    })

    //버튼 이벤트(새글쓰기)
    new LinkButton({
        $target: $page,
        initialState: {
            text: 'New Post',
            link: '/posts/new'
        }
    })
    // const $newPostButton = document.createElement('button');
    // $newPostButton.textContent = 'New Post';
    // $page.appendChild($newPostButton);

    // $newPostButton.addEventListener('click', () => {
    //     push(`/posts/new`);
    // });
    
    const fetchPosts = async () => {
        const posts = await request('/posts');
    
        postList.setState(posts);
    }

    this.render = async () => {
        await fetchPosts();
        $target.appendChild($page);
    }
}