<template>
<!-- 发布文章 -->
    <div id="postArticle">
        <input type="text" placeholder="输入文章标题" class="title_input ml-5 mb-3" v-model="title">
        <button @click="postArticle($event)" class="post_btn ml-3">发布文章</button>
        <mavon-editor v-model="content" ref=md class="markdown" @imgAdd="$imgAdd" @imgDel="$imgDel"/>
    </div>
</template>
<script>
import qs from 'qs'
export default {
    data() {
        return {
            title: '',
            content: '',
            img_file: []
        }
    },
    props: {
        id: Number,
    },
    watch:{
        id: function(){
            console.log(this.id);
            if(this.id){
                this.$axios.post('api/posts/getArticle',qs.stringify({
                    id: this.id
                }))
                .then((res) => {
                    // console.log(res.data);
                    let {title,content} = res.data;
                    this.title = title;
                    this.content = content;
                })
                .catch((err) => {
                    console.log(err);
                })
            }
        }
    },
    methods: {
        $imgAdd(pos, $file){
            // 每次都将图片上传到服务器，用返回的url替换掉
            let formData = new FormData();
            formData.append('imgFile', $file);
            // 将所有图片缓存
            this.img_file[pos] = $file;
            this.$axios.post('api/posts/upload_img',formData)
            .then((res) => {
                // console.log(res);
                // 使用服务端返回的url替换掉原来的图片链接
                this.$refs.md.$img2Url(pos,res.data.url);
            })
        },
        $imgDel(pos){
            delete this.img_file[pos];
        },
        postArticle(event){
            this.content = this.$refs.md.value;
            console.log(this.content);
            let params = {
                id: this.id,
                title: this.title,
                content: this.content
            }
            this.$axios.post('api/posts',qs.stringify(params))
            .then((res) => {
                alert(res.data.msg);
                this.content = '';
                this.title = '';
            })
        }
    }
}
</script>
<style scoped lang='scss'>
#postArticle{
    .title_input{
        width: 80%;
        line-height: 30px;
        height: 30px;
    }
    .markdown{
        min-height: 800px;
        max-width: 1200px;
        margin: 0 auto;
    }
    .post_btn{
        background: #99f;
        height: 30px;
        width: 10%;
        line-height: 30px;
    }
}
</style>
