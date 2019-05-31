<template>
    <div id="aboutme">
        <h2 class="mb-5">关于我</h2>
        <i class="pic"><img src="../../assets/黑猫.jpg" alt=""></i>
        <div class="title-card ml-5">
            <h3 class="mb-3">方庆祥</h3>
            <p>这是一个证明自己能力的平台，我想向着前端这条路走下去。</p>
            <p>欢迎你来到我的个人博客，或许这个博客还有很多不足的地方，但是将来它会越来越好!</p>
        </div>
        <div class="">

        </div>
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
<style lang="scss" scoped>
#aboutme{
    width: 1200px;
    min-height: 400px;
    margin: 20px auto;
    padding:50px;
    background-color: #fff;
    img{
        width:125px;
        height:125px;
        border: 3px #0ef solid;
        border-radius: 50%;
        box-sizing: border-box;
    }
    .title-card,.pic{
        float: left;
    }
}
</style>
