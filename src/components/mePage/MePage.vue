<template>
  <div class="main">
    <div class="header"><img src="../../assets/img/settings.png"></div>
    <div class="bg-pic"><img src="../../assets/img/login_bg.jpg"></div>
    <div class="login-box">
      <div class="login-btn">
        <p class="login">登录</p>
        <p class="text">ONE一个</p>
      </div>
      <p class="register">还没有账号？点击<span>注册</span></p>
      <div class="login-way">
        <div class="wechat"><img src="../../assets/img/login_wechat.png"></div>
        <div class="weibo"><img src="../../assets/img/login_weibo.png"></div>
        <div class="qq"><img src="../../assets/img/login_qq.png"></div>
      </div>
      <p class="agree">创建账号即代表您同意<span>用户服务协议</span></p>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'MePage'
  }
</script>
<style lang="scss" scoped>
  .main {
    width: 100%;
    height: 100%;
    position: relative;
    .header {
      width: 100%;
      height: 50px;
      position: relative;
      img {
        display: block;
        position: absolute;
        top: 50%;
        left: 20px;
        transform: translateY(-50%);
      }
    }
    .bg-pic {
      width: 100%;
      height: 200px;
      overflow: hidden;
      img {
        width: 100%;
        height: 200px;
      }
    }
    .login-btn {
      width: 100px;
      height: 100px;
      margin: 0 auto;
      margin-top: 10px;
      border-radius: 50%;
      background-color: #232323;
      color: #fff;
      font-weight: bold;
      & > p {
        text-align: center;
      }
      .login {
        padding-top: 28px;
      }
      .text {
        padding-top: 5px;
      }
    }
    .register {
      margin-top: 50px;
      text-align: center;
      font-size: 16px;
      color: #333;
      span {
        text-decoration: underline;
      }
    }
    .login-way {
      position: absolute;
      left: 0;
      bottom: 100px;
      width: 100%;
      height: 30px;
      display: flex;
      &>div {
        flex:1;
        text-align: center;
      }
    }
    .agree {
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 70px;
      font-size: 13px;
      text-align: center;
      color: #838383;
      span {
        color: #1d1d1d;
        text-decoration: underline;
      }
    }
  }
</style>
