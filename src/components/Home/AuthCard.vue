<template>
    <div class="card">
        <h2>我的名片</h2>
        <p>学校：广东海洋大学</p>
        <p>职业：Web前端工程师</p>
        <p>现居：广东省湛江市</p>
        <p>Email：1606845644@qq.com</p>
        <p>个人简介：熟悉DIV+CSS布局，能够使用js完成常用表现层动态效果，使用vue+node+mysql搭建了该博客</p>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    }
}
</script>
<style scoped>
.card { 
    box-shadow: 0px 1px 0px rgba(255,255,255,.1), inset 0px 1px 1px rgba(0,0,0,.7); 
    border: none;
    border-radius: 3px; 
    background: url(../../assets/quote-bg.png) no-repeat top right rgba(42,42,42,1);
    /* background-size: cover; */
    height: 280px; 
    overflow: hidden; 
    margin-bottom: 20px;
    /* position: relative; */
}
.card h2 { 
    font-size: 22px; 
    margin: 20px 15px 0; 
    color: #89919a; 
    font-weight: normal; 
    padding-bottom: 10px; 
}
.card p { 
    font-size: 12px; 
    padding: 0 0 0 20px; 
    line-height: 20px; 
    margin: 5px 0;
    text-shadow: 0px 1px 2px rgba(0,0,0,.5); 
    color: #d0d2d4; 
    -webkit-animation: animations2 5s ease-in-out 5s; 
    -moz-animation: animations2 5s ease-in-out 5s; 
    -o-animation: animations2 5s ease-in-out 5s; 
    -ms-animation: animations2 5s ease-in-out 5s; 
    animation: animations2 5s ease-in-out 5s; 
}
</style>

