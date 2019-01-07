<template>
  <div class="footer">
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
      <div class="collect"><img src="../../assets/img/collect.png"></div>
      <div class="comment"><img src="../../assets/img/comment.png"></div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'DemoFooter',
    props: ['likeCount']
  }
</script>
<style lang="scss" scoped>
  .footer {
    display: flex;
    width: 100%;
    height: 76px;
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
    }
  }
</style>
