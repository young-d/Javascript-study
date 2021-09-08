import PhotoList from "./PhotoList.js"
import { request } from "./api.js"

export default function App ({ $target }) {
    this.state = {
        limit: 5,
        nextStart: 0,
        totalCount: 0,
        photos: [],
        isLoading: false
    }

    this.setState = nextState => {
        this.state = nextState;
        
        photoListComponent.setState({
            totalCount: this.state.totalCount,
            photos: nextState.photos,
            isLoading: this.state.isLoading
        });
    }

    const photoListComponent = new PhotoList({
        $target,
        initialState: {
            totalCount: this.state.totalCount,
            photos: this.state.photos,
            isLoading: this.state.isLoading
        },
        onScrollEnded: async () => {
            await fetchPhotos();
        }
    })

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

    const init = async () => {
        const totalCount = await request('/cat-photos/count');

        this.setState({
            ...this.state,
            totalCount
        })

        fetchPhotos();
    }
    
    init();
}
 