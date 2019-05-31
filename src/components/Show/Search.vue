<template>
    <div class="searchbox">
        <div class="search">
            <input name="keyboard" id="keyboard" class="input_text" type="text" placeholder="请输入搜索内容" v-model="value">
            <input name="Submit" class="input_submit" value="搜索" type="submit" @click="search">
        </div>
    <div class="searchclose" @click="searchClose"></div>
</div>
</template>
<script>
export default {
    data() {
        return {
            value: '',
        }
    },
    methods:{
        searchClose(){
            this.$emit('searchClose',false);
            this.value = '';
            this.search();
        },
        search(){
            this.$store.commit('SEARCH',this.value);
            this.$router.push('/blog');
        }
    }
}
</script>
<style scoped>
.searchbox { 
    width: 1200px; 
    margin: 10px auto; 
    overflow: hidden; 
    background: #ffffff; 
    position: relative; 
}
.search { 
    width: 50%; 
    margin: 20px auto; 
    background: #000; 
    border-radius: 0 5px 5px 0; 
    position: relative; 
    border: #ccc 1px solid; 
    /* display: none;  */
}
.search input.input_submit { 
    border: 0; 
    background: #000; 
    color: #fff; 
    outline: none; 
    position: absolute; 
    top: 5px; 
    right: 10%;
}
.search input.input_text { 
    border: 0; 
    line-height: 36px; 
    height: 36px; 
    width: 72%; 
    padding-left: 10px; 
    outline: none ;
}
.searchclose { 
    background: url(../../assets/close.png) no-repeat; 
    display: block; 
    position: absolute; 
    width: 28px; 
    height: 30px; 
    right: 5px; 
    top: 5px ;
}
</style>
