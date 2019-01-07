<template>
  <div class="nav">
    <router-link to="/" tag="div" class="one" @click="LetNavShow">
      <div class="one-bg active"></div>
      <p class="active">ONE</p>
    </router-link>
    <router-link to="/all" tag="div" class="all" @click="LetNavShow">
      <div class="all-bg"></div>
      <p>ALL</p>
    </router-link>
    <router-link to="/me" tag="div" class="me" @click="LetNavShow">
      <div class="me-bg"></div>
      <p>ME</p>
    </router-link>
  </div>
</template>
<script>
  export default {
    name: 'FootNavigation',
    props: ['showNav'],
    methods: {
      LetNavShow() {
        this.$emit('update:showNav', true)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .nav {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 50px;
    width: 100%;
    display: flex;
    background: #fff;
    z-index: 60;
    div {
      flex: 1;
      p {
        text-align: center;
        font-weight: 500;
        color: #8b8b8b;
      }
      &.router-link-exact-active{
        p {
          color: #1b1b1b;
        }
      }
    }
    .one {
      .one-bg {
        width: 32px;
        height: 32px;
        margin: 0 auto;
        background: url("../../assets/img/one.png") no-repeat;
        /*&.active {*/
          /*background: url("../../assets/img/one-click.png");*/
        /*}*/
      }
      &.router-link-exact-active {
        .one-bg {
          background: url("../../assets/img/one-click.png");
        }
      }
    }
    .all {
      .all-bg {
        width: 32px;
        height: 32px;
        margin: 0 auto;
        background: url("../../assets/img/all.png") no-repeat;
        /*&.active {*/
          /*background: url("../../assets/img/all-click.png");*/
        /*}*/
      }
      &.router-link-exact-active {
        .all-bg {
          background: url("../../assets/img/all-click.png");
        }
      }
    }
    .me {
      .me-bg {
        width: 32px;
        height: 32px;
        margin: 0 auto;
        background: url("../../assets/img/me.png") no-repeat;
        /*&.active {*/
          /*background: url("../../assets/img/me-click.png");*/
        /*}*/
      }
      &.router-link-exact-active {
        .me-bg {
          background: url("../../assets/img/me-click.png");
        }
      }
    }
  }
</style>
