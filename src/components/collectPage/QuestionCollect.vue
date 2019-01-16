<template>
  <div class="main">
    <div class="header">
      <img class="go-back" @click="toMePage" src="../../assets/img/go-back.png">
      <span class="title">问答收藏</span>
    </div>
    <div class="question-collect" ref="question">
      <ul>
        <div class="demo" v-for="el in questionCollectList" :key="el.id"
             @click="toDetailPage(el.id,el,questionDetailAll)">
          <div class="icon"><img src="../../assets/img/collect-question.png"></div>
          <div class="title">
            <span>Question：</span>
            <p class="question">{{el.title}}</p>
            <span>Answer：</span>
            <p class="answer" v-html="el.answer">{{el.answer}}</p>
            <!--<div class="answer" v-html="el.answer">{{el.answer}}</div>-->
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
    name: 'QuestionCollect',
    props: ['allData', 'showNav'],
    computed: {
      questionDetailAll() {
        return this.allData.categoryAll.find((el) => (el.category === 'question'))
      },
      questionCollectList() {
        let CollectList = []
        let questionAll = this.allData.categoryAll.find((el) => (el.category === 'question')).detail
        let collectList = JSON.parse(sessionStorage.getItem('collectList'))
        collectList.forEach((e) => {
          if (questionAll.find((el) => (el.id === unEncrypt(e)))) {
            CollectList.push(questionAll.find((el) => (el.id === unEncrypt(e))))
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
      _initQuestionCollectScroll() {
        if (!this.questionCollectScroll) {
          this.questionCollectScroll = new BScroll(this.$refs.question, {
            click: true // 允许点击
          })
        } else {
          this.questionCollectScroll.refresh()
        }
      },
      toDetailPage(id, detail, detailAll) {
        this.$router.push({
          name: 'QuestionDetail',
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
        this._initQuestionCollectScroll()
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
    .question-collect {
      width: 100%;
      height: 100%;
      overflow: hidden;
      & > ul {
        padding-bottom: 200px;
      }
      .demo {
        padding: 15px 0;
        display: flex;
        border-bottom: 1px solid #d4d4d4;
        position: relative;
        .icon {
          flex: 0 0 50px;
          img {
            position: absolute;
            top: 25px;
            left: 10px;
          }
        }
        .title {
          flex: 1;
          & > span {
            font-size: 18px;
            font-weight: 600;
            color: #333;
          }
          .question {
            width: 100%;
            font-size: 16px;
            color: #494949;
            padding: 5px 20px 0 20px;
            box-sizing: border-box;
            word-break: break-all;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;

          }
          .answer {
            font-size: 16px;
            color: #494949;
            padding: 5px 20px 0 20px;
            height: 48px;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>
