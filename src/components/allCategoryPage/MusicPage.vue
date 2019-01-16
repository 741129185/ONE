<template>
  <div class="main">
    <Header :newTitle="newTitle"/>
    <router-link to='/all' tag="div" class="goBack" @click.native="goBack"></router-link>
    <div class="music" ref="music">
      <ul>
        <div class="white"></div>
        <div class="demo" v-for="(item,index) in detailAll.detail" :key="index">
          <div @click="toDetail(item,detailAll)">
            <p class="head">- 音乐 -</p>
            <p class="title">{{item.text_title}}</p>
            <p class="author">文 / {{item.text_author}}</p>
            <div class="music-box">
              <img class="pic" :src="item.categoryPage_img">
              <img class="play" :src="item.play_icon">
              <img class="play-tool" :src="item.music_play_icon">
            </div>
            <p class="music-detail">{{item.music_name}} · {{item.music_singer}} | {{item.album}}</p>
            <p class="text">{{item.forward}}</p>
            <p class="date">{{item.date}}</p>
          </div>
          <demo-footer :likeCount="item.like_count" :id="item.id"></demo-footer>
        </div>
        <div class="no-more">
          <p>没有更多了...</p>
        </div>
      </ul>
    </div>
  </div>
</template>
<script>
  import Header from '../public/Header.vue'
  import BScroll from 'better-scroll'
  import DemoFooter from '../public/DemoFooter.vue'
  export default {
    name: 'MusicPage',
    props: ['showNav'],
    data() {
      return {
        newTitle: '一个音乐'
      }
    },
    components: {
      Header,
      DemoFooter
    },
    computed: {
      detailAll() {
        return this.$route.query.detail
      }
    },
    methods: {
      goBack() {
        this.$emit('update:showNav', true)
      },
      _initMusicPageScroll() {
        if (!this.musicScroll) {
          this.musicScroll = new BScroll(this.$refs.music, {
            click: true // 允许点击
          })
        } else {
          this.musicScroll.refresh()
        }
      },
      toDetail(el, elAll) {
        this.$router.push({
          name: 'MusicDetail',
          params: {
            id: el.id,
            detail: el,
            detailAll: elAll
          }
        })
      }
    },
    mounted() {
      this.$nextTick(() => {
        this._initMusicPageScroll()
      })
    }
  }
</script>
<style lang="scss" scoped>
  .main {
    width: 100%;
    height: 100%;
    .goBack {
      position: absolute;
      left: 5px;
      top: 11px;
      width: 28px;
      height: 28px;
      z-index: 99;
      background: url("../../assets/img/go-back.png") no-repeat;
    }
    .music {
      width: 100%;
      height: 100%;
      & > ul {
        width: 100%;
        height: auto;
        .white {
          width: 100%;
          height: 50px;
        }
        .demo {
          width: 100%;
          border-bottom: 8px solid #ededed;
          .head {
            color: rgba(0, 0, 0, 0.6);
            line-height: 1.85em;
            font-size: 0.875em;
            text-align: center;
            padding: 0.7143em 0 1.0714em 0;
          }
          .title {
            font-size: 1.375em;
            line-height: 1.4em;
            max-height: 2.8em;
            margin-top: 0;
            padding: 0 20px;
          }
          .author {
            font-size: 1em;
            line-height: 1.875em;
            color: rgba(0, 0, 0, 0.6);
            margin-top: 0.3125em;
            padding: 0 20px;
          }
          .music-box {
            position: relative;
            clear: both;
            height: 15.125em;
            margin: 0.625em 0;
            background: url(http://image.wufazhuce.com/music-list-right.png) no-repeat center right;
            background-size: auto 100%;
            box-sizing: border-box;
            box-shadow: 0px -1px 10px 0px #f5f5f5, /*上边阴影  红色*/
            0px 0px 0px 0px #fff, /*左边阴影  绿色*/
            0px 0px 0px 0px #fff, /*右边阴影  蓝色*/
            0px 1px 10px 0px #f5f5f5; /*下边阴影  黄色*/
            .pic {
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translateX(-50%) translateY(-50%);
              display: block;
              width: 226px;
              height: 226px;
              border-radius: 50%;
              border: 1px solid #4e4e4e;
            }
            .play {
              position: absolute;
              display: block;
              left: 50%;
              top: 50%;
              transform: translateX(-50%) translateY(-50%);
              width: 44px;
              height: 44px;
            }
            .play-tool {
              position: absolute;
              display: block;
              left: 20px;
              bottom: 0;
              width: 24px;
              height: 24px;
            }
          }
          .music-detail {
            font-size: 0.625em;
            line-height: 1.4em;
            color: #808080;
            margin-top: 1em;
            margin-left: 20px;
          }
          .text {
            font-size: 0.875em;
            line-height: 1.857em;
            max-height: 3.714em;
            color: rgba(0, 0, 0, 0.6);
            margin-top: 0.7143em;
            margin-left: 20px;
          }
          .date {
            font-size: 0.625em;
            line-height: 1.4em;
            padding: 1.8em 0 2.5em 0;
            padding-left: 20px;
            color: #808080;
            text-align: left;
          }
        }
        .no-more {
          width: 100%;
          height: 100px;
          line-height: 100px;
          text-align: center;
          font-size: 14px;
          color: #aeaeae;
        }
      }
    }
  }
</style>
