<template>
  <div class="author">
    <transition name="fade">
      <div class="tips" v-show="isLogin" @click="isLogin=!isLogin">
        <div class="un-login" @click.stop="toLoginPage">
          抱歉！还没登录不可以关注哦！
          <div class="toLogin">点击我跳转到登录页面！</div>
        </div>
      </div>
    </transition>
    <div class="head">
      <router-link to="/all" tag="div" class="back" @click="goBack"></router-link>
    </div>
    <div class="author-info">
      <div class="author-pic"><img :src="authorInfo.web_url"></div>
      <p class="author-name">{{authorInfo.user_name}}</p>
      <p class="summary">{{authorInfo.summary}}</p>
      <p class="introduction">{{authorInfo.introduction}}</p>
      <div class="follow" ref="author" :class="{followed:isFollow}" @click="follow(authorInfo.user_id)">关注</div>
      <p class="follow-count">{{authorInfo.fans_total}}关注</p>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'AuthorPage',
    data() {
      return {
        followList: [],
        isFollow: false,
        isLogin: false
      }
    },
    computed: {
      authorInfo() {
        return this.$route.params.authorInfo
      }
    },
    methods: {
      goBack() {
        this.$emit('update:showNav', true)
      },
      toLoginPage() {
          this.$router.push('/login')
      },
      follow(authorId) {
        if (!sessionStorage.getItem('isLogin')) {
          this.isLogin = true
          return
        }
        if (sessionStorage.getItem('followList') === null) {
          this.isFollow = !this.isFollow
          sessionStorage.setItem('followList', JSON.stringify([]))
          this.followList = JSON.parse(sessionStorage.getItem('followList'))
          this.followList.push(authorId)
          sessionStorage.setItem('followList', JSON.stringify(this.followList))
        } else {
          this.isFollow = !this.isFollow
          this.followList = JSON.parse(sessionStorage.getItem('followList'))
          let followId = this.followList.find(id => id === authorId)
          let index = this.followList.indexOf(followId)
          if (index >= 0) { // 数组中已存在相同的ID 即默认删除收藏
            this.followList.splice(index, 1)
            sessionStorage.setItem('followList', JSON.stringify(this.followList))
          } else {
            this.followList.push(authorId)
            sessionStorage.setItem('followList', JSON.stringify(this.followList))
          }
        }
      },
      thisAuthorIsCollect() {
        if (sessionStorage.getItem('followList') === null) {
          return
        }
        this.followList = JSON.parse(sessionStorage.getItem('followList'))
        let followId = this.followList.find(id => id === this.authorInfo.user_id)
        let index = this.followList.indexOf(followId)
        if (index >= 0) {
          this.isFollow = true
        }
      }
    },
    created() {
      this.thisAuthorIsCollect()
    }
  }
</script>
<style lang="scss" scoped>
  .author {
    width: 100%;
    height: 100%;
    .fade-enter,.fade-leave-to {
      opacity: 0;
    }
    .fade-enter-active,.fade-leave-active{
      transition: all 0.3s;
    }
    .tips {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.6);
      z-index: 99;
      .un-login {
        width: 60%;
        padding: 20px;
        background-color: rgba(0,0,0,0.9);
        border-radius: 10px;
        position: absolute;
        left: 50%;
        top: 50%;
        color: #fff;
        text-align: center;
        transform: translateX(-50%) translateY(-50%);
        .toLogin {
          margin-top: 20px;
          text-align: center;
          color: orangered;
        }
      }
    }
    .head {
      width: 100%;
      height: 50px;
      position: relative;
      .back {
        width: 26px;
        height: 26px;
        background: url("../../assets/img/go-back.png") no-repeat;
        position: absolute;
        left: 5px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .author-info {
      width: 100%;
      box-sizing: border-box;
      padding: 20px;
      .author-pic {
        width: 100%;
        height: 100px;
        position: relative;
        img {
          display: block;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translateX(-50%) translateY(-50%);
        }
      }
      .author-name {
        padding-bottom: 10px;
        text-align: center;
        font-size: 18px;
        color: #000;
        font-weight: 600;
      }
      .summary {
        color: #c5c5c5;
        font-size: 16px;
        text-align: center;
        padding: 10px 0;
      }
      .introduction {
        color: #656565;
        font-size: 18px;
        padding: 0 10px;
        line-height: 25px;
        text-align: center;
      }
      .follow {
        margin: 0 auto;
        color: #717171;
        margin-top: 20px;
        width: 50px;
        height: 20px;
        padding: 10px;
        text-align: center;
        line-height: 20px;
        border: 1px solid #656565;
        border-radius: 5px;
        &.followed {
          background: #333;
          color: #fff;
        }
      }
      .follow-count {
        margin-top: 20px;
        text-align: center;
        color: #bfbfbf;
      }
    }
  }
</style>
