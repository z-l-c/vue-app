<template>
  <div id="app">
    <div id="leftNav" :class="{ collapsed: collapsed }">
      <div id="navColBtn" @click="collapse"><i class="fa fa-bars"></i></div>
      <div id="navTitle">
        <router-link to="/"><img src="./assets/logo.png" /></router-link>
      </div>
      <Navi :navList="navList" :collapsed="collapsed"></Navi>
    </div>
    <div id="breadcrumbs" :class="{ collapsed: collapsed }"></div>
    <div id="container"  :class="{ collapsed: collapsed }">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import Navi from './components/Navi'
import listIcon from './assets/images/list-point.png'

const navlist = [
  {
    id: 1,
    title: '首页',
    url: '/',
    icon: listIcon,
    active: false,
    slide: false,
    subs: []
  },
  {
    id: 2,
    title: '关于',
    url: '',
    icon: listIcon,
    active: false,
    slide: false,
    subs: [
      {
        title: '简介',
        url: '/about',
        active: false
      }
    ]
  }
]

export default {
  name: 'App',
  data () {
    return {
      collapsed: false,
      navList: navlist
    }
  },
  components: { Navi },
  methods: {
    collapse () {
      this.$data.collapsed = !this.$data.collapsed
    }
  }
}
</script>

<style lang="scss">
@import "./assets/css/font-awesome.min.css";

body {
  margin: 0;
  padding: 0;
}
a {
  color: #2ABFC3;
  text-decoration: none;
}
ul, h1 {
  padding: 0;
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  color: #000;
  background-color: #CED0D0;
  overflow: hidden;
}
#leftNav {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  height: 100%;
  width: 200px;
  background-color: #4C4C4C;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #606165;
  box-sizing: border-box;
  transition: width 0.5s;

  #navColBtn {
    position: fixed;
    top: 0;
    left: 200px;
    padding: 8px 5px;
    cursor: pointer;
    transition: left 0.5s;
    z-index: 1000;
  }
  #navTitle {
    height: 80px;
    border-bottom: 1px solid #606165;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 160px;
      height: 40px;
      transition: all 0.5s;
    }
  }
}
#breadcrumbs {
  width: 100%;
  background-color: #fff;
  border-bottom: 1px solid #CED0D0;
  height: 40px;
  position: fixed;
  top: 0;
  left: 200px;
  transition: left 0.5s;
  z-index: 999;
}
#container {
  margin: 55px 0 0 200px;
  padding: 20px;
  overflow: hidden;
  transition: margin-left 0.5s;
  background-color: #fff;
}
/***** collapse ******/
#leftNav.collapsed {
  width: 56px;

  #navColBtn {
    left: 56px;
  }
  #navTitle {
    img {
      width: 30px;
      height: 30px;
    }
  }
}
#breadcrumbs.collapsed {
  left: 56px;
}
#container.collapsed {
  margin-left: 56px;
}
/****** router transition ******/
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}
</style>
