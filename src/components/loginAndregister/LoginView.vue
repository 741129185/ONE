<template>
  <div class="login">
    <div class="header">
      <div class="go-back" @click="goBack"><img src="../../assets/img/go-back.png"></div>
      <p class="title">ONE一个</p>
      <p class="title-english">ONE IS ALL</p>
    </div>
    <transition name="fade">
      <div class="msg-box" v-show="showMsg" @click="showMsg = !showMsg">
        <div class="msg">{{msg}}</div>
        <div class="success-btn" @click="toHomePage" v-if="loginSuccess">点击我跳转至首页！</div>
      </div>
    </transition>
    <div class="input-box">
      <div class="name">
        <img src="../../assets/img/register-username.png">
        <input type="text" v-model="userName" placeholder="请输入您的账号">
      </div>
      <div class="password">
        <img src="../../assets/img/register-psw.png">
        <input type="password" v-model="passWord" placeholder="请输入您的密码">
      </div>
    </div>
    <p class="forget">忘记密码？</p>
    <div class="login-btn" @click="login">登录</div>
    <p class="goRegister">还没有账号？现在
      <router-link tag="span" to="/register">注册</router-link>
    </p>
    <p class="login-desc">登录即代表您同意<span>用户服务协议</span></p>
  </div>
</template>
<script>
  import {unEncrypt} from '../../assets/js/tool'
  export default {
    name: 'LoginView',
    props: ['showNav'],
    data() {
      return {
        userName: null,
        passWord: null,
        msg: null,
        showMsg: false,
        loginSuccess: false
      }
    },
    methods: {
      goBack() {
        this.$emit('update:showNav', true)
        this.$router.push({
          path: '/me'
        })
      },
      login() {
        let registerName = unEncrypt(sessionStorage.getItem('userName'))
        let registerPsw = unEncrypt(sessionStorage.getItem('passWord'))
        if (this.userName === registerName && this.passWord === registerPsw) {
          this.showMsg = true
          this.loginSuccess = true
          this.msg = `尊敬的${registerName}用户，欢迎登录`
          sessionStorage.setItem('isLogin', true)
        } else if (this.userName !== registerName) {
          this.showMsg = true
          this.msg = `用户名为空或用户名不存在`
          this.userName = null
        } else if (this.passWord !== registerPsw) {
          this.showMsg = true
          this.msg = `密码为空或密码不存在`
          this.passWord = null
        }
      },
      toHomePage() {
          this.$router.push({
            path: '/'
          })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .login {
    width: 100%;
    height: 100%;
    .header {
      width: 100%;
      height: 200px;
      background: url("../../assets/img/register-bg.jpg") no-repeat;
      background-size: 100%;
      position: relative;
      .go-back {
        background: rgba(0, 0, 0, 0.5);
        position: absolute;
        top: 30px;
        left: 15px;
        width: 26px;
        height: 26px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .title {
        padding-top: 80px;
        text-align: center;
        font-size: 26px;
        color: #fff;
        font-weight: bold;
      }
      .title-english {
        margin-top: 8px;
        text-align: center;
        color: #fff;
        font-size: 13px;
        font-weight: bold;
      }
    }
    .fade-enter,.fade-leave-to {
      opacity: 0;
    }
    .fade-enter-active,.fade-leave-active{
      transition: all 0.3s;
    }
    .msg-box {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      .msg {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        width: 80%;
        height: 100px;
        background: #3b3b3b;
        color: #fff;
        border-radius: 5px;
        line-height: 100px;
        text-align: center;
      }
      .success-btn {
        display: inline-block;
        padding: 10px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        border-radius: 5px;
        background: cornflowerblue;
        color: #fff;
        position: absolute;
        left: 50%;
        top: 60%;
        transform: translateX(-50%);
      }
    }
    .input-box {
      margin-top: 45px;
      padding: 0 50px;
      box-sizing: border-box;
      & > div {
        padding: 15px 0;
        height: 20px;
        border-bottom: 1px solid #dcdcdc;
        display: flex;
        & > img {
          margin-right: 15px;
          padding: 0;
        }
        & > input {
          font-size: 15px;
          padding: 0;
          height: 100%;
          line-height: 20px;
          border: none;
          outline: 0;
        }
      }
    }
    .forget {
      margin-top: 20px;
      padding: 0 50px;
      font-size: 14px;
      color: #404040;
      font-weight: 600;
    }
    .login-btn {
      margin: 75px 50px 0 50px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-radius: 5px;
      background: #dcdcdc;
      color: #fff;
      font-size: 16px;
    }
    .goRegister {
      text-align: center;
      margin-top: 16px;
      font-size: 15px;
      color: #404040;
      font-weight: 600;
      & > span {
        text-decoration: underline;
      }
    }
    .login-desc {
      position: absolute;
      left: 0;
      bottom: 45px;
      width: 100%;
      margin-top: 15px;
      text-align: center;
      color: #dcdcdc;
      font-size: 13px;
      & > span {
        color: #3c3c3c;
      }
    }
  }
</style>
