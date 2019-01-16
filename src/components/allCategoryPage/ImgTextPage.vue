<template>
  <div class="main">
    <Header :newTitle="newTitle"/>
    <router-link to='/all' tag="div" class="goBack" @click.native="goBack"></router-link>
    <div class="img-text" ref="imgText">
      <ul>
        <div class="white"></div>
        <div class="demo" v-for="(item,index) in detailList.detail" :key="index">
          <div @click="toDetailPage(item.id,item,detailList)">
            <p class="date">{{item.day}}{{item.date}}</p>
            <p class="volume">{{item.volume}}</p>
            <img :src="item.img_url">
            <p class="pic-author">{{item.title}} / {{item.pic_author}}</p>
            <p class="content">{{item.forward}}</p>
            <p class="content-author">{{item.forward_author}}</p>
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
    name: 'ImgTextPage',
    components: {
      Header,
      DemoFooter
    },
    data() {
      return {
        isShow: false,
        newTitle: '一个图文'
      }
    },
    computed: {
      detailList() {
        return this.$route.query.detail
      }
    },
    props: ['showNav'],
    methods: {
      showFootNav() {
        this.$emit('update:showNav', true)
      },
      toDetailPage(id, detail, detailAll) {
        this.$router.push({
          name: 'ImgTextDetail',
          params: {
            id: id,
            detail: detail,
            detailAll: detailAll
          }
        })
      },
      _initImgTextPageScroll() {
        if (!this.imgTextScroll) {
          this.imgTextScroll = new BScroll(this.$refs.imgText, {
            click: true // 允许点击
          })
        } else {
          this.imgTextScroll.refresh()
        }
      },
      goBack() {
        this.$emit('update:showNav', true)
      }
    },
    mounted() {
      this.$nextTick(() => {
        this._initImgTextPageScroll()
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
    .img-text {
      width: 100%;
      height: 667px;
      box-sizing: border-box;
      overflow: hidden;
      & > ul {
        width: 100%;
        height: auto;
      }
      .white {
        width: 100%;
        height: 50px;
      }
      .demo {
        padding-bottom: 20px;
        border-bottom: 8px solid #ededed;
        .date {
          color: #000000;
          opacity: 0.6;
          font-size: 20px;
          line-height: 22px;
          text-align: center;
          padding-top: 16px;
        }
        .volume {
          margin-top: 4px;
          margin-bottom: 0;
          color: #808080;
          font-size: 10px;
          line-height: 14px;
          text-align: center;
        }
        img {
          width: 100%;
          height: 250px;
          margin: 10px 0;
        }
        .pic-author {
          margin-top: 20px;
          color: #808080;
          font-size: 10px;
          line-height: 14px;
          text-align: center;
        }
        .content {
          color: #000000;
          opacity: 0.6;
          font-size: 14px;
          line-height: 26px;
          margin: 20px 20px 18px 20px;
        }
        .content-author {
          color: #808080;
          font-size: 10px;
          line-height: 14px;
          text-align: center;
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
</style>
