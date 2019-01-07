<template>
  <div id="app">
    <Loading v-if="loading"></Loading>
    <div v-else>
      <router-view :dataHome="dataHome" :showNav.sync="showNav" :allData="allData"></router-view>
      <transition name="footFade">
        <foot-navigation v-show="showNav" :showNav.sync="showNav"></foot-navigation>
      </transition>
    </div>
  </div>
</template>

<script>
  import Loading from './components/public/Loading'
  import FootNavigation from './components/public/FootNavigation'
  export default {
    name: 'App',
    data () {
      return {
        loading: true,
        dataHome: [],
        showNav: false,
        detailAll: [],
        allData: {}
      }
    },
    components: {
      Loading,
      FootNavigation
    },
    methods: {},
    created () {
      this.$axios.get('/api/dataHome')
        .then(res => {
          res = res.data
          if (res.errno === 0) { // 模仿真实开发,判断当前数据是否有权限获取
            this.dataHome = res.data
//            this.loading = false
          }
        })
    },
    watch: {
      dataHome(oldVal, newVal) {
        if (oldVal !== newVal) {
          this.$axios.get('/api/allData')
            .then(res => {
              res = res.data
              if (res.errno === 0) { // 模仿真实开发,判断当前数据是否有权限获取
                this.allData = res.data
                this.loading = false
              }
            })
        }
      }
    }
  }
</script>

<style lang="scss">
  #app {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    & > div {
      width: 100%;
      height: 100%;
    }
    .footFade-enter-active, .footFade-leave-active {
      transition: all 0.5s;
    }
    .footFade-enter, .footFade-leave-to {
      transform: translateY(100%);
    }
  }
</style>
