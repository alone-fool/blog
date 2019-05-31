import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
Vue.use(store);
Vue.use(Router);
// 按需加载路由
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/components/Home/Home'),
      meta: { index: 0}
    },
    {
      path: '/posts',
      component: () => import('@/components/Post/Post'),
      name: 'posts',
      beforeEnter(to,from,next){
        let user = window.sessionStorage;
        if(user.role == 2){
          next();
        }else{
          alert('您不是管理员，没有权限访问该页面');
          next({
            path: '/'
          });
        }
      }
    },
    {
      path: '/blog',
      component: () => import('@/components/Show/Blog')
    },
    {
      path: '/messageBoard',
      component: () => import('@/components/MessageBoard/MessageBoard')
    },
    {
      path: '/aboutMe',
      name: 'aboutMe',
      component: () => import('@/components/AboutMe/AboutMe'),
    },
    {
      path: '/users/:id',
      component: () => import('@/components/User/UserDesk'),
      name: 'user',
      //进入当前路由之前判断用户登陆状态
      beforeEnter(to,from,next){
        let user = window.sessionStorage;
        if(user.signin){
          // 如果登陆用户的id与访问路由的id相同，则显示该页面，否则出错
          if(user.id == to.params.id.split('=')[1]){
            next();
          }else{
            alert('你访问不是当前已登陆的用户信息！');
            next({
              path: '/'
            });
          }
        }else{
          next({
            path: '/login'
          })
        }
      }
    },
    {
      path: '/login',
      component: () => import('@/components/login')
    },
    {
      path: '/show/:id',
      component: () => import('@/components/Show/Show'),
      name: 'show'
    }
  ]
  // scrollBehavior(to, from, savedPosition){
  //   if (savedPosition){
  //     return savedPosition;
  //   }
  //   return { x: 0, y: 0 };
  // }
})
