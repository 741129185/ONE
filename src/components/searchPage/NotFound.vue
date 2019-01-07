<template>
  <div class="main">
    <img src="http://image.wufazhuce.com/m.wufazhuce.com-search-none.png">
    <p class="p-one">没有任何相关记录</p>
    <p class="p-two">浏览更多 <router-link to="/all" tag="span">精彩内容</router-link></p>
  </div>
</template>
<script>
  export default {
    name: 'NotFound'
  }
</script>
<style lang="scss" scoped>
  .main {
    padding-top: 50px;
    text-align: center;
    img {
      width: 64px;
      height: 64px;
    }
    .p-one {
      margin-top: 50px;
      margin-bottom: 20px;
      font-size: 16px;
    }
    .p-two {
      color: #00b7ee;
      span {
        text-decoration:underline
      }
    }
  }
</style>
