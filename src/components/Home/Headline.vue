<template>
    <div class="headline">
      <ul>
        <li v-for="item in headline" :key="item.id" :title="item.title">
            <router-link :to="`/show/id=${item.id}`">
                <img src="https://picsum.photos/1024/480/?image=52">
                <span>{{item.title}}</span>
            </router-link>
        </li>
     </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    props:{
        headline: Array
    }
}
</script>
<style scoped lang="scss">
.headline { 
    width: 30%;
    height: 300px;
    display: inline-block;
    overflow: hidden;
    margin-left: 1%; 
    ul{
        height: 100%;
        margin-top: 13px;
    }
    li:nth-last-child(1){
        margin-top: 15px;
    }
}
.headline ul li { 
    width: 100%; 
    height:135px;
    background: #000; 
    overflow: hidden; 
    border-radius: 3px; 
    position: relative; 
}
.headline ul li a { 
    display: block; 
    overflow: hidden; 
    height: 100%; 
}
.headline ul li img { 
    width: 100%; 
    height: 100%; 
    -moz-transition: all .5s ease; 
    -webkit-transition: all .5s ease; 
    -ms-transition: all .5s ease; 
    -o-transition: all .5s ease; 
    transition: all .5s ease; 
    transition: all 0.5s; 
    opacity: .7;
}
.headline ul li:hover img { 
    transform: scale(1.1); 
    opacity: 1; 
}
.headline ul li span { 
    bottom: 0; 
    position: absolute; 
    top: 30%; 
    left: 0; 
    right: 0; 
    color: #FFF; 
    text-align: center; 
    font-size: 15px; 
    margin-top: 5px; 
    padding: 0 40px; 
    overflow: hidden; 
    text-overflow: ellipsis; 
    -webkit-box-orient: vertical; 
    display: -webkit-box; 
    -webkit-line-clamp: 2; 
    line-height: 24px; 
    height: 48px; 
}
</style>
