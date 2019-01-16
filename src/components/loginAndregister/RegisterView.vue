<template>
  <div class="main">
    <div class="header">
      <div class="go-back" @click="goBack"><img src="../../assets/img/go-back.png"></div>
      <p class="title">ONE一个</p>
      <p class="title-english">ONE IS ALL</p>
    </div>
    <transition name="fade">
      <div class="msg-box" v-show="showMsg" @click="showMsg = !showMsg">
        <div class="msg">{{msg}}</div>
        <div class="success-btn" @click="toLoginPage" v-if="registerSuccess">点击我跳转至登录界面！</div>
      </div>
    </transition>
    <div class="input-box">
      <div class="password"><img src="../../assets/img/register-phone.png"><input type="text" v-model="phone"
                                                                                  placeholder="请输入您的常用手机号"></div>
      <div class="name"><img src="../../assets/img/register-username.png"><input type="text" v-model="userName"
                                                                                 placeholder="请输入您心仪的账号"></div>
      <div class="password"><img src="../../assets/img/register-psw.png"><input type="password" v-model="passWord"
                                                                                placeholder="请输入您的密码"></div>
    </div>
    <div class="info">
      <p>温馨提示：</p>
      <p>账号只允许含有字母，数字，下划线，减号。密码要求包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符</p>
    </div>
    <div class="register-btn" @click="finishRegister">注册</div>
    <p class="register-desc">注册即代表你同意<span>用户服务协议</span></p>
  </div>
</template>
<script>
  import {encrypt, unEncrypt} from '../../assets/js/tool'
  export default {
    name: 'RegisterView',
    data() {
      return {
        phone: null,
        userName: null,
        passWord: null,
        showMsg: false,
        registerSuccess: false,
        msg: null
      }
    },
    methods: {
      finishRegister() {
        // 判断手机号码的正则
        let phoneReg = /^1(3|4|5|7|8)\d{9}$/
        // 用户名正则，4到16位（字母，数字，下划线，减号）
        let nameReg = /^[a-zA-Z0-9_-]{4,16}$/
        // 密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
        let pswReg = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/
        if (!phoneReg.test(this.phone) || !this.phone.trim()) {
          this.msg = '手机号码为空或手机号码格式不正确'
          this.showMsg = true
          this.phone = null
        } else if (!nameReg.test(this.userName) || !this.userName.trim()) {
          this.msg = '用户名为空或用户名不符合要求'
          this.userName = true
          this.phone = null
        } else if (!pswReg.test(this.passWord) || !this.passWord.trim()) {
          this.msg = '密码为空密码不符合要求'
          this.showMsg = true
          this.passWord = null
        } else {
          let tel = encrypt(this.phone)
          let name = encrypt(this.userName)
          let psw = encrypt(this.passWord)
          sessionStorage.setItem('phone', tel)
          sessionStorage.setItem('userName', name)
          sessionStorage.setItem('passWord', psw)
          this.msg = `恭喜你！账号：${unEncrypt(sessionStorage.getItem('userName'))},注册成功!`
          this.registerSuccess = true
          this.showMsg = true
        }
      },
      goBack() {
        this.$emit('update:showNav', true)
        this.$router.push({
          path: '/me'
        })
      },
      toLoginPage() {
        this.registerSuccess = false
        this.$router.push({
          path: '/login'
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .main {
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
        width: 180px;
        line-height: 30px;
        border-radius: 5px;
        background: cornflowerblue;
        color: #fff;
        text-align: center;
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
          /*display: inline-block;*/
          margin-right: 15px;
          padding: 0;
        }
        & > input {
          padding: 0;
          font-size: 15px;
          /*display: inline-block;*/
          height: 100%;
          line-height: 20px;
          border: none;
          outline: 0;
        }
      }
    }
    .info {
      margin-top: 10px;
      padding: 0 50px;
      font-size: 15px;
      color: #afafaf;
      & > p:nth-child(2) {
        margin-top: 5px;
        line-height: 20px;
      }
    }
    .register-btn {
      margin: 50px 50px 0 50px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-radius: 5px;
      background: #dcdcdc;
      color: #fff;
      font-size: 16px;
    }
    .register-desc {
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
