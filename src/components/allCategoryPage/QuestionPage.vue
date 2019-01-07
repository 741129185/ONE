<template>
  <div class="main">
    <Header :newTitle="newTitle"/>
    <router-link to='/all' tag="div" class="goBack" @click.native="goBack"></router-link>
    <div class="question" ref="question">
      <ul>
        <div class="white"></div>
        <div class="demo" v-for="(item,index) in detailAll.detail" :key="index" @click="toDetailPage(item,detailAll)">
          <div class="demo-box">
            <p class="date">{{item.date}}</p>
            <p class="title">{{item.title}}</p>
            <p class="content-short" v-html="item.answer">{{item.answer}}</p>
            <p class="read-all">阅读全文</p>
          </div>
          <div class="no-more">
            <p>没有更多了...</p>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>
<script>
  import Header from '../public/Header.vue'
  import BScroll from 'better-scroll'
  export default {
    name: 'QuestionPage',
    props: ['showNav'],
    components: {
      Header
    },
    data() {
      return {
        newTitle: '一个问答'
      }
    },
    computed: {
      detailAll() {
        return this.$route.query.detail
      }
    },
    methods: {
      showFootNav() {
        this.$emit('update:showNav', !this.showNav)
      },
      _initQuestionPageScroll() {
        if (!this.questionScroll) {
          this.questionScroll = new BScroll(this.$refs.question, {
            click: true // 允许点击
          })
        } else {
          this.imgTextScroll.refresh()
        }
      },
      goBack() {
        this.$emit('update:showNav', true)
      },
      toDetailPage(el, elAll) {
        this.$router.push({
          name: 'QuestionDetail',
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
        this._initQuestionPageScroll()
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
    .question {
      width: 100%;
      height: 100%;
      & > ul {
        height: auto;
        .white {
          width: 100%;
          height: 50px;
        }
        .demo {
          padding: 20px;
          .demo-box {
            width: 100%;
            height: 100%;
            padding-bottom: 50px;
            border-bottom: 1px solid #dcdcdc;
            .date {
              font-size: 16px;
              margin: 0 0 20px 0;
              line-height: 32px;
            }
            .title {
              color: black;
              font-size: 28px;
              margin: 20px 20px 0 20px;
              font-weight: bold;
              line-height: 1.3;
            }
            .content-short {
              line-height: 26px;
              max-height: 78px;
              margin-top: 14px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
            }
            .read-all {
              font-size: 16px;
              line-height: 32px;
              color: #29a7e2;
              margin-top: 19px;
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
