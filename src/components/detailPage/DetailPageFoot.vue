<template>
  <div class="main">
    <div class="foot">
      <div class="prev" @click="prev"><span>上一篇</span></div>
      <div class="share"><span @click="toggle"></span></div>
      <div class="next" @click="next"><span>下一篇</span></div>
    </div>
    <div class="share-box" v-show="shareShow">
      <transition name="fade">
        <div class="opacity" @click="toggle" v-show="shareShow"></div>
      </transition>
      <transition name="move">
        <div class="share-way" v-show="shareShow" @click="toggle">
          <div>
            <div style="border-color: #ff763b"><img src="../../assets/img/weibo-icon.png"></div>
          </div>
          <div>
            <div style="border-color: #FDBE3D"><img src="../../assets/img/QQ-space-icon.png"></div>
          </div>
          <div>
            <div style="border-color: #38c"><img src="../../assets/img/QQ-icon.png"></div>
          </div>
          <div>
            <div style="border-color: green"><img src="../../assets/img/wechat-icon.png"></div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'DetailPageFoot',
    props: ['detail', 'detailAll', 'scrollTop'],
    data() {
      return {
        shareShow: false,
        nameMap: ['ImgTextDetail', 'ArticleDetail', 'QuestionDetail', 'MusicDetail', 'FilmDetail']
      }
    },
    methods: {
      toggle() {
        this.shareShow = !this.shareShow
      },
      prev() {
        this.$emit('update:scrollTop', !this.scrollTop)
        let length = this.detailAll.detail.length
        if (this.detailAll.detail[length - 1].id === this.detail.id) {
          alert('抱歉！这已经是最旧的一篇了！')
        } else {
          let componentName = this.nameMap[this.detailAll.category_id]
          let prevDetail = this.detailAll.detail.find((el) => (el.id === `${this.detail.id - 1}`))
          this.$router.push({
//            path: `/${this.detailAll.category}/${prevDetail.id}`,
            name: componentName,
            params: {
              id: prevDetail.id,
              detail: prevDetail,
              detailAll: this.detailAll
            }
          })
        }
      },
      next() {
        this.$emit('update:scrollTop', !this.scrollTop)
        if (this.detailAll.detail[0].id === this.detail.id) {
          alert('抱歉！这已经是最新一篇了！')
        } else {
          let componentName = this.nameMap[this.detailAll.category_id]
          let nextDetail = this.detailAll.detail.find((el) => (el.id === (parseInt(this.detail.id) + 1).toString()))
          this.$router.push({
//            path: `/${this.detailAll.category}/${nextDetail.id}`,
            name: componentName,
            params: {
              id: nextDetail.id,
              detail: nextDetail,
              detailAll: this.detailAll
            }
          })
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .main {
    .foot {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 50px;
      box-sizing: border-box;
      display: flex;
      border-top: 1px solid #e2e2e2;
      & > div {
        flex: 1;
        line-height: 50px;
        color: #4a4a4a;
        &.share {
          background-color: #fff;
          span {
            display: block;
            width: 50px;
            height: 50px;
            margin: 0 auto;
            background: url("../../assets/img/share.png") no-repeat center center;
          }
        }
        &.prev {
          background-color: #fff;
          position: relative;
          span {
            position: absolute;
            left: 20px;
            top: 50%;
            transform: translateY(-50%);
          }
        }
        &.next {
          background-color: #fff;
          position: relative;
          span {
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
    }
    .share-box {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      .fade-enter {
        opacity: 0;
      }
      .fade-enter-active {
        transition: all 0.5s;
      }
      .move-enter {
        transform: translateY(100%);
      }
      .move-enter-active {
        transition: all 0.5s;
      }
      .opacity {
        width: 100%;
        height: 85%;
        background-color: rgba(255, 255, 255, 0.5);
      }
      .share-way {
        width: 100%;
        height: 15%;
        background-color: rgb(255, 255, 255);
        display: flex;
        & > div {
          flex: 1;
          position: relative;
          & > div {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translateY(-50%) translateX(-50%);
            width: 66px;
            height: 66px;
            border-radius: 50%;
            border: 1px solid #ccc;
            img {
              display: block;
              width: 48px;
              height: 48px;
              margin: 10px auto;
            }
          }
        }
      }
    }
  }
</style>
