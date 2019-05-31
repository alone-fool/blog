<template>
    <div id="home" class="">
        <article>
            <div class="leftBox">
                <div class="banbox mb-3">
                    <Banner></Banner>
                    <Headline :headline="headline"></Headline>
                </div>
                <div class="clearblank"></div>
                <TabBox :articles="articles"></TabBox>
                <BlogsList :articles="articles"></BlogsList>
            </div>
            <div class="rightBox">
                <AuthCard class="mt-3"></AuthCard>
                <Rank :rank="rank"></Rank>
            </div>
        </article>
    </div>
</template>
<script>
import Banner from '@/components/Home/Banner'
import AuthCard from '@/components/Home/AuthCard'
import Headline from '@/components/Home/Headline'
import TabBox from '@/components/Home/TabBox'
import BlogsList from '@/components/Home/BlogsList'
import Rank from '@/components/Home/Rank'
export default {
    data(){
        return {
            articles: [],
            headline: [],
            rank: []
        }
    },
    components: {
        Banner: Banner,
        AuthCard: AuthCard,
        Headline: Headline,
        TabBox: TabBox,
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
                let article = res.data[item]
                article.content = this.abstractFn(article.content);
            }
            this.articles = res.data.reverse().slice(0,5);
            this.$store.commit('SAVE_LIST',this.articles);
            this.headline = res.data.slice(1,3);
            this.rank = res.data.sort(this.compare('view'));
        })
        .catch((err) => {
            console.log(err);
        })
    }
}
</script>
<style scoped lang="scss">
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

