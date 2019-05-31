export const SAVE_LIST = 'SAVE_LIST'
export const SEARCH = 'SEARCH'
export const LOAD_BLOGS = 'LOAD_BLOGS'
const show = {
    state: {
        blogs: [],
        search: ''
    },
    mutations: {
        [SAVE_LIST](state,payload){
            state.blogs = payload;
        },
        [SEARCH](state,payload){
            state.search = payload;
        }
    }
}
export default show