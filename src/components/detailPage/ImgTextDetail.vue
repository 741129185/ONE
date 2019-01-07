<template>
  <div class="img-text">
    <Header :newTitle="newTitle"/>
    <router-link :to="{name:'ImgTextPage', query:{detail:detailAll}}" tag="div" class="goBack">
    </router-link>
    <div class="main">
      <img :src="detail.img_url">
      <p class="info"><span>{{detail.volume}}</span>{{detail.title}} | {{detail.pic_author}}</p>
      <p class="day">{{detail.day}}</p>
      <p class="date">{{detail.date}}</p>
      <div class="separate-line"></div>
      <p class="text">{{detail.forward}}</p>

    </div>
    <detail-page-foot :detail="detail" :detailAll="detailAll"/>
  </div>
</template>
<script>
  import Header from '../public/Header.vue'
  import DetailPageFoot from './DetailPageFoot.vue'
  export default {
    name: 'ImgTextDetail',
    data() {
        return {
          newTitle: '一个图文'
        }
    },
    components: {
      Header,
      DetailPageFoot
    },
    computed: {
      detailAll() {
        return this.$route.params.detailAll
      },
      detail() {
        return this.$route.params.detail
      }
    }
  }
</script>
<style lang="scss" scoped>
  .img-text {
    width: 100%;
    height: 100%;
    .goBack {
      position: absolute;
      left: 5px;
      top: 11px;
      width: 28px;
      height: 28px;
      z-index: 80;
      background: url("../../assets/img/go-back.png") no-repeat;
    }
    .main {
      width: 100%;
      img {
        width: 100%;
        height: 250px;
        margin-top: 50px;
      }
      .info {
        padding: 0 20px;
        margin: 20px 0;
        font-size: 13px;
        text-align: right;
        span {
          float: left;
        }
      }
      .day {
        margin-top: 20px;
        text-align: center;
        font-size: 48px;
        color: black;
        line-height: 48px;
        font-family: Serif;
      }
      .date {
        margin-bottom: 10px;
        text-align: center;
        color: black;
        line-height: 32px;
      }
      .separate-line {
        margin: 20px 0;
        width: 30%;
        height: 1px;
        background-color: #eee;
        margin-left: auto;
        margin-right: auto;
      }
      .text {
        padding: 0 20px;
        color: black;
        line-height: 26px;
        margin-top: 14px;
        font-size: 16px;
      }
    }
  }
</style>
