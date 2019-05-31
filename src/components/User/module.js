export const LOAD_USER = 'LOAD_USER'
export const SIGNIN = 'SIGNIN'
export const SIGNUP = 'SIGNUP'
export const SIGNOUT = 'SIGNOUT'
export const UPDATEINFO = 'UPDATEINFO'
const user = {
    state: {
        id: 0,
        name: null,
        role: 0,
        signin: false 
    },
    mutations: {
        // 页面刷新时加载存储在session storage的用户信息
        [LOAD_USER](state,payload){
            state.id = payload.id;
            state.name = JSON.parse(payload.name);
            state.role = payload.role;
            state.signin = payload.signin;
        },
        // 登陆
        [SIGNIN](state,payload){
            state.name = payload.name;
            state.role = payload.role;
            state.signin = payload.signin;
            state.id = payload.id;
            // 将用户信息保存到sessionStorage中
            sessionStorage.setItem('name', JSON.stringify(payload.name));
            sessionStorage.setItem('role',payload.role);
            sessionStorage.setItem('signin',payload.signin);
            sessionStorage.setItem('id',payload.id);
        },
        // 删除当前用户信息
        [SIGNOUT](state){
            state.name = '';
            state.role = 0;
            state.signin = false;
            // 将用户信息从sessionStorage中删除
            sessionStorage.removeItem('name');
            sessionStorage.removeItem('role');
            sessionStorage.removeItem('signin');
            sessionStorage.removeItem('id');
        },
        [UPDATEINFO](state,payload){
            let {name,email} = payload;
            state.name = name;
            state.email = email;
            sessionStorage.setItem('email',email);
            sessionStorage.setItem('name',name);
        }
    }
}
export default user