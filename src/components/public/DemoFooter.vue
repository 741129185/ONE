<template>
  <div class="footer">
    <transition name="fade">
      <div class="un-login" v-show="isLogin">要登录才能收藏哦！请先登录！</div>
    </transition>
    <div class="foot-left">
      <img src="../../assets/img/find.png">
      <span>发现</span>
    </div>
    <div class="foot-right">
      <div class="like">
        <img src="../../assets/img/like.png">
        <span>{{likeCount}}</span>
      </div>
      <div class="share"><img src="../../assets/img/share.png"></div>
      <div class="collect"><span :class="{is_collect:isCollect}" @click="collectIt"></span></div>
      <div class="comment"><img src="../../assets/img/comment.png"></div>
    </div>
  </div>
</template>
<script>
  import {encrypt, unEncrypt} from '../../assets/js/tool'
  export default {
    name: 'DemoFooter',
    props: ['likeCount', 'id'],
    data() {
      return {
        collectList: [],
        isCollect: false,
        isLogin: false
      }
    },
    methods: {
      collectIt() {
        if (!sessionStorage.getItem('isLogin')) {
          this.isLogin = true
          setTimeout(() => {
            this.isLogin = false
          }, 2000)
          return
        }
        if (sessionStorage.getItem('collectList') === null) {
          this.isCollect = !this.isCollect
          sessionStorage.setItem('collectList', JSON.stringify([]))
          this.collectList = JSON.parse(sessionStorage.getItem('collectList'))
          let id = encrypt(this.id)
          this.collectList.push(id)
          sessionStorage.setItem('collectList', JSON.stringify(this.collectList))
        } else {
          this.isCollect = !this.isCollect
          this.collectList = JSON.parse(sessionStorage.getItem('collectList'))
          let collectId = this.collectList.find(id => unEncrypt(id) === this.id)
          let index = this.collectList.indexOf(collectId)
          if (index >= 0) { // 数组中已存在相同的ID 即默认删除收藏
            this.collectList.splice(index, 1)
            sessionStorage.setItem('collectList', JSON.stringify(this.collectList))
          } else {
            let id = encrypt(this.id)
            this.collectList.push(id)
            sessionStorage.setItem('collectList', JSON.stringify(this.collectList))
          }
        }
      },
      thisItemIsCollect() {
        if (sessionStorage.getItem('collectList') === null) {
          return
        }
        this.collectList = JSON.parse(sessionStorage.getItem('collectList'))
        this.collectList = JSON.parse(sessionStorage.getItem('collectList'))
        let collectId = this.collectList.find(id => unEncrypt(id) === this.id)
        let index = this.collectList.indexOf(collectId)
        if (index >= 0) {
          this.isCollect = true
        }
      }
    },
    created() {
      this.thisItemIsCollect()
    }
  }
</script>
<style lang="scss" scoped>
  .footer {
    display: flex;
    width: 100%;
    height: 76px;
    position: relative;
    .fade-enter, .fade-leave-to {
      opacity: 0;
    }
    .fade-enter-active, .fade-leave-active {
      transition: all 0.3s;
    }
    .un-login {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      z-index: 999;
      line-height: 76px;
      text-align: center;
      font-weight: bold;
      color: #fff;
      font-size: 18px;
    }
    .foot-left {
      position: relative;
      width: 40%;
      height: 100%;
      line-height: 32px;
      box-sizing: border-box;
      padding: 22px 20px;
      span {
        position: absolute;
        left: 54px;
        top: 22px;
        color: #333;
        font-size: 14px;
      }
    }
    .foot-right {
      width: 60%;
      height: 100%;
      box-sizing: border-box;
      padding: 22px 20px 22px 0;
      & > div {
        position: relative;
        float: right;
        width: 25%;
        height: 100%;
        img {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translateX(-50%) translateY(-50%);
          width: 16px;
          height: 16px;
        }
      }
      .like {
        span {
          position: absolute;
          top: 0;
          right: -8px;
          font-size: 12px;
          color: #333;
        }
      }
      .collect {
        & > span {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translateX(-50%) translateY(-50%);
          width: 16px;
          height: 16px;
          background: url("../../assets/img/collect.png");
          background-size: 100%;
          &.is_collect {
            background: url("../../assets/img/collect-it.png");
          }
        }
      }
    }
  }
</style>
