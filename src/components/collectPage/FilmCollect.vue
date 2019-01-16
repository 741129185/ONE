<template>
  <div class="main">
    <div class="header">
      <img class="go-back" @click="toMePage" src="../../assets/img/go-back.png">
      <span class="title">影视收藏</span>
    </div>
    <div class="film-collect" ref="film">
      <ul>
        <div class="demo" v-for="el in filmCollectList" :key="el.id" @click="toDetailPage(el.id,el,filmDetailAll)">
          <div class="icon"><img src="../../assets/img/collect-film.png"></div>
          <div class="title">{{el.title}}</div>
        </div>
      </ul>
    </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  import {unEncrypt} from '../../assets/js/tool'
  export default {
    name: 'FilmCollect',
    props: ['allData'],
    computed: {
      filmDetailAll() {
        return this.allData.categoryAll.find((el) => (el.category === 'film'))
      },
      filmCollectList() {
        let CollectList = []
        let filmAll = this.allData.categoryAll.find((el) => (el.category === 'film')).detail
        let collectList = JSON.parse(sessionStorage.getItem('collectList'))
        collectList.forEach((e) => {
          if (filmAll.find((el) => (el.id === unEncrypt(e)))) {
            CollectList.push(filmAll.find((el) => (el.id === unEncrypt(e))))
          }
        })
        return CollectList
      }
    },
    methods: {
      toMePage() {
        this.$emit('update:showNav', !this.showNav)
        this.$router.push('/me')
      },
      _initFilmCollectScroll() {
        if (!this.filmCollectScroll) {
          this.filmCollectScroll = new BScroll(this.$refs.film, {
            click: true // 允许点击
          })
        } else {
          this.filmCollectScroll.refresh()
        }
      },
      toDetailPage(id, detail, detailAll) {
        this.$router.push({
          name: 'FilmDetail',
          params: {
            id,
            detail,
            detailAll
          }
        })
      }
    },
    created() {
      this.$nextTick(() => {
        this._initFilmCollectScroll()
      })
    }
  }
</script>
<style lang="scss" scoped>
  .main {
    width: 100%;
    height: 100%;
    .header {
      width: 100%;
      height: 44px;
      background: #fff;
      display: flex;
      position: relative;
      border-bottom: 1px solid #ccc;
      .go-back {
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
      }
      .title {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        font-weight: bold;
        font-size: 16px;
        color: #333;
      }
    }
    .film-collect {
      width: 100%;
      height: 100%;
      overflow: hidden;
      & > ul {
        padding-bottom: 200px;
      }
      .demo {
        height: 45px;
        display: flex;
        .icon {
          box-sizing: border-box;
          padding: 10px 15px;
        }
        .title {
          flex: 1;
          width: 100%;
          box-sizing: border-box;
          padding-right: 15px;
          line-height: 45px;
          border-bottom: 1px solid #d4d4d4;
          color: #333;
          font-weight: 600;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }
      }
    }
  }
</style>
