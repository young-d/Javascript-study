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
        isLoading: false,
        selectedImageUrl: null
    }

    const loading = new Loading({
        $target
    });

    const breadcrumb = new Breadcrumb({
        $target,
        initialState: {
            paths: this.state.paths
        },
        onClickItem: async (id) => {
            const currentPaths = [...this.state.paths];
            const pathIndex = currentPaths.findIndex(path => path.id === id);
            const targetPaths = id ? currentPaths.slice(0, pathIndex + 1) : []
            
            if ([...currentPaths].length !== [...targetPaths].length) {
                this.setState({
                    ...this.state,
                    paths: targetPaths
                });

                await fetchNodes(id);
            }

        }
    });

    const nodes = new Nodes({
        $target, 
        initialState: {
            isRoot: this.state.isRoot,
            nodes: this.state.nodes,
        },
        onMovePrevPath: async () => {
            const { isRoot, selectedImageUrl } = this.state;

            if (!isRoot && !selectedImageUrl) {
                const nextPaths = [...this.state.paths];
                nextPaths.pop();
                
                this.setState({
                    ...this.state,
                    paths: nextPaths
                });
                
                const { paths } = this.state;
                
                if (paths.length === 0) {
                    await fetchNodes();
                } else {
                    await fetchNodes(paths[paths.length - 1].id);
                }
            }
        },
        onClickNode: async (node) => {
            if (node.type === 'DIRECTORY') {
                await fetchNodes(node.id);
                
                this.setState({
                    ...this.state,
                    paths: [...this.state.paths, node]
                });
            }

            if (node.type === 'FILE') {
                this.setState({
                    ...this.state,
                    selectedImageUrl: `https://cat-api.roto.codes/static${node.filePath}`
                });
            }
        }
    });

    const imageViewer = new ImageViewer({
        $target,
        onImageViewerClose: () => {
            this.setState({
                ...this.state,
                selectedImageUrl: null
            });
        }
    });

    this.setState = nextState => {
        this.state = nextState;

        loading.setState(this.state.isLoading);

        breadcrumb.setState(this.state.paths);

        nodes.setState({
            isRoot: this.state.isRoot,
            nodes: this.state.nodes
        });

        imageViewer.setState(this.state.selectedImageUrl);
    };

    const fetchNodes = async (id) => {
        this.setState({
            ...this.state,
            isLoading: true
        });

        const nodes = await request(id ? `/${id}` : '/');

        this.setState({
            ...this.state,
            nodes,
            isRoot: id ? false : true,
            isLoading: false
        });
    };

    fetchNodes();
}
