<template>
    <div id="userDesk" class="p-5">
        <div class="left w-25">
            <span class="userImg">
                <img :src="userImg" alt="">
            </span>
        </div>
        <div class="right w-50">
            <h2 class="p-2 mb-4">个人资料</h2>
            <p>ID&ensp;:&emsp;{{id}}</p>
            <p>用户名&ensp;:&emsp;{{name}}</p>
            <p>email&ensp;:&emsp;{{email}}</p>
            <p>真实姓名&ensp;:&emsp;{{truename}}</p>
            <p>联系方式&ensp;:&emsp;{{phone}}</p>
            <p>性别&ensp;:&emsp;{{sex}}</p>
            <p>职位&ensp;:&emsp;{{job}}</p>
            <div class="btn mt-5">
                <b-button class="mr-5" v-b-modal.changeinfo>修改信息</b-button> 
                <b-button @click="signout">退出登陆</b-button> 
            </div>
            <b-modal id="changeinfo" ref="changeinfo" title="修改个人信息" @ok="handleOk">
                <form ref="form" @submit.stop.prevent="handleSubmit">
                    <label for="name-input">用户名：</label>
                    <b-form-input
                        id="name-input"
                        v-model="name"
                        :state="nameState"
                        required
                    ></b-form-input>
                    <label for="email-input">邮箱：</label>
                    <b-form-input
                        id="email-input"
                        v-model="email"
                        :state="emailState"
                        required
                    ></b-form-input>
                    <label for="truename">真实姓名:</label>
                    <b-form-input
                        id="truename"
                        v-model="truename"
                    ></b-form-input>
                    <label for="phone">联系方式:</label>
                    <b-form-input
                        id="phone"
                        v-model="phone"
                    ></b-form-input>
                    <label for="sex">性别:</label>
                    <b-form-select
                        id="sex"
                        v-model="sex"
                        :options="options"
                    ></b-form-select>
                    <label for="job">职业:</label>
                    <b-form-input
                        id="job"
                        v-model="job"
                    ></b-form-input>
                </form>
            </b-modal>
        </div>
    </div>
</template>
<script>
import qs from 'qs'
export default {
    data(){
        return {
            name:'',
            nameState: null,
            email: '',
            emailState: null,
            id: 0,
            truename: '',
            phone: '',
            sex: '',
            job: '',
            userImg: null,
            options:[
                {value:'男',text:'男'},
                {value:'女',text:'女'},
                {value:'未知',text:'未知'}
            ]
        }
    },
    methods: {
        checkFormValidity() {
            const valid = this.$refs.form.checkValidity();
            this.nameState = valid ? 'valid' : 'invalid';
            this.emailState = valid ? 'valid' : 'invalid'
            return valid
        },
        handleOk(bvModalEvt) {
            bvModalEvt.preventDefault();
            this.handleSubmit();
        },
        handleSubmit() {
            if (!this.checkFormValidity()) {
                return
            }
            this.$axios.post('/api/updateUser',qs.stringify({
                id: this.id,
                name: this.name,
                email: this.email,
                sex: this.sex,
                truename: this.truename,
                phone: this.phone,
                job: this.job
            }))
            .then((res) => {
                alert(res.data.msg);
                this.$store.commit('UPDATEINFO',{
                    name: this.name,
                    email: this.email
                })
            })
            .catch((err) => {
                console.log(err);
            })
            this.$nextTick(() => {
                this.$refs.changeinfo.hide();
            })
      },
      signout(){
          this.$store.commit('SIGNOUT');
          this.$router.push('/');
      }
    },
    created(){
        let id = this.$route.params.id.split('=')[1];
        this.$axios.post('/api/getUser',qs.stringify({id:id}))
        .then((res) => {
            let user = res.data[0];
            this.name = user.name;
            this.email = user.email;
            this.id = user.id;
            this.sex = user.sex;
            this.phone = user.phone;
            this.job = user.job;
            this.truename = user.truename;
            this.userImg = user.userImg;
        })
        .catch((err) => {
            console.log(err);
        })
    }
}
</script>
<style lang="scss" scoped>
#userDesk{
    width: 1200px;
    margin: 0 auto;
    background: #fff;
    .left,.right{
        height: 100%;
        display: inline-block;
    }
    h2{
        font-size: 20px;
        border-bottom: 1px #ccc solid;
    }
    p{
        margin-left: 15px;
        a{
            font-size:14px;
            color: aquamarine;
        }
    }
}
</style>
