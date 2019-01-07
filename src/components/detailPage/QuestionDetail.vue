<template>
  <div class="main">
    <Header :newTitle="newTitle"/>
    <div class="goBack" @click="goBack"></div>
    <div class="question" ref="question">
      <ul>
        <div class="white"></div>
        <div class="question-box">
          <p class="question-title">{{detail.title}}</p>
          <div class="black-line"></div>
          <div class="vector">{{detail.vector}}</div>
          <p class="question-content">{{detail.question}}</p>
          <div class="answer">{{detail.answers_name}}说</div>
          <p class="answer-content" v-html="detail.answer">{{detail.answer}}</p>
          <p class="editor">{{detail.editor}}</p>
          <div class="author-box">
            <p class="author-title">作者</p>
            <div class="black-line"></div>
            <div class="author-info">
              <div class="author-img"><img :src="detail.answers_img"></div>
              <div class="author-info-detail">
                <p>{{detail.answers_name}}</p>
                <p>{{detail.answers_desc}}</p>
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
    name: 'QuestionDetail',
    data() {
      return {
        newTitle: '一个问答',
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
          name: 'QuestionPage',
          query: {detail: this.$route.params.detailAll}
        })
      },
      _initQuestionDetailScroll() {
        if (!this.questionScroll) {
          this.questionScroll = new BScroll(this.$refs.question, {
            click: true // 允许点击
          })
        } else {
          this.questionScroll.refresh()
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        this._initQuestionDetailScroll()
      })
    },
    watch: {
      scrollTop(oldVal, newVal) {
        if (oldVal !== newVal) {
          this.questionScroll.scrollTo(0, 0, 500)
        }
      }
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
    .question {
      width: 100%;
      height: 100%;
      &>ul {
        height: auto;
        padding-bottom: 200px;
        .white {
          width: 100%;
          height: 50px;
        }
        .question-box {
          width: 100%;
          padding: 0 20px;
          box-sizing: border-box;
          .question-title {
            color: black;
            font-size: 28px;
            margin-top: 7px;
            font-weight: bold;
            line-height: 1.3;
          }
          .black-line {
            border: 2px solid #000;
            margin-top: 15px;
            margin-bottom: 7px;
            width: 70px
          }
          .vector {
            height: 32px;
            line-height: 32px;
            font-size: 14px;
            color: #333;
          }
          .question-content {
            margin-top: 50px;
            margin-bottom: 30px;
            padding-bottom: 30px;
            text-align: justify;
            font-size: 18px;
            font-weight: 300;
            line-height: 30px;
            border-bottom: 1px solid #eee;
          }
          .answer {
            margin-bottom: 40px;
            font-size: 14px;
            color: #333;
            height: 32px;
            line-height: 32px;
          }
          .answer-content {
            text-align: justify;
            font-size: 18px;
            font-weight: 300;
            line-height: 30px;
          }
          .editor {
            color: #808080;
            font-style: oblique;
            margin: 20px 0;
            font-size: 12px;
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
  .answer-content>p {
    margin-bottom: 20px;
  }
  .answer-content img {
    display: inline-block;
    width: 100%;
    height: 200px;
  }
</style>
