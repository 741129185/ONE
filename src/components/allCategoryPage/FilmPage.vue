<template>
  <div class="main">
    <Header :newTitle="newTitle"/>
    <router-link to='/all' tag="div" class="goBack" @click.native="goBack"></router-link>
    <div class="film" ref="film">
      <ul>
        <div class="white"></div>
        <div class="demo" v-for="(item,index) in detailAll.detail" :key="index">
          <div @click="toDetail(item,detailAll)">
            <p class="text-tag">- 影视 -</p>
            <p class="title">{{item.title}}</p>
            <p class="author">文 / {{item.author}}</p>
            <div class="main-box">
              <img :src="item.category_img">
            </div>
            <p class="content-short">{{item.content_short}}</p>
            <p class="content-from">{{item.text_subtitle}}</p>
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
    name: 'FilmPage',
    components: {
      Header,
      DemoFooter
    },
    data() {
      return {
        newTitle: '一个影视'
      }
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
      _initFilmPageScroll() {
        if (!this.filmScroll) {
          this.filmScroll = new BScroll(this.$refs.film, {
            click: true // 允许点击
          })
        } else {
          this.filmScroll.refresh()
        }
      },
      toDetail(el, elAll) {
        this.$router.push({
          name: 'FilmDetail',
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
        this._initFilmPageScroll()
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
    .film {
      width: 100%;
      height: 100%;
      & > ul {
        width: 100%;
        height: auto;
        .white {
          width: 100%;
          height: 55px;
        }
        .demo {
          width: 100%;
          border-bottom: 8px solid #ededed;
          .text-tag {
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
          .main-box {
            height: 13.75em;
            width: 100%;
            padding: 1.8125em 0;
            background-image: url(http://image.wufazhuce.com/movie-list-background.png);
            background-size: 100% 100%;
            position: relative;
            img {
              position: absolute;
              display: block;
              left: 50%;
              top: 50%;
              transform: translateX(-50%) translateY(-50%);
              height: 200px;
              width: 335px;
              border-radius: 5px;
            }
          }
          .content-short {
            font-size: 0.875em;
            line-height: 1.857em;
            max-height: 3.714em;
            color: rgba(0, 0, 0, 0.6);
            margin-top: 0.7143em;
            padding: 0 20px;
          }
          .content-from {
            text-align: right;
            font-size: 0.875em;
            line-height: 1.857em;
            color: rgba(0, 0, 0, 0.6);
            padding: 0 20px;
          }
          .date {
            font-size: 0.625em;
            line-height: 1.4em;
            padding: 1.8em 0 2.5em 20px;
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
