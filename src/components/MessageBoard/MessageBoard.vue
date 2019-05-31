<template>
    <div id="messageBoard">
        <h2>留言板</h2>
        <p>来说点儿什么吧!</p>
        <div class="notic">
            <h3 class="ml-3">公告</h3>
            <p class="p-3 mr-5">在这里，你可以畅所欲言！</p>
        </div>
        <div class="input-group">
            <label for="message">留言内容：</label>
            <textarea 
            name="message" 
            placeholder="请输入留言内容" 
            ref="message" 
            class="mr-5 p-3" 
            v-if="user.signin" 
            v-model="messageInput"></textarea>
            <div class="signbox mr-5 p-3" v-if="!user.signin">
                <p>您还没有进行登陆操作，请登陆/注册之后再留言</p>
                <b-button v-b-modal.modal-signIn>登陆</b-button>
                <b-button v-b-modal.modal-signUp>注册</b-button>
            </div>
            <button class="btn-post mt-3" v-on:click="postMessage">留言</button>
        </div>
        <div id="board" class="mt-5 mr-5 p-3">
            <div v-for="item in message" :key="item.id" class="p-3 mt-3">
                <p class="username">{{item.username}}<span class="mr-5">{{item.timer}}</span></p>
                <p class="message">{{item.message}}</p>
            </div>
        </div>
    </div>
</template>
<script>
import qs from 'qs'
export default {
    data() {
        return {
            user: this.$store.state.user,
            message: [],
            messageInput: ''
        }
    },
    created(){
        this.$axios.get('api/allMessage')
        .then((res) => {
            // console.log(res.data.reverse());
            this.message = res.data.reverse();
        })
        .catch((err) => {
            console.log(err);
        })
    },
    methods: {
        postMessage(){
            if(this.messageInput == ''){
                return
            }
            let params ={
                username: this.user.name,
                message: this.messageInput
            }
            this.$axios.post('api/messageBoard',qs.stringify(params))
            .then((res) => {
                alert(res.data.msg);
                this.messageInput = '';
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }
}
</script>
<style lang="scss" scoped>
#messageBoard{
    width: 1200px;
    min-height: 600px;
    background: #fff;
    margin: 10px auto;
    padding: 20px;
    h2{
        border-bottom: #000 2px solid;
        padding: 10px;
        max-width: 5em;
        font-size: 24px;
    }
    .notic{
        h3{
            font-size: 20px;
        }
        p{
            border: #000 1px solid;
            text-indent: 2em;
        }
    }
    .input-group{
        label{
            display: block;
        }
        textarea,.signbox{
            display: block;
            width:100%;
            min-height: 60px;
        }
        .signbox{
            border: #000 1px solid;
            button{
                width:80px;
                height: 38px;
                background: #000;
                color:#fff;
                border:0;
                border-radius: 5px;
            }
        }
        .btn-post{
            width:80px;
            height: 38px;
            background: #000;
            color: #fff;
            border:0;
            border-radius: 5px;
        }
    }
    #board{
        div{
            width:100%;
            height: 100px;
            border-top: #ccc 1px solid;
        }
        span{
            float: right;
            font-size: 14px;
            color: #555;
        }
        .message{
            padding: 10px;
            background: #eee;
        }
    }
}
</style>
