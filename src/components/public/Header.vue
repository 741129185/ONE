<template>
  <div class="header" ref="header">
    <div class="title">{{newTitleText}}</div>
    <div class="search" @click="toSearchPage"><img src="../../assets/img/search-logo.png"></div>
  </div>
</template>
<script>
  export default {
    name: 'Header',
    props: ['newTitle'],
    computed: {
      newTitleText() {
        if (!this.newTitle) {
          return 'ONE   IS   ALL'
        } else {
          return this.newTitle
        }
      }
    },
    methods: {
      toSearchPage() {
          this.$emit('hiddenNav')
          this.$emit('update:showNav', false)
          this.$router.push({
            name: 'SearchResultPage'
          })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .header {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 50px;
    z-index: 77;
    .title {
      width: 100%;
      height: 100%;
      background: #fff;
      text-align: center;
      font-size: 18px;
      color: #333;
      line-height: 50px;
    }
    .search {
      width: 20%;
      height: 100%;
      position: absolute;
      right: 0;
      top: 0;
      background: #fff;
      img {
        display: block;
        width: 22px;
        height: 22px;
        position: absolute;
        right: 10px;
        bottom: 10px;
      }
    }
  }
</style>
