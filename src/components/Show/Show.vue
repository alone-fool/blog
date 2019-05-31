<template>
    <div id="show">
        <h2>{{title}}</h2>
        <div id="timer">
            <span class="mr-5">发布时间：{{timer}}</span>
            <span>浏览次数：{{view}}</span>
        </div>
        <div v-html="compiledMarkdown" class="content mt-3"></div>
    </div>
</template>
 
 
<script>
let marked = require('marked');
let hljs = require('highlight.js');
import 'highlight.js/styles/default.css';

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code, lang) {
        if (lang && hljs.getLanguage(lang)) {    
            return hljs.highlight(lang, code, true).value;
        } else {
            return hljs.highlightAuto(code).value;
        }
    }
});

import qs from 'qs'
export default{
    data(){
        return {
            title: '圣经',
            content: '当马孔多在《圣经》所载那种龙卷风的怒号中化作可怕的瓦砾与尘埃漩涡时，奥雷里亚诺为避免在熟知的事情上浪费时间又跳过十一页 `test` 预言他正在破解羊皮卷的最后一页，宛如他正在会言语的镜中照影。他再次跳读去寻索自己死亡的日期和情形，但没等看到最后一行便已明白自己不会再走出这房间，因为可以预料这座镜子之城——或蜃景之城——将在奥雷里亚诺·巴比伦全部译出羊皮卷之时被飓风抹去 `test`、`test` 两大应用系统，让开发者更好、更快、更方便开发移动应用。\n \n',
            timer: '',
            view: 0
        }
    },
    computed: {
        compiledMarkdown() {
            return marked(this.content || '', {
                sanitize: true
            });
        }
    },
    created(){
        let id = this.getParams();
        this.$axios.post('/api/show/:id',qs.stringify({id: id}))
        .then((res) => {
            let {id,title,content,timer,view} = res.data;
            this.title = title;
            this.content = content;
            this.timer = timer;
            this.view = view;
        })
        .catch((err) => {
            console.log(err);
        })
    },
    methods: {
        getParams(){
            // console.log(this.$route.params);
            let id = this.$route.params.id;
            return id.split('=')[1];
        }
    }
}
</script>
<style lang="scss" scoped>
#show{
    max-width: 1200px;
    margin: 30px auto;
    background-color: #fff;
    padding: 30px 60px;
    h2{
        font-size: 30px;
        text-align: center;
    }
    #timer{
        height: 40px;
        line-height: 40px;
        font-size: 15px;
        color: #888;
        text-align: center;
    }
    .content{
        text-indent: 2em;
        line-height: 2em;
    }
}
</style>
