<template>
  <div class="main">
    <div class="header">
      <img class="go-back" @click="toMePage" src="../../assets/img/go-back.png">
      <span class="title">图文收藏</span>
    </div>
    <div class="img-collect" ref="img">
      <ul>
        <div class="demo-box">
          <div class="demo" v-for="item in imgCollectList" :key="item.id"
               @click="toDetailPage(item.id,item,imgDetailAll)">
            <div class="img">
              <img :src="item.img_url">
              <div class="info"><span>{{item.volume}}</span>{{item.day}}&nbsp;&nbsp;{{item.date}}</div>
            </div>
            <div class="text">
              <p>{{item.forward}}</p>
            </div>
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
    name: 'ImgCollect',
    props: ['allData'],
    computed: {
      imgDetailAll() {
        return this.allData.categoryAll.find((el) => (el.category === 'one'))
      },
      imgCollectList() {
        let CollectList = []
        let imgAll = this.allData.categoryAll.find((el) => (el.category === 'one')).detail
        let collectList = JSON.parse(sessionStorage.getItem('collectList'))
        collectList.forEach((e) => {
          if (imgAll.find((el) => (el.id === unEncrypt(e)))) {
            CollectList.push(imgAll.find((el) => (el.id === unEncrypt(e))))
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
      _initImgCollectScroll() {
        if (!this.imgCollectScroll) {
          this.imgCollectScroll = new BScroll(this.$refs.img, {
            click: true // 允许点击
          })
        } else {
          this.imgCollectScroll.refresh()
        }
      },
      toDetailPage(id, detail, detailAll) {
        this.$router.push({
          name: 'ImgTextDetail',
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
        this._initImgCollectScroll()
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
    .img-collect {
      width: 100%;
      height: 100%;
      background: #e5e5e5;
      overflow: hidden;
      & > ul {
        margin: 0;
        padding-bottom: 200px;
        .demo-box {
          padding: 0 6px;
          display: flex;
          flex-wrap: wrap;
          & > div:nth-child(2n) {
            margin-left: 12px;
          }
          & > div {
            flex: 0 0 175px;
            margin-bottom: 12px;
            overflow: hidden;
          }
          .demo {
            .img {
              position: relative;
              img {
                width: 100%;
                height: 130px;
                border: 0;
              }
              .info {
                width: 100%;
                height: 20px;
                padding: 0 8px;
                box-sizing: border-box;
                position: absolute;
                left: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                font-size: 12px;
                line-height: 20px;
                color: #fff;
                text-align: right;
                span {
                  float: left;
                }
              }
            }
            .text {
              width: 100%;
              height: 50px;
              padding: 5px 8px;
              overflow: hidden;
              box-sizing: border-box;
              background: #fff;
              p {
                color: #5a5a5a;
                font-size: 14px;
                line-height: 20px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
              }
            }
          }
        }
      }
    }
  }
</style>
