<template>
  <div class="main">
    <Header @hiddenNav="hiddenNav"></Header>
    <div class="all" ref="allPage">
      <ul>
        <div class="white"></div>
        <div class="carousel-box">
          <transition-group name="fade">
            <div class="img" v-for="(item,index) in this.imgList" :key="item.id" v-show="index===showIndex">
              <img :src="item.src">
              <span>{{item.desc}}</span>
            </div>
          </transition-group>
        </div>
        <div class="category">
          <p>分类导航</p>
          <div class="category-all">
            <router-link :to="{path:categoryList[index], query:{detail:detailData[index]}}" tag="div"
                         v-for="(item,index) in detailData" :key="index" @click.native="hiddenNav">
              {{item.name}}
            </router-link>
          </div>
        </div>
        <div class="seminar">
          <p>专题</p>
          <img src="http://image.wufazhuce.com/Fp-saZHHEvYi80rTV8FxdAHFxK4G?bid=123">
          <p class="seminar-title">我们在2018年追了这些剧</p>
        </div>
        <HotAuthor/>
        <div class="page-foot"></div>
      </ul>
    </div>
  </div>
</template>
<script>
  import Header from '../public/Header'
  import BScroll from 'better-scroll'
  import HotAuthor from './HotAuthor'
  export default {
    name: 'AllPage',
    components: {
      Header,
      HotAuthor
    },
    data() {
      return {
        detailData: [],
        showIndex: 0,
        imgList: [
          {id: 0, src: 'http://image.wufazhuce.com/Fo59plBlnS9WkK9dkR-y6IkOAMN-', desc: '文 章'},
          {id: 1, src: 'http://image.wufazhuce.com/Fst5PB3KTT77Urx2qCX5dF7v4baC', desc: '图 文'},
          {id: 2, src: 'http://image.wufazhuce.com/FiK4bhku06qMI094OnqT0x4ae5TF', desc: '音 乐'},
          {id: 3, src: 'http://image.wufazhuce.com/FthKB1-5YRJGSoPiI9qWSvCE1pD5', desc: '影 视'}
        ],
        categoryList: ['one', 'article', 'question', 'music', 'film']
      }
    },
    methods: {
      _initAllPageScroll() {
        if (!this.allPageScroll) {
          this.allPageScroll = new BScroll(this.$refs.allPage, {
            click: true // 允许点击
          })
        } else {
          this.allPageScroll.refresh()
        }
      },
      hiddenNav() {
        this.$emit('update:showNav', false)
      }
    },
    mounted() {
      this.$nextTick(() => {
        this._initAllPageScroll()
        this.timer = setInterval(() => {
          this.showIndex++
          if (this.showIndex >= this.imgList.length) {
            this.showIndex = 0
          }
        }, 2000)
      })
    },
    created () {
      this.$axios.get('/api/detailData')
        .then(res => {
          res = res.data
          if (res.errno === 0) { // 模仿真实开发,判断当前数据是否有权限获取
            this.detailData = res.data
          }
        })
    }
  }
</script>
<style lang="scss" scoped>
  .main {
    width: 100%;
    height: 100%;
    .all {
      width: 100%;
      height: 100%;
      .white {
        width: 100%;
        height: 50px;
      }
      .carousel-box {
        width: 100%;
        height: 225px;
        position: relative;
        overflow: hidden;
        .fade-enter-active, .fade-leave-active {
          transition: all 1s;
        }
        .fade-enter {
          transform: translateX(100%);
        }
        .fade-leave-to {
          transform: translateX(-100%);
        }
        .img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 225px;
          img {
            width: 100%;
            height: 100%;
          }
          span {
            display: inline-block;
            width: 100px;
            height: 60px;
            line-height: 60px;
            text-align: center;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translateX(-50%) translateY(-50%);
            font-weight: 500;
            font-size: 32px;
            color: #fff;
            background: rgba(0, 0, 0, 0.5);
            border-radius: 10px;
          }
        }
      }
      .category {
        width: 100%;
        height: 240px;
        padding: 20px;
        box-sizing: border-box;
        border-top: 5px solid #efefef;
        border-bottom: 5px solid #efefef;
        & > p {
          padding-bottom: 20px;
          font-size: 14px;
          color: #5e5e5e;
          font-weight: 500;
        }
        .category-all {
          & > div {
            float: left;
            overflow: hidden;
            text-align: center;
            color: #fff;
            font-weight: bold;
            line-height: 130px;
          }
          & > div:nth-child(1) {
            width: 29%;
            height: 80px;
            margin-bottom: 5px;
            background: url("../../assets/img/img-text.jpg") no-repeat;
            background-size: 100%;
          }
          & > div:nth-child(2) {
            width: 68%;
            height: 80px;
            margin-left: 3%;
            margin-bottom: 5px;
            background: url("../../assets/img/story.jpg") no-repeat 0 -25px;
            background-size: 100%;
          }
          & > div:nth-child(3) {
            width: 32%;
            height: 80px;
            background: url("../../assets/img/question-answer.jpg");
            background-size: 100%;
          }
          & > div:nth-child(4) {
            width: 32%;
            height: 80px;
            margin-left: 2%;
            background: url("../../assets/img/music.jpg") no-repeat;
            background-size: 100%;
          }
          & > div:nth-child(5) {
            width: 32%;
            height: 80px;
            margin-left: 2%;
            background: url("../../assets/img/film.jpg") no-repeat;
            background-size: 100%;
          }
        }
      }
      .seminar {
        padding: 20px;
        box-sizing: border-box;
        border-bottom: 5px solid #efefef;
        img {
          width: 100%;
          height: 200px;
        }
        & > p {
          padding: 10px 0;
          font-size: 14px;
          font-weight: 500;
          color: #5e5e5e;
        }
        .seminar-title {
          font-size: 16px;
        }
      }
      .page-foot {
        width: 100%;
        height: 110px;
      }
    }
  }
</style>
