<template>
    <div class="whitebg bloglist">
      <h2 class="htitle">最新博文</h2>
      <ul>
        <li v-for="item in filteredBlogs" :key="item.id" :title="item.title">
          <h3 class="blogtitle">
              <b>【顶】</b>
              <router-link :to="`/show/id=${item.id}`">
                {{item.title}}
              </router-link>
          </h3>
          <span class="blogpic imgscale">
              <router-link :to="`/show/id=${item.id}`">
                <img src="https://picsum.photos/1024/480/?image=52" :alt="item.title">
              </router-link>
          </span>
          <p class="blogtext">{{item.content.substr(0,150)}} </p>
          <p class="bloginfo">
              <span>{{item.timer}}</span>
              <router-link to="/blog" class="viewmore">
                阅读更多
              </router-link>
          </p>
        </li>
      </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            search: this.$store.state.show.search,
            articles: this.$store.state.show.blogs
        }
    },
    computed: {
        filteredBlogs(){
            return this.articles.filter((blog) => {
                return blog.title.match(this.search);
            })
        }
    }
}
</script>
<style scoped>
.htitle{
    max-width: 5em;
    font-size: 20px;
    text-align: center;
    line-height: 40px;
    border-bottom: 2px #000 solid;
}
/*bloglist*/
.bloglist ul { 
    padding: 10px 0 0;
}
.bloglist li { 
    overflow: hidden; 
    margin-bottom: 20px; 
    border-bottom: #eee 1px dashed; 
    position: relative; 
}
.blogtitle { 
    margin: 0 0 10px 0; 
    font-size: 18px; 
    overflow: hidden; 
}
.bloglist li:hover .blogtitle a { color: #337ab7; }
.blogtitle b { color: #F00 }
.blogpic { 
    float: left; 
    width: 23.2%; 
    height: 100%;
    margin-right: 20px; 
    display: block; 
    overflow: hidden; 
    border-radius: 3px; 
}
.blogtext { 
    font-size: 14px; 
    color: #666; 
    overflow: hidden; 
    text-overflow: ellipsis; 
    -webkit-box-orient: vertical; 
    display: -webkit-box;
    -webkit-line-clamp: 3; 
    text-indent: 2em;
    margin: 10px auto 0;
}


.bloginfo { 
    overflow: hidden; 
    color: #999; 
    margin-top: 5px;
    line-height: 30px; 
}
a.viewmore { 
    display: block; 
    float: right;
    padding: 0 10px; 
    background: #12b7de; 
    color: #fff; 
    border-radius: 3px; 
}
</style>
