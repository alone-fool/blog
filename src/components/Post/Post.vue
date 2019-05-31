<template>
<!-- 文章管理组件 -->
    <div id="posts" class="my-3">
        <b-tabs content-class="mt-3" justified v-model="tabIndex">
            <b-tab title="文章列表" active class="mb-3">
                <PostList @edit="edit"></PostList>
            </b-tab>
            <b-tab title="发布文章">
                <PostArticle :id="id"></PostArticle>
            </b-tab>
        </b-tabs>
    </div>
</template>
<script>
import PostList from '@/components/Post/PostList'
import PostArticle from '@/components/Post/PostArticle'
export default {
    data() {
        return {
            tabIndex: 0,
            id: 0
        }
    },
    components:{
        PostList,
        PostArticle
    },
    methods: {
        edit(id){
            this.tabIndex = 1;
            this.id = id;
        }
    }
}
</script>
<style lang="scss" scoped>
#posts{
    background: #fff;
    max-width: 1200px;
    border: 1px #ccc solid;
    margin: 0 auto;
}
</style>
