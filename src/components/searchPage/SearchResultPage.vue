<template>
  <div class="main">
    <div class="header">
      <input type="text" placeholder="输入作者或标题关键字" v-model="inputVal">
      <div class="search" @click="search"><span><img src="../../assets/img/search.png"></span></div>
      <router-link to="/" class="close"><span><img src="../../assets/img/close.png"></span></router-link>
    </div>
    <div class="result-box">
      <div class="result-list">
        <router-link :to="{name:'SearchResultDetail', params:{name:'article',res:this.articleRes}}" tag="div">阅读
        </router-link>
        <router-link :to="{name:'SearchResultDetail', params:{name:'pic',res:this.picRes}}" tag="div">图片</router-link>
        <router-link :to="{name:'SearchResultDetail', params:{name:'question',res:this.questionRes}}" tag="div">问答
        </router-link>
        <router-link :to="{name:'SearchResultDetail', params:{name:'film',res:this.filmRes}}" tag="div">影视</router-link>
      </div>
      <router-view/>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'SearchResultPage',
    props: ['allData'],
    data() {
      return {
        articleRes: [],
        picRes: [2],
        questionRes: [3],
        filmRes: [4],
        inputVal: null
      }
    },
    computed: {
      searchFrom() {
        return this.allData.categoryAll
      }
    },
    methods: {
      search() {
        this.articleRes = []
        this.picRes = []
        this.questionRes = []
        this.filmRes = []
        // 获取阅读的匹配内容
        this.searchFrom[1].detail.forEach(item => {
          if (item.title.indexOf(this.inputVal) >= 0 || item.author.indexOf(this.inputVal) >= 0) {
            this.articleRes.push(item)
          }
        })
        // 获取图片的匹配内容
        this.searchFrom[0].detail.forEach(item => {
          if (item.title.indexOf(this.inputVal >= 0) || item.forward_author.indexOf(this.inputVal) >= 0 || item.forward.indexOf(this.inputVal) >= 0) {
            this.picRes.push(item)
          }
        })
        // 获取问答的匹配内容
        this.searchFrom[2].detail.forEach(item => {
          if (item.title.indexOf(this.inputVal) >= 0 || item.answers_name.indexOf(this.inputVal) >= 0 || item.question.indexOf(this.inputVal) >= 0) {
            this.questionRes.push(item)
          }
        })
        // 获取影视的匹配内容
        this.searchFrom[4].detail.forEach(item => {
          if (item.title.indexOf(this.inputVal) >= 0 || item.author.indexOf(this.inputVal) >= 0 || item.text_subtitle.indexOf(this.inputVal) >= 0) {
            this.filmRes.push(item)
          }
        })
        this.$router.push({
          name: 'SearchResultDetail',
          params: {
            name: 'article',
            res: this.articleRes
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .main {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    .header {
      width: 100%;
      height: 50px;
      display: flex;
      background-color: #fff;
      input {
        flex: 0 0 70%;
        margin: 0;
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        text-align: left;
        border: 0;
        border-radius: inherit;
        padding: 10px 5px 10px 40px;
        line-height: 1.4em;
        display: block;
        font-size: 1em;
      }
      .close, .search {
        flex: 0 0 15%;
        position: relative;
        & > span {
          display: block;
          width: 20px;
          height: 20px;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translateX(-50%) translateY(-50%);
        }
      }
    }
    .result-box {
      width: 100%;
      height: 100%;
      /*background-color: rgba(0, 0, 0, 0.5);*/
      background-color: #fff;
      .result-list {
        display: flex;
        width: 100%;
        height: 64px;
        border-top: 1px solid #ccc;
        & > div {
          flex: 1;
          text-align: center;
          line-height: 64px;
          &.router-link-exact-active {
            color: #00b7ee;
          }
        }
      }
    }
  }
</style>
