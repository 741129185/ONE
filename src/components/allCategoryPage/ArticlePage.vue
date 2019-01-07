<template>
  <div class="main">
    <Header :newTitle="newTitle"/>
    <router-link to='/all' tag="div" class="goBack" @click.native="goBack"></router-link>
    <div class="article" ref="article">
      <ul>
        <div class="white"></div>
        <div class="demo" v-for="(item,index) in detailAll.detail" :key="index"
             @click="toDetail(item,detailAll)">
          <div class="demo-box">
            <p class="head">- STORY -</p>
            <p class="title">{{item.title}}</p>
            <p class="author">文 / {{item.author}}</p>
            <img :src="item.img_url">
            <p class="content-short">{{item.content_short}}</p>
            <p class="date"><span>{{item.day}}</span>&nbsp;&nbsp;<span>{{item.date}}</span></p>
          </div>
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
  export default {
    name: 'ArticlePage',
    components: {
      Header
    },
    data() {
      return {
        newTitle: '一个阅读'
      }
    },
    props: ['showNav'],
    computed: {
      detailAll() {
        return this.$route.query.detail
      }
    },
    methods: {
      showFootNav() {
        this.$emit('update:showNav', !this.showNav)
      },
      goBack() {
        this.$emit('update:showNav', true)
      },
      _initArticlePageScroll() {
        if (!this.articleScroll) {
          this.articleScroll = new BScroll(this.$refs.article, {
            click: true // 允许点击
          })
        } else {
          this.imgTextScroll.refresh()
        }
      },
      toDetail(el, elAll) {
        this.$router.push({
          name: 'ArticleDetail',
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
        this._initArticlePageScroll()
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
    .article {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      & > ul {
        width: 100%;
        height: auto;
        .white {
          width: 100%;
          height: 50px;
        }
        .demo {
          width: 100%;
          border-bottom: 8px solid #ebebeb;
          .demo-box {
            width: 100%;
            padding: 0 20px;
            box-sizing: border-box;
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
              text-decoration: none;
              font-weight: normal;
              color: inherit;
            }
            .author {
              font-size: 1em;
              line-height: 1.875em;
              color: rgba(0, 0, 0, 0.6);
              margin-top: 0.3125em;
              padding: 0 2.5em 0 0;
            }
            img {
              margin: 10px 0;
              width: 100%;
              height: 200px;
            }
            .content-short {
              font-size: 0.875em;
              line-height: 1.857em;
              max-height: 3.714em;
              color: rgba(0, 0, 0, 0.6);
            }
            .date {
              font-size: 0.625em;
              line-height: 1.4em;
              padding: 1.8em 0 2.5em 0;
              color: #808080;
              text-align: left;
            }
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
