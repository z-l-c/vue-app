<template>
  <div class="navContent" :class="{ collapsed: collapsed }">
    <div v-for="(nav, index) in navList"
         :key="nav.id"
         class="topNav"
         :class="{ active: nav.active, slide: nav.slide }"
    >
      <img class="titlePic" :src="nav.icon" />
      <img class="arrowpic" src="../assets/images/arrow-down.png" v-if="!nav.url" />
      <router-link
        :to="nav.url"
        @click.native="navTo(index, $event)"
        @mouseover.native="hover('in', $event)"
        @mouseout.native="hover('out', $event)"
      >
        {{ nav.title }}
      </router-link>
      <ul class="subNav"
          v-if="nav.subs.length"
          @mouseover="hover('in', $event)"
          @mouseout="hover('out', $event)"
      >
        <li v-for="sub in nav.subs"
            :key="sub.title"
            :class="{ active: sub.active }"
        >
          <router-link
            :to="sub.url"
            @click.native="navTo(index, $event)"
          >
            {{ sub.title }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navi',
  props: {
    navList: Array,
    collapsed: Boolean
  },
  data () {
    return {
      timer: null
    }
  },
  mounted () {
    this.actived()
  },
  methods: {
    actived () {
      const path = location.pathname
      for (let i = 0; i < this.navList.length; i += 1) {
        const nav = this.navList[i]
        if (nav.url === path) {
          setTimeout(() => {
            nav.active = true
          }, 0)
        }
        nav.active = false
        for (let j = 0; j < nav.subs.length; j += 1) {
          if (nav.subs[j].url === path) {
            setTimeout(() => {
              nav.subs[j].active = true
              nav.active = true
            }, 0)
          }
          nav.subs[j].active = false
          nav.active = false
        }
      }
    },
    navTo (index, event) {
      event.preventDefault()
      if (event.target.tagName.toLowerCase() === 'a') {
        for (let i = 0; i < this.navList.length; i += 1) {
          if (i === index) {
            setTimeout(() => {
              this.navList[i].slide = !this.navList[i].slide
            }, 0)
          } else {
            this.navList[i].slide = false
          }
        }
        this.actived()
      }
    },
    hover (action, event) {
      if (event.target.tagName.toLowerCase() !== 'a' && event.target.tagName.toLowerCase() !== 'ul') {
        return
      }
      clearTimeout(this.$data.timer)
      if (action === 'in') {
        return
      }
      this.$data.timer = setTimeout(() => {
        for (let i = 0; i < this.navList.length; i += 1) {
          this.navList[i].slide = false
        }
      }, 500)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.navContent {
  width: 100%;
  overflow-y: scroll;

  .topNav {
    width: 100%;
    height: 50px;
    position: relative;
    overflow: hidden;
    z-index: 1;
    border-bottom: 1px solid #606165;

    img.titlePic {
      width: 16px;
      position: absolute;
      top: 17px;
      left: 20px;
      z-index: 1;
    }
    img.arrowpic {
      width: 10px;
      position: absolute;
      top: 22px;
      right: 10px;
      z-index: 1;
      transform: rotate(-90deg);
      transition: transform 0.3s;
      transition-timing-function: ease-in-out;
      display: block;
    }
    a {
      display: block;
      background: transparent;
      width: 100%;
      height: 50px;
      line-height: 50px;
      color: #fff;
      font-size: 16px;
      text-align: center;
      text-indent: -16px;
    }
    &>a {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
    }
    .subNav {
      position: fixed;
      top: 40px;
      left: 200px;
      height: 100%;
      width: 200px;
      background-color: #4C4C4C;
      list-style: none;
      transition: transform 0.3s, left 0.5s;
      transform: scale(0, 1);
      transform-origin: left;

      li {
        border-bottom: 1px solid #606165;
      }
    }
  }
}
/****** active ******/
.active {
  background-color: #54595C;
}
/****** slide ******/
.topNav.slide {
  img.arrowpic {
    transform: matrix(0,1,-1,0,10,0)
  }
}
.topNav.slide {
  .subNav {
    transform: scale(1);
  }
}
/***** collapse ******/
.navContent.collapsed {
  .topNav {
    img.titlePic {
      top: 5px;
    }
  }
}
.navContent.collapsed {
  .topNav {
    img.arrowpic {
      display: none;
    }
  }
}
.navContent.collapsed {
  .topNav>a {
    line-height: 70px;
    text-indent: 0;
    font-size: 14px;
  }
}
.navContent.collapsed {
  .subNav {
   left: 56px;
  }
}
</style>
