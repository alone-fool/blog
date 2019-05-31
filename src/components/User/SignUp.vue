<template>
  <div id="signUp">
    <b-modal
      id="modal-signUp"
      name="modal-signUp"
      ref="modal"
      title="注册"
      @show="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group>
          <label for="name">昵称</label>
          <b-form-input
            id="name"
            v-model="name"
            :state="nameState"
            required
          ></b-form-input>
          <label for="password">密码(密码由6-20位的数字、字母、下划线组成)</label>
          <b-form-input
            id="password"
            type="password"
            v-model="password"
            :state="passState"
            required
          ></b-form-input>
          <label for="repassword">确认密码</label>
          <b-form-input
            id="repassword"
            type="password"
            v-model="repassword"
            :state="repassState"
            required
          ></b-form-input>
          <label for="email">email</label>
          <b-form-input
            id="email"
            v-model="email"
            :state="emailState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import Qs from 'qs'
  // 密码由6-20位的数字、字母、下划线组成
  const passReg = /^(\w){6,20}/;
  //邮箱验证
  const emailReg = /^(\w-*\.*)+@(\w?)+(\.\w{2,})+$/;
  export default {
    data() {
      return {
        name: '',
        password: '',
        email: '',
        repassword: '',
        userImg: null,
        nameState: null,
        passState: null,
        repassState: null,
        emailState: null
      }
    },
    methods: {
      upload(e){
        console.log(e.target.file);
        console.log(this.userImg);
      },
      checkFormValidity() {
        const valid = this.$refs.form.checkValidity();
        if(!valid){
          this.nameState = this.name !== '' ? 'valid' : 'invalid';
          this.passState = this.password !== '' ? 'valid' : 'invalid';
          this.emailState = this.email !== '' ? 'valid' : 'invalid';
          this.repassState = this.repassword !== '' && this.password == this.repassword ? 'valid' : 'invalid';
          if(passReg.test(this.password)){
            this.passState = 'valid';
          }else{
            this.passState = 'invalid';
            return
          }
          if(emailReg.test(this.email)){
            this.emailState = 'valid';
          }else{
            this.emailState = 'invalid';
          }
        }
        return valid
      },
      resetModal() {
        this.name = '';
        this.nameState = null;
        this.password = '';
        this.passState = null;
        this.email = '';
        this.emailState = null;
        this.repassword = '';
        this.repassState = null;
      },
      handleOk(bvModalEvt) {
        bvModalEvt.preventDefault();
        this.handleSubmit();
      },
      handleSubmit() {
        if (!this.checkFormValidity()) {
          return
        }
        if(emailReg.test(this.email) && passReg.test(this.password)){
          this.$axios.post('/api/signUp',Qs.stringify(
            {
              name: this.name,
              password: this.password,
              email: this.email,
            }
          ))
          .then((res) => {
              alert(res.data.msg);
          })
          .catch((err) => {
            console.log(err);
          });
        }else{
          alert('密码或者邮箱格式不对');
        }
        this.$nextTick(() => {
          this.$refs.modal.hide();
        })
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>
