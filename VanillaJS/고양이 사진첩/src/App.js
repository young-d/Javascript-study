import Nodes from "./Nodes.js";
import { request } from "./api.js";
import ImageViewer from "./ImageViewer.js";
import Loading from "./Loading.js";
import Breadcrumb from "./Breadcrumb.js";

export default function App({ $target }) {

    this.state = {
        isRoot: true,
        nodes: [],
        paths: [],
        isLoading: false
    }

    const loading = new Loading({
        $target
    });

    const breadcrumb = new Breadcrumb({
        $target,
        initialState: this.state.paths,
        onClickItem: async (id) => {
            //클릭한 경로 외에 paths를 날려준다.
            if (id) {
                const nextPaths = id ? [...this.state.paths] : [];
                const pathIndex = nextPaths.findIndex(path => path.id === id);
                
                this.setState({
                    ...this.state,
                    paths: nextPaths.slice(0, pathIndex + 1)
                })
            } else {
                this.setState({
                    ...this.state,
                    paths: []
                })
            }

            await fetchNodes(id);
        }
    });

    const nodes = new Nodes({
        $target, 
        initialState: {
            isRoot: this.state.isRoot,
            nodes: this.state.nodes,
            selectedImageUrl: null,
            paths: this.state.paths
        },
        onPrevClick: async () => {
            const nextPaths = [...this.state.paths];
            nextPaths.pop();
            this.setState({
                ...this.state,
                paths: nextPaths
            })

            const { paths } = this.state;

            if (paths.length === 0) {
                await fetchNodes();
            } else {
                await fetchNodes(paths[paths.length - 1].id);
            }
        },
        onClick: async (node) => {
            if (node.type === 'DIRECTORY') {
                await fetchNodes(node.id);
                
                this.setState({
                    ...this.state,
                    paths: [...this.state.paths, node]
                })
            }

            if (node.type === 'FILE') {
                this.setState({
                    ...this.state,
                    selectedImageUrl: `https://cat-api.roto.codes/static${node.filePath}`
                })
            }
        }
    });

    const imageViewer = new ImageViewer({
        $target,
        onImageViewerClose: () => {
            this.setState({
                ...this.state,
                selectedImageUrl: null
            })
        }
    });

    this.setState = nextState => {
        this.state = nextState;

        nodes.setState({
            isRoot: this.state.isRoot,
            nodes: this.state.nodes
        })

        imageViewer.setState({
            selectedImageUrl: this.state.selectedImageUrl
        })

        loading.setState(this.state.isLoading);

        breadcrumb.setState(this.state.paths);
    };

    const fetchNodes = async (id) => {
        //데이터를 요청 시작시에는 로딩중=true
        this.setState({
            ...this.state,
            isLoading: true
        })

        const nodes = await request(id ? `/${id}` : '/');

        //데이터 요청 완료 후에는 로딩중=false
        this.setState({
            ...this.state,
            nodes,
            isRoot: id ? false : true,
            isLoading: false
        })
    };

    fetchNodes();
}