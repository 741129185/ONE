<template>
  <div class="main">
    <div class="header">
      <img class="go-back" @click="toMePage" src="../../assets/img/go-back.png">
      <span class="title">音乐故事收藏</span>
    </div>
    <div class="music-collect" ref="music">
      <ul>
        <div class="demo" v-for="el in musicCollectList" :key="el.id" @click="toDetailPage(el.id,el,musicDetailAll)">
          <div class="icon"><img :src="el.album_img"></div>
          <div class="title">
            <p>{{el.music_name}}</p>
            <p class="singer"> - {{el.music_singer}}</p>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  import {unEncrypt} from '../../assets/js/tool'
  export default {
    name: 'MusicCollect',
    props: ['allData'],
    computed: {
      musicDetailAll() {
        return this.allData.categoryAll.find((el) => (el.category === 'music'))
      },
      musicCollectList() {
        let CollectList = []
        let musicAll = this.allData.categoryAll.find((el) => (el.category === 'music')).detail
        let collectList = JSON.parse(sessionStorage.getItem('collectList'))
        collectList.forEach((e) => {
          if (musicAll.find((el) => (el.id === unEncrypt(e)))) {
            CollectList.push(musicAll.find((el) => (el.id === unEncrypt(e))))
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
      _initMusicCollectScroll() {
        if (!this.musicCollectScroll) {
          this.musicCollectScroll = new BScroll(this.$refs.music, {
            click: true // 允许点击
          })
        } else {
          this.musicCollectScroll.refresh()
        }
      },
      toDetailPage(id, detail, detailAll) {
        this.$router.push({
          name: 'MusicDetail',
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
        this._initMusicCollectScroll()
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
    .music-collect {
      width: 100%;
      height: 100%;
      overflow: hidden;
      & > ul {
        padding-bottom: 200px;
      }
      .demo {
        padding: 5px 0;
        height: 45px;
        display: flex;
        margin-bottom: 10px;
        .icon {
          flex: 0 0 50px;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        .title {
          flex: 1;
          padding: 5px 0;
          padding-left: 15px;
          border-bottom: 1px solid #d4d4d4;
          color: #333;
          font-weight: 600;
          .singer {
            margin-top: 5px;
            font-size: 14px;
            color: #c4c4c4;
            font-weight: normal;
            margin-left: 8px;
            box-sizing: border-box;
          }
        }
      }
    }
  }
</style>
