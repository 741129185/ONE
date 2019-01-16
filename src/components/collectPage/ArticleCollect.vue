<template>
  <div class="main">
    <div class="header">
      <img class="go-back" @click="toMePage" src="../../assets/img/go-back.png">
      <span class="title">文章收藏</span>
    </div>
    <div class="article-collect" ref="article">
      <ul>
        <div class="demo" v-for="el in articleCollectList" :key="el.id"
             @click="toDetailPage(el.id,el,articleDetailAll)">
          <div class="icon"><img src="../../assets/img/collect-article.png"></div>
          <div class="title">{{el.title}}</div>
        </div>
      </ul>
    </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  import {unEncrypt} from '../../assets/js/tool'
  export default {
    name: 'ArticleCollect',
    props: ['allData'],
    computed: {
      articleDetailAll() {
        return this.allData.categoryAll.find((el) => (el.category === 'article'))
      },
      articleCollectList() {
        let CollectList = []
        let articleAll = this.allData.categoryAll.find((el) => (el.category === 'article')).detail
        let collectList = JSON.parse(sessionStorage.getItem('collectList'))
        collectList.forEach((e) => {
          if (articleAll.find((el) => (el.id === unEncrypt(e)))) {
            CollectList.push(articleAll.find((el) => (el.id === unEncrypt(e))))
          }
        })
        return CollectList
      }
    },
    methods: {
      toMePage() {
        this.$emit('update:showNav', !this.showNav)
        this.$router.push('/me')
      },
      _initArticleCollectScroll() {
        if (!this.articleCollectScroll) {
          this.articleCollectScroll = new BScroll(this.$refs.article, {
            click: true // 允许点击
          })
        } else {
          this.articleCollectScroll.refresh()
        }
      },
      toDetailPage(id, detail, detailAll) {
        this.$router.push({
          name: 'ArticleDetail',
          params: {
            id,
            detail,
            detailAll
          }
        })
      }
    },
    created() {
      this.$nextTick(() => {
        this._initArticleCollectScroll()
      })
    }
  }
</script>
<style lang="scss" scoped>
  .main {
    width: 100%;
    height: 100%;
    .header {
      width: 100%;
      height: 44px;
      background: #fff;
      display: flex;
      position: relative;
      border-bottom: 1px solid #ccc;
      .go-back {
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
      }
      .title {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        font-weight: bold;
        font-size: 16px;
        color: #333;
      }
    }
    .article-collect {
      width: 100%;
      height: 100%;
      overflow: hidden;
      & > ul {
        padding-bottom: 200px;
      }
      .demo {
        height: 45px;
        display: flex;
        .icon {
          box-sizing: border-box;
          padding: 10px 15px;
        }
        .title {
          flex: 1;
          line-height: 45px;
          border-bottom: 1px solid #d4d4d4;
          color: #333;
          font-weight: 600;
        }
      }
    }
  }
</style>
