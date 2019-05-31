<template>
    <div class="p-5">
        <p>您还没有进行登陆操作，请登陆之后再进行操作</p>
        <b-button v-b-modal.modal-signIn>登陆</b-button>
        <b-button v-b-modal.modal-signUp>注册</b-button>
    </div>
</template>
<script>
export default {
    data(){
        return {

        }
    }
}
</script>
<style lang="scss" scoped>

</style>
