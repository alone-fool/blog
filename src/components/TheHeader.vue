<template>
    <header id="header">
        <div class="navbox">
            <h2 class="logo">
                <router-link to="/">个人博客</router-link>
            </h2>
            <nav>
                <ul id="starlist" >
                    <li v-for="item in navList" :key="item.id" :title="item.message">
                        <router-link :to="item.path">{{item.message}}</router-link>
                    </li>
                    <li v-if="user.role == 2">
                        <router-link to="/posts">文章管理</router-link>
                    </li>      
                </ul>    
            </nav>
            <div class="searchico" @click="searchBox"></div>
            <div class="userBox mr-3">
                <div class="buttonBox" v-if="!user.signin">
                    <b-button 
                        variant="outline-light" 
                        size="sm" 
                        v-b-modal.modal-signIn>
                        登陆</b-button>
                    <b-button 
                        variant="outline-light" 
                        size="sm" 
                        v-b-modal.modal-signUp>
                        注册</b-button>
                </div>
                <div class="user" v-if="user.signin">
                    <img src="../assets/1.jpg" alt="" class="userImg mr-2">
                    <router-link :to="`/users/id=${user.id}`">{{user.name}}</router-link>
                </div>
            </div>
            <SignIn></SignIn>
            <SignUp></SignUp>
        </div>
    </header>
</template>
<script>
import SignIn from '@/components/User/SignIn'
import SignUp from '@/components/User/SignUp'
export default {
    data(){
        return {
            searching: false,
            user: this.$store.state.user,
            navList: [
                {
                    message: '网站首页',
                    path: '/'
                },
                {
                    message: '个人日志',
                    path: '/blog'
                },
                {
                    message: '留言板',
                    path: '/messageBoard'
                },
                {
                    message: '关于我',
                    path: '/aboutMe'
                }
            ]
        }
    },
    components:{
        SignIn: SignIn,
        SignUp: SignUp
    },
    methods: {
        searchBox(){
            this.searching = !this.searching;
            this.$emit('search',this.searching);
        }
    },
    created() {
        if(window.sessionStorage.length > 0){
            let payload = window.sessionStorage;
            this.$store.commit('LOAD_USER',payload);   
        }
    }
}
</script>
<style scoped>
/*header*/
header { 
    width: 100%; 
    background: #1C2327; 
    height: 50px; 
}
.navbox { 
  width: 1200px; 
  margin: auto; 
}
.logo { 
    float: left; 
    margin-right: 60px; 
    line-height: 50px; 
    color: #FFF; 
    font-size: 22px;
}
.logo a { 
    color: #FFF 
}

/*nav*/
nav { 
    float: left; 
    height: 50px; 
    line-height: 50px; 
    text-align: center; 
}
#starlist li { 
    position: relative; 
    float: left; 
    width: max-content; 
}
#starlist li a { 
    float: left; 
    padding: 0 20px; 
    color: #fff;
}
#starlist li a:hover, #starlist #selected, .selected > a, #starlist li:hover { color: #00c1de; }
#starlist li:hover a, .user a:hover { color: #00c1de }
.searchico{
    margin: 5px auto 0;
    width: 39px;
    height: 39px;
    float: right;
    cursor: pointer;
    background: url(../assets/search.png) no-repeat center !important;
}
.userBox{
    margin-top: 10px;
    float: right;
}
.userImg{
    display: inline-block;
    height: 25px;
    width: 25px;
    border-radius: 50%;
}
.user a{
    color: #fff;
    user-select: none;
}
</style>

