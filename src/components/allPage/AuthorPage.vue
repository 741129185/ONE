<template>
  <div class="author">
    <div class="head">
      <router-link to="/all" tag="div" class="back" @click="goBack"></router-link>
    </div>
    <div class="author-info">
      <div class="author-pic"><img :src="authorInfo.web_url"></div>
      <p class="author-name">{{authorInfo.user_name}}</p>
      <p class="summary">{{authorInfo.summary}}</p>
      <p class="introduction">{{authorInfo.introduction}}</p>
      <div class="follow">关注</div>
      <p class="follow-count">{{authorInfo.fans_total}}关注</p>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'AuthorPage',
    computed: {
      authorInfo() {
        return this.$route.params.authorInfo
      }
    },
    methods: {
      goBack() {
        this.$emit('update:showNav', true)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .author {
    width: 100%;
    height: 100%;
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
        width: 40px;
        height: 20px;
        padding: 10px;
        text-align: center;
        line-height: 20px;
        border: 1px solid #656565;
        border-radius: 5px;
      }
      .follow-count {
        margin-top: 20px;
        text-align: center;
        color: #bfbfbf;
      }
    }
  }
</style>
