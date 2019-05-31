<template>
    <footer>
        <div class="box">
            <div class="endnav">
                <p><b>站点声明：</b></p>
                <p>1、本站均为本人设计，个人可以使用，但是未经许可不得用于任何商业目的。</p>
                <p>2、所有文章未经授权禁止转载、摘编、复制或建立镜像，如有违反，追究法律责任。</p>
                </div>
        </div>
        <a href="#">
            <div class="top"></div>
        </a> 
    </footer>
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
footer { 
    background: #373D41; 
    width: 100%; 
    border-top: #00C1DE 10px solid; 
    padding: 30px 0; 
    color: #73777a; 
    font-size: 14px; 
}
.endnav b { 
    font-size: 16px; 
    color: #00c1de; 
}
.endnav p { 
    margin-bottom: 5px; 
}
footer a { 
    color: #73777a; 
}
footer a:hover { 
    color: #00C1DE; 
}
.top { 
    width: 40px; 
    height: 40px; 
    display: block; 
    background: url(../assets/top.png) no-repeat center #000; 
    right: 20px; 
    bottom: 10%; 
    position: fixed;
}
</style>
