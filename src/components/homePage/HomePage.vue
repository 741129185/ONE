<template>
  <div>
    <Header @hiddenNav="hiddenNav"></Header>
    <div class="main" ref="homePage">
      <ul>
        <div class="white"></div>
        <div class="pic-desc">
          <img :src="dataHome[0].img_url" @click="toDetailPage(dataHome[0].id, 0)">
          <p class="pic-info">{{dataHome[0].title}} | {{dataHome[0].pic_info}}</p>
          <p class="day">{{dataHome[0].day}}</p>
          <p class="date">{{dataHome[0].date}}</p>
          <p class="desc">&nbsp;&nbsp;{{dataHome[0].forward}}</p>
          <p class="desc-author">{{dataHome[0].words_info}}</p>
          <first-demo-footer class="footer" :likeCount="dataHome[0].like_count"></first-demo-footer>
        </div>
        <More :dataHome="dataHome" :showMore.sync="showMore" :allData="allData" :nameMap="nameMap"></More>
        <div v-for="(el,index) in dataHome" :key="index">
          <div class="demo" v-if="!el.volume">
            <div class="others-category">-&nbsp;{{othersCategory[index - 1]}}&nbsp;-</div>
            <div class="others-title" @click="toDetailPage(el.id,index)">{{el.title}}</div>
            <div class="others-author">文/{{el.user_name}}</div>
            <div class="others-img" :class="{hidden:el.id==='1593'}">
              <img :src="el.img_url">
            </div>
            <div class="others-forward">{{el.forward}}</div>
            <others-demo-footer :likeCount="el.like_count"></others-demo-footer>
          </div>
        </div>
        <div class="page-foot"></div>
      </ul>
    </div>
  </div>
</template>
<script>
  import Header from '../public/Header'
  import BScroll from 'better-scroll'
  import FirstDemoFooter from '../public/FirstDemoFooter'
  import OthersDemoFooter from '../public/OthersDemoFooter'
  import More from './More'
  export default {
    name: 'HomePage',
    components: {
      Header,
      FirstDemoFooter,
      OthersDemoFooter,
      More
    },
    props: ['dataHome', 'showNav', 'allData'],
    data() {
      return {
        othersCategory: ['ONE STORY', 'Q&A', 'Music', 'Film'],
        showMore: false,
        nameMap: ['ImgTextDetail', 'ArticleDetail', 'QuestionDetail', 'MusicDetail', 'FilmDetail']
      }
    },
    methods: {
      _initHomePageScroll() {
        if (!this.homeScroll) {
          this.homeScroll = new BScroll(this.$refs.homePage, {
            click: true, // 允许点击
            probeType: 3 // 滑动监听
          })
          this.homeScroll.on('scroll', ({y}) => {
            if (y >= -10) {
              this.$emit('update:showNav', false)
            } else if (y < -10) {
              this.$emit('update:showNav', true)
            }
          })
        } else {
          this.homeScroll.refresh()
        }
      },
      toDetailPage(id, num) {
        let detail = this.allData.categoryAll[num].detail.find((item) => (item.id === id))
        let detailAll = this.allData.categoryAll[num]
        this.$emit('update:showNav', false)
        this.$router.push({
          name: this.nameMap[num],
          params: {
            id: detail.id,
            detail: detail,
            detailAll: detailAll
          }
        })
      },
      hiddenNav() {
          this.$emit('update:showNav', false)
      }
    },
    watch: {
      showMore(newVal) {
        if (newVal === true) {
          this.homeScroll.scrollTo(0, -300, 500)
        }
      }
    },
    created() {
      this.$nextTick(function () {
        this._initHomePageScroll()
      })
    }
  }
</script>
<style lang="scss" scoped>
  .main {
    width: 100%;
    height: 667px;
    overflow: hidden;
    .white {
      width: 100%;
      height: 50px;
    }
    .pic-desc {
      position: relative;
      width: 100%;
      height: 580px;
      border-bottom: 5px solid #efefef;
      img {
        width: 100%;
        height: 250px;
      }
      .pic-info {
        padding: 0 20px;
        margin: 20px 0;
        text-align: center;
        font-size: 13px;
        color: #333;
      }
      .day {
        text-align: center;
        margin-top: 20px;
        font-size: 48px;
        color: black;
        font-family: Serif;
        line-height: 48px;
      }
      .date {
        margin-top: 0px;
        margin-bottom: 10px;
        font-size: 14px;
        text-align: center;
        line-height: 32px;
      }
      .desc {
        padding: 0 20px;
        margin: 20px 0;
        font-size: 16px;
        line-height: 26px;
        color: #333;
      }
      .desc-author {
        margin-top: 30px;
        padding: 0 20px;
        text-align: right;
        font-size: 15px;
        color: #333;
      }
      .footer {
        position: absolute;
        left: 0;
        bottom: 0;
      }
    }
    .demo {
      width: 100%;
      padding: 0 20px;
      box-sizing: border-box;
      border-bottom: 5px solid #efefef;
      .others-category {
        width: 100%;
        height: 35px;
        text-align: center;
        font-size: 14px;
        color: #aeaeae;
        line-height: 35px;
      }
      .others-title {
        padding: 15px 0;
        width: 100%;
        line-height: 25px;
        color: #333;
      }
      .others-author {
        height: 35px;
        line-height: 35px;
        font-size: 15px;
        color: #aeaeae;
      }
      .others-img {
        width: 100%;
        &.hidden {
          display: none;
        }
        img {
          width: 100%;
        }
      }
      .others-forward {
        padding: 15px 0;
        line-height: 25px;
        font-size: 15px;
        color: #aeaeae;
      }
    }
    .page-foot {
      width: 100%;
      height: 55px;
    }
  }
</style>
