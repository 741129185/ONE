<template>
  <div class="main">
    <Header :newTitle="newTitle"/>
    <div class="goBack" @click="goBack"></div>
    <div class="article" ref="article">
      <ul>
        <div class="white"></div>
        <div class="article-box">
          <p class="title">{{detail.title}}</p>
          <div class="black-line"></div>
          <p class="author">文 / {{detail.author}}</p>
          <p class="text-content" v-html="detail.content">{{detail.content}}</p>
          <div class="author-box">
            <p class="author-title">作者</p>
            <div class="black-line"></div>
            <div class="author-info">
              <div class="author-img"><img :src="detail.author_img"></div>
              <div class="author-info-detail">
                <p>{{detail.author}}</p>
                <p>{{detail.author_desc}}</p>
              </div>
            </div>
          </div>
          <div class="comment-box">
              <p class="comment-title">评论</p>
            <div class="black-line"></div>
          </div>
        </div>
      </ul>
    </div>
    <detail-page-foot :detail="detail" :detailAll="detailAll" :scrollTop.sync="scrollTop"/>
  </div>
</template>
<script>
  import Header from '../public/Header.vue'
  import BScroll from 'better-scroll'
  import DetailPageFoot from './DetailPageFoot.vue'
  export default {
    name: 'ArticleDetail',
    data() {
      return {
        newTitle: '一个阅读',
        scrollTop: false
      }
    },
    components: {
      Header,
      DetailPageFoot
    },
    computed: {
      detail() {
        return this.$route.params.detail
      },
      detailAll() {
        return this.$route.params.detailAll
      }
    },
    methods: {
      goBack() {
        this.$router.push({
          name: 'ArticlePage',
          query: {detail: this.detailAll}
        })
      },
      _initArticleDetailScroll() {
        if (!this.articleScroll) {
          this.articleScroll = new BScroll(this.$refs.article, {
            click: true, // 允许点击
            probeType: 3 // 滑动监听
          })
        } else {
          this.articleScroll.refresh()
        }
      }
    },
    watch: {
      scrollTop(oldVal, newVal) {
        if (oldVal !== newVal) {
            this.articleScroll.scrollTo(0, 0, 500)
          }
      }
    },
    created() {
      this.$nextTick(() => {
        this._initArticleDetailScroll()
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
      z-index: 80;
      background: url("../../assets/img/go-back.png") no-repeat;
    }
    .article {
      width: 100%;
      height: 100%;
      padding: 0 20px;
      box-sizing: border-box;
      & > ul {
        width: 100%;
        height: auto;
        padding-bottom: 200px;
        .white {
          width: 100%;
          height: 50px;
        }
        .article-box {
          width: 100%;
          .title {
            color: black;
            font-size: 28px;
            margin-top: 40px;
            margin-bottom: 20px;
            font-weight: bold;
            line-height: 1.3;
          }
          .black-line {
            border: 2px solid #000;
            margin: 15px 0 7px 0;
            width: 70px;
          }
          .author {
            color: black;
            font-size: 13px;
            margin: 14px 0 20px 0;
          }
          .text-content {
            line-height: 30px;
            font-weight: 300;
            font-size: 18px;
            text-align: justify;
            overflow: hidden;
          }
          .author-box {
            width: 100%;
            .author-title {
              font-size: 15px;
              margin-top: 60px;
              margin-bottom: 0;
            }
            .author-info {
              display: flex;
              .author-img {
                flex: 0 0 55px;
                width: 55px;
                & > img {
                  display: block;
                  width: 45px;
                  height: 45px;
                  border-radius: 50%;
                }
              }
              .author-info-detail {
                flex: 1;
                line-height: 20px;
                & > p:nth-child(1) {
                  font-size: 14px;
                  vertical-align: top;
                }
                & > p:nth-child(2) {
                  font-size: 10px;
                  color: #808080;
                  vertical-align: top;
                }
              }
            }
          }
          .comment-box {
            width: 100%;
            .comment-title {
              font-size: 15px;
              margin-top: 60px;
              margin-bottom: 0;
            }
          }
        }
      }
    }
  }
</style>

<style>
  .text-content>p {
    margin-bottom: 20px;
  }
  .text-content img {
    display: inline-block;
    width: 100%;
    height: 200px;
  }
</style>
