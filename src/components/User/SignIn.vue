<template>
<!-- 登陆 -->
  <div id="signIn">
    <b-modal
      id="modal-signIn"
      ref="modal"
      title="登陆"
      @show="resetModal"
      @ok="handleOk"
      
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group>
          <label for="name-input">用户名：</label>
          <b-form-input
            id="name-input"
            v-model="name"
            :state="nameState"
            required
          ></b-form-input>
          <label for="pass-input" class="mt-2">密码：</label>
          <b-form-input
            id="pass-input"
            type="password"
            v-model="password"
            :state="passState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import Qs from 'qs'

  export default {
    data() {
      return {
        name: '',
        password: '',
        nameState: null,
        passState: null,
        role: 0
      }
    },
    methods: {
      checkFormValidity() {
        const valid = this.$refs.form.checkValidity();
        if(!valid){
            this.nameState = this.name !== '' ? 'valid' : 'invalid';
            this.passState = this.password !== '' ? 'valid' : 'invalid'
        }
        return valid
      },
      resetModal() {
        this.name = '';
        this.nameState = null;
        this.password = '';
        this.passState = null;
      },
      handleOk(bvModalEvt) {
        bvModalEvt.preventDefault();
        this.handleSubmit();
      },
      handleSubmit(event) {
        if (!this.checkFormValidity()) {
          return
        }
        const params={
          name: this.name,
          password: this.password
        }
        // 将登陆信息发送给后台
        this.$axios.post('/api/signIn',Qs.stringify(params))
            .then((res) => {
              alert(res.data.msg);
              if(res.data.ok !== 0){
                this.role = res.data.role;
                let id = res.data.id;
                const payload = {
                  id: id,
                  name: this.name,
                  role: this.role,  
                  signin: true
                }
                this.$store.commit('SIGNIN',payload);
              }
            })
            .catch((err) => {
                console.log(err);
            });
        // Hide the modal manually
        this.$nextTick(() => {
          this.$refs.modal.hide()
        })
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>
