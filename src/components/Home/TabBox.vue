<template>
    <div class="tab_box whitebg">
      <div class="tab_buttons">
        <ul>
            <li class="newscurrent">个人博客日记</li>
            <!-- <li>CSS3|Html5</li>
            <li>网站建设</li>
            <li>推荐工具</li>
            <li>设计心得</li> -->
        </ul>
      </div>
      <div class="newstab">
        <div class="newsitem">
          <!-- <Newspic></Newspic> -->
          <ul class="newslist">
            <li v-for="item in articles" :key="item.id" :title="item.title">
                <i></i>
                <router-link :to="`/show/id=${item.id}`">
                    {{item.title}}
                </router-link>
                <p>{{item.content}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    props:{
        articles: Array
    }
}
</script>
<style scoped>
/*tab_buttons*/
.tab_buttons { 
    margin-bottom: 1em; 
    width: 100%; 
    overflow: hidden; 
    border-bottom: #e4e3e3 1px solid; 
}
.tab_buttons li { 
    display: block; 
    font-size: 16px; 
    line-height: 40px; 
    float: left; 
    min-width: 6.5em; 
    text-align: center;
    /* cursor:pointer; */
}
.newscurrent { 
    border-bottom: 2px #000 solid;
}
.newsitem { 
    display: none; 
}
.newsitem:nth-child(1) { 
    display: block; 
}
/*tab_box*/

.tab_box { 
    clear: both; 
    position: relative; 
}
.newslist { 
    /* float: right;  */
    width: 100%;
}
.newslist li { 
    height: 32px;
    overflow: hidden; 
    line-height: 32px; 
    padding: 0 20px 10px 20px; 
}
.newslist li a { 
    height: 32px; 
}
.newslist li:hover { height: 100%; background: #f7f7f7 }
.newslist li:hover a { color: #000; font-weight: bold }
.newslist li:hover i { background: #222; }
.newslist li:nth-child(1) { height: 100%; background: #f7f7f7 }
.newslist li:nth-child(1) a { color: #000; font-weight: bold }
.newslist li:nth-child(1) i { background: #9a9a9a; }
.newslist:hover li:nth-child(1) { height: 32px; background: none; }
.newslist:hover li:nth-child(1) a { color: #333; font-weight: normal }
.newslist:hover li:nth-child(1) i { background: #9a9a9a; }
.newslist:hover li:nth-child(1):hover { height: 100%; background: #f7f7f7; }
.newslist:hover li:nth-child(1):hover a { color: #000; font-weight: bold }
.newslist:hover li:nth-child(1):hover i { background: #222; }
.newslist p { 
    line-height: 24px; 
    font-size: 14px; 
    overflow: hidden; 
    text-overflow: ellipsis; 
    -webkit-box-orient: vertical; 
    display: -webkit-box; 
    -webkit-line-clamp: 2; 
    height: 48px; 
}

.newsitem ul li i { display: block; width: 20px; height: 20px; background: #9a9a9a; float: left; margin-top: 6px; margin-right: 20px; position: relative; font-style: normal }
.newsitem ul li i::before { position: absolute; left: 0; top: 0; font-size: 9px; color: #fff; line-height: 20px; width: 20px; text-align: center }
.newsitem ul li:first-child i { background: #222; }
.newsitem ul li:first-child i::before { content: "1"; }
.newsitem ul li:nth-child(2) i::before { content: "2"; }
.newsitem ul li:nth-child(3) i::before { content: "3"; }
.newsitem ul li:nth-child(4) i::before { content: "4"; }
.newsitem ul li:nth-child(5) i::before { content: "5"; }
</style>
