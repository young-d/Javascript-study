import PhotoList from "./PhotoList.js"
import { request } from "./api.js"

export default function App ({ $target }) {
    this.state = {
        limit: 5,
        nextStart: 0,
        photos: [],
        isLoading: false
    }

    this.setState = nextState => {
        this.state = nextState;
        photoListComponent.setState({
            photos: nextState.photos,
            isLoading: nextState.isLoading
        });
    }

    const fetchPhotos = async () => {
        this.setState({
            ...this.state,
            isLoading: true
        })

        const { limit, nextStart } = this.state;

        const photos = await request(`/cat-photos?_limit=${limit}&_start=${nextStart}`);
        this.setState({
            ...this.state,
            nextStart: nextStart + limit,
            photos: [ ...this.state.photos, ...photos ],
            isLoading: false
        })
    }

    const photoListComponent = new PhotoList({
        $target,
        initialState: {
            photos: this.state.photos,
            isLoading: this.state.isLoading
        },
        onScrollEnded: async () => {
            await fetchPhotos();
        }
    })

    fetchPhotos();
}
 