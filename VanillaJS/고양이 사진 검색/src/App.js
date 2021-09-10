import Header from "./Header.js";
import { request } from "./api.js";
import SuggestKeywords from "./SuggestKeywords.js";

export default function App({ $target }) {
    this.state = {
        keyword: '',
        keywords: []
    }

    this.setState = nextState => {
        this.state = nextState;
        console.log(this.state.keywords);

        header.setState({
            keyword: this.state.keyword
        });
        
        suggestKeywords.setState({
            keywords: this.state.keywords
        });
    }

    const header = new Header({
        $target,
        initialState: {
            keyword: this.state.keyword
        },
        onKeywordInput: async (keyword) => {
            if (keyword.trim().length > 1) {
                const keywords = await request(`/keywords?q=${keyword}`);

                this.setState({
                    ...this.state,
                    keyword,
                    keywords
                })
            }
        }
    });
    

    const suggestKeywords =  new SuggestKeywords({
        $target,
        initialState: {
            keywords: this.state.keywords,
            cursor: -1
        },
        onKeywordSelect: (keyword) => {
            this.setState({
                ...this.state,
                keyword,
                keywors: []
            })
        }
    })
}