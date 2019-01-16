<template>
  <div class="main">
    <Header :newTitle="newTitle"/>
    <div class="goBack" @click="goBack"></div>
    <div class="film" ref="film">
      <ul>
        <div class="white"></div>
        <div class="film-box">
          <img class="first-img" :src="detail.content_pic">
          <p class="title">{{detail.title}}</p>
          <p class="text-subtitle">{{detail.text_subtitle}}</p>
          <p class="text-author">文 / {{detail.author}}</p>
          <p class="text-content" v-html="detail.text">{{detail.text}}</p>
          <p class="editor">{{detail.editor}}</p>
          <p class="explain">{{detail.explain}}</p>
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
  export default{
    name: 'FilmDetail',
    data() {
      return {
        newTitle: '一个影视',
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
          name: 'FilmPage',
          query: {detail: this.$route.params.detailAll}
        })
      },
      _initFilmDetailScroll() {
        if (!this.filmScroll) {
          this.filmScroll = new BScroll(this.$refs.film, {
            click: true // 允许点击
          })
        } else {
          this.filmScroll.refresh()
        }
      }
    },
    watch: {
      scrollTop(oldVal, newVal) {
        if (oldVal !== newVal) {
          this.filmScroll.scrollTo(0, 0, 500)
        }
      }
    },
    created() {
      this.$nextTick(() => {
        this._initFilmDetailScroll()
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
    .film {
      width: 100%;
      height: 100%;
      & > ul {
        height: auto;
        padding-bottom: 200px;
        .white {
          width: 100%;
          height: 50px;
        }
        .film-box {
          width: 100%;
          .first-img {
            width: 100%;
            height: 210px;
            margin-bottom: 17px;
          }
          .title {
            color: black;
            font-size: 28px;
            margin: 30px 20px 0 20px;
            font-weight: bold;
          }
          .text-subtitle {
            line-height: 32px;
            font-size: 18px;
            margin-top: 15px;
            padding: 0 20px;
            color: #000;
          }
          .text-author {
            font-size: 14px;
            margin: 40px 20px 30px 20px;
            text-align: center;
            line-height: 32px;
          }
          .text-content {
            padding: 0 20px;
            overflow: hidden;
          }
          .editor, .explain {
            color: #808080;
            font-style: oblique;
            margin: 20px;
            font-size: 12px;
          }
          .comment-box {
            padding: 0 20px;
            width: 100%;
            box-sizing: border-box;
            .comment-title {
              font-size: 15px;
              margin-top: 60px;
              margin-bottom: 0;
            }
            .black-line {
              border: 2px solid #000;
              margin: 15px 0 7px 0;
              width: 70px;
            }
          }
        }
      }
    }
  }
</style>
<style>
  .text-content p {
    margin-bottom: 20px;
  }

  .text-content img {
    text-align: center;
    max-width: 100%;
    height: auto;
    width: 100%;
  }
</style>
