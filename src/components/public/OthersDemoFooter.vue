<template>
  <div class="footer">
    <div class="date">今天</div>
    <div class="like"><img src="../../assets/img/like.png"></div>
    <div class="like-count">{{likeCount}}</div>
    <div class="share"><img src="../../assets/img/share.png"></div>
  </div>
</template>
<script>
  export default {
    name: 'OthersDemoFooter',
    props: ['likeCount']
  }
</script>
<style lang="scss" scoped>
  .footer {
    display: flex;
    width: 100%;
    height: 60px;
    box-sizing: border-box;
    padding: 15px 0;
    position: relative;
    .date {
      float: left;
      line-height: 40px;
      font-size: 13px;
      color: #aeaeae;
    }
    .like {
      position: absolute;
      right: 70px;
      top: 20px;
      img {
        width: 20px;
        height: 20px;
      }
    }
    .like-count {
      position: absolute;
      top: 15px;
      right: 50px;
      font-size: 12px;
      color: #aeaeae;
    }
    .share {
      position: absolute;
      right: 10px;
      top: 20px;
      img {
        width: 20px;
        height: 20px;
      }
    }
  }
</style>
