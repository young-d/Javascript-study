import PostPage from "./PostPage.js";

export default function APp({ $target }) {
    const postPage = new PostPage({
        $target
    })

    postPage.render();
}