<template>
<!-- 个人日志页面 -->
    <div id="home" class="">
        <article>
            <div class="leftBox">
                <BlogsList :articles="blogs"></BlogsList>
            </div>
            <div class="rightBox">
                <Rank :rank="rank"></Rank>
            </div>
        </article>
    </div>
</template>
<script>
import BlogsList from '@/components/Home/BlogsList'
import Rank from '@/components/Home/Rank'

export default {
    data(){
        return {
            blogs: [],
            headline: [],
            rank: []
        }
    },
    components: {
        BlogsList: BlogsList,
        Rank: Rank
    },
    methods:{
        abstractFn(res){
            if(!res){
                return '';
            }else{
                // console.log(res);
                var str=res.replace(/(\*\*|__|==)(.*?)(\*\*|__|==)/g,'')          //全局匹配内粗体
                .replace(/\!\[[\s\S]*?\]\([\s\S]*?\)/g,'')                  //全局匹配图片
                .replace(/\[[\s\S]*?\]\([\s\S]*?\)/g,'')                    //全局匹配连接
                .replace(/<\/?.+?\/?>/g,'')                                 //全局匹配内html标签
                .replace(/(\*)(.*?)(\*)/g,'')                               //全局匹配内联代码块
                .replace(/`{1,2}[^`](.*?)`{1,2}/g,'')                       //全局匹配内联代码块
                .replace(/```([\s\S]*?)```[\s]*/g,'')                       //全局匹配代码块
                .replace(/:::([\s\S]*?):::[\s]*/g,'')                       //全局文本对齐
                .replace(/\~\~(.*?)\~\~/g,'')                               //全局匹配删除线
                .replace(/[\s]*[-\*\+]+(.*)/g,'')                           //全局匹配无序列表
                .replace(/[\s]*[0-9]+\.(.*)/g,'')                           //全局匹配有序列表
                .replace(/(#+)(.*)/g,'')                                    //全局匹配标题
                .replace(/(>+)(.*)/g,'')                                    //全局匹配摘要
                .replace(/\r\n/g,"")                                        //全局匹配换行
                .replace(/\n/g,"")                                          //全局匹配换行
                .replace(/\s/g,"")                                          //全局匹配空字符;
                .replace(/&emsp;+/g,'')
                return str.slice(0,155);
            }
        },
        compare(property){
            return function(a,b){
                let value1 = a[property];
                let value2 = b[property];
                return value2 - value1;
            }
        }
    },
    created(){
        this.$axios.get('/api/posts/getAllArticle')
        .then((res) => {
            for(let item in res.data){
                let blog = res.data[item];
                blog.content = this.abstractFn(blog.content);
            }
            this.blogs = res.data.reverse();
            this.$store.commit('SAVE_LIST',this.blogs);
            this.rank = res.data.sort(this.compare('view'));
        })
        .catch((err) => {
            console.log(err);
        })
    }
}
</script>
<style scoped>
.leftBox{
    width: 75%;
    float: left;
    overflow: hidden;
}
.rightBox{
    width: 23.5%;
    float: right;
    overflow: hidden;
}
</style>
