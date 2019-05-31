<template>
    <div class="whitebg paihang">
        <h2 class="htitle">点击排行</h2>
        <!-- <section class="topnews imgscale">
            <router-link :to="`/show/id=${rank[0].id}`">
                <img src="https://hbimg.huabanimg.com/5adab811e8d7ef3a9725745a932592c86fbee21e5a542-m3nA5J_fw658">
                <span>{{rank[0].title}}</span>
            </router-link>
        </section> -->
        <ul>
            <li v-for="item in rank" :key="item.id">
                <i></i>
                <router-link :to="`/show/id=${item.id}`">
                    {{item.title}}
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
        rank: Array
    }
}
</script>
<style scoped lang="scss">
.htitle { 
    font-size: 16px; 
    line-height: 40px; 
    border-bottom: 1px solid #eee; 
    color: #484848; 
    font-weight: normal; 
    position: relative; 
    margin-bottom: 10px; 
}
// .topnews { 
//     display: block; 
//     margin: 20px 0; 
//     background: #000; 
//     position: relative; 
//     overflow: hidden; 
//     border-radius: 3px; 
//     max-height: 110px; 
//     img{
//         opacity: .7;
//     }
//     span{
//         bottom: 0; 
//         position: absolute; 
//         bottom: 30%; 
//         left: 0; 
//         right: 0; 
//         color: #FFF; 
//         text-align: center; 
//         font-size: 15px; 
//         padding: 0 40px; 
//         overflow: hidden; 
//         text-overflow: ellipsis; 
//         -webkit-box-orient: vertical; 
//         display: -webkit-box; 
//         -webkit-line-clamp: 2; 
//         line-height: 22px;
//     }
// }
// .topnews:hover img { opacity: .9; transform: scale(1.1); }
.paihang ul { 
    overflow: hidden;
    li{
        height: 30px; 
        line-height: 30px; 
        margin-bottom: 10px; 
        padding-left: 5px; 
        text-overflow: ellipsis; 
        white-space: nowrap; 
        overflow: hidden;
        i{
            display: block; 
            width: 16px; 
            height: 16px; 
            background: #B1B1B1; 
            float: left; 
            margin-top: 8px; 
            margin-right: 10px; 
            position: relative; 
            font-style: normal ;
        }
    }
}
.paihang ul li:nth-child(even) { background: #f6f6f6 }
.paihang ul li i::before { position: absolute; left: 0; top: 0; font-size: 9px; color: #fff; line-height: 16px; width: 16px; text-align: center }
.paihang ul li:first-child i, .paihang ul li:nth-child(2) i, .paihang ul li:nth-child(3) i { background: #FF6600; }
.paihang ul li:first-child i::before { content: "1"; }
.paihang ul li:nth-child(2) i::before { content: "2"; }
.paihang ul li:nth-child(3) i::before { content: "3"; }
.paihang ul li:nth-child(4) i::before { content: "4"; }
.paihang ul li:nth-child(5) i::before { content: "5"; }
.paihang ul li:nth-child(5) i::before { content: "6"; }
.paihang ul li:nth-child(5) i::before { content: "7"; }
.paihang ul li:nth-child(5) i::before { content: "8"; }
.paihang ul li:nth-child(5) i::before { content: "9"; }
.paihang ul li:nth-child(5) i::before { content: "10"; }
.paihang ul li:hover { 
    -moz-transition: all .2s ease; 
    -webkit-transition: all .2s ease; 
    transition: all .2s ease; 
}
</style>
