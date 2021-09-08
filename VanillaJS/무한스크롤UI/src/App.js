import PhotoList from "./PhotoList.js"
import { request } from "./api.js"

export default function App ({ $target }) {
    this.state = {
        limit: 5,
        nextStart: 0,
        photos: []
    }

    this.setState = nextState => {
        this.state = nextState;
        photoListComponent.setState(nextState.photos);
    }

    const fetchPhotos = async () => {
        const { limit, nextStart } = this.state;

        const photos = await request(`/cat-photos?_limit=${limit}&_start=${nextStart}`);
        this.setState({
            ...this.state,
            nextStart: nextStart + limit,
            photos: [ ...this.state.photos, ...photos ]
        })
    }

    const photoListComponent = new PhotoList({
        $target,
        initialState: this.state.photos,
        onScrollEnded: async () => {
            await fetchPhotos();
        }
    })

    fetchPhotos();
}
 