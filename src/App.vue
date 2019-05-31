<template>
  <div id="app" class="wrap">
    <TheHeader class="header" v-on:search="searchBox"></TheHeader>
    <Search v-if="searching" @searchClose="searchBox"></Search>
    <router-view class="router"></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader'
import Search from '@/components/Show/Search'
import Home from '@/components/Home/Home'
import Footer from '@/components/Footer'

export default {
  name: 'App',
  data() {
    return {
      searching: false
    }
  },
  components: {
    TheHeader: TheHeader,
    Search: Search,
    Home: Home,
    Footer: Footer
  },
  methods: {
    searchBox(searching){
      this.searching = searching;
    }
  }
}
</script>

<style>
/* IOS中链接或者js定义的可点击元素点击之后会出现半透明的灰色背景，将其重设 */
* {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  margin: 0; 
  padding: 0 
}
body { 
  font: 15px "Microsoft YaHei", Arial, Helvetica, sans-serif; 
  color: #333; 
  background: #E9EAED; 
  line-height: 1.5; 
  overflow-x: hidden; 
}
img { 
  border: 0; 
  display: block 
}
ul, li { 
  list-style: none;
}
a { 
  text-decoration: none; 
  color: #333; 
}
a:hover {
  text-decoration: none;
  color: #00C1DE; 
}
.clear { 
  clear: both; 
  width: 100%; 
  overflow: hidden; 
  height: 20px 
}
.clearblank { 
  clear: both; 
  width: 100%; 
  overflow: hidden; 
}
.fl { 
  float: left!important; 
}
.fr { 
  float: right!important; 
}
.box, article { 
  width: 1200px; 
  margin: auto; 
  overflow: hidden 
}


.wrap {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  overflow: auto;
}
.router{
  min-width: 1000px;
}
.whitebg { 
    background: #fff; 
    border-radius: 3px; 
    padding: 20px; 
    margin-bottom: 20px; 
    overflow: hidden; 
}
.imgscale img { 
    width: 100%; 
    -moz-transition: all .5s ease; 
    -webkit-transition: all .5s ease; 
    -ms-transition: all .5s ease; 
    -o-transition: all .5s ease; 
    transition: all .5s ease; 
    transition: all 0.5s; 
}
.imgscale:hover img { 
    transform: scale(1.1); 
}
</style>
