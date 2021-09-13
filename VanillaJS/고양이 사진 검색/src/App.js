import Header from "./Header.js";
import { request } from "./api.js";
import SuggestKeywords from "./SuggestKeywords.js";
import SearchResults from "./SearchResults.js";
import debounce from "./debounce.js";
import { setItem, getItem } from "./stroage.js";

export default function App({ $target }) {
    this.state = {
        keyword: '',
        keywords: [],
        catImages: []
    }

    this.cache = getItem('keywords_cache', {});

    this.setState = nextState => {
        this.state = nextState;

        if (this.state.keyword !== nextState.keyword) {
            header.setState({
                keyword: this.state.keyword
            });
        }
        
        suggestKeywords.setState({
            keywords: this.state.keywords
        });

        if (this.state.catImages.length > 0) {
            searchResults.setState(this.state.catImages);
        }
    }

    const header = new Header({
        $target,
        initialState: {
            keyword: this.state.keyword
        },
        onKeywordInput: debounce(async (keyword) => {
            //디바운스
            if (keyword.trim().length > 1) {
                let cachedKeywords = null;

                //초기에 캐싱된 키워드는 스토리지에서 가져오고 아닌 경우에는 request 후 스토리지에 추가
                if (this.cache[cachedKeywords]) {
                    cachedKeywords = this.cache[cachedKeywords];
                } else {
                    cachedKeywords = await request(`/keywords?q=${keyword}`);
                    this.cache[keyword] = cachedKeywords;
                    setItem('keywords_cached', this.cache);
                }

                const keywords = await request(`/keywords?q=${keyword}`);

                this.setState({
                    ...this.state,
                    keyword,
                    keywords
                })
            }
        }, 300),
        onEnter: () => {
            fetchCatsImage();
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

            fetchCatsImage();
        }
    });

    const searchResults = new SearchResults({
        $target,
        initialState: this.state.catImages
    });

    const fetchCatsImage = async () => {
        const { data } = await request(`/search?q=${this.state.keyword}`);

        this.setState({
            ...this.state,
            catImages: data,
            keywords: []
        })
    }
}
