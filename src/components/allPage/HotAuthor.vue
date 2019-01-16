<template>
  <div class="hot-author">
    <p>近期热门作者</p>
    <div class="author-demo" v-for="(item,index) in this.showHotAuthor" :key="index">
      <router-link class="demo" :to="{name:'AuthorPage', params:{id:item.user_id, authorInfo:showHotAuthor[index]}}"
                   tag="div">
        <img class="author-img" :src="item.web_url">
        <div class="author-desc">
          <p class="author-name">{{item.user_name}}</p>
          <p class="author-summary">{{item.summary}}</p>
        </div>
      </router-link>
    </div>
    <div class="change-box">
      <button class="change-btn" @click="changeAuthors">换一换</button>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'HotAuthor',
    data() {
      return {
        hotAuthor: [],
        showHotAuthor: [],
        start: 0,
        end: 5
      }
    },
    methods: {
      changeAuthors() {
        if (this.start === 15) {
          this.start = 0
          this.end = 5
        } else {
          this.start += 5
          this.end += 5
        }
        this.showHotAuthor = this.hotAuthor.slice(this.start, this.end)
      }
    },
    created () {
      this.$axios.get('/api/hotAuthor')
        .then(res => {
          res = res.data
          if (res.errno === 0) { // 模仿真实开发,判断当前数据是否有权限获取
            this.hotAuthor = res.data
            this.showHotAuthor = this.hotAuthor.slice(this.start, this.end)
          }
        })
    }
  }
</script>
<style lang="scss" scoped>
  .hot-author {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    & > p {
      padding: 10px 0;
      font-size: 14px;
      font-weight: 500;
      color: #5e5e5e;
    }
    .author-demo {
      padding: 10px 0;
      box-sizing: border-box;
      width: 100%;
      height: 60px;
      display: flex;
      .demo {
        display: flex;
        .author-img {
          height: 40px;
          width: 40px;
          border-radius: 50%;
        }
        .author-desc {
          width: 220px;
          padding: 0 20px;
          overflow: hidden;
          .author-name,
          .author-summary {
            width: 100%;
            margin-bottom: 6px;
            box-sizing: border-box;
            font-size: 14px;
            color: #969696;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .author-name {
            color: #292929;
          }
          .author-summary {
            font-size: 13px;
          }
        }
      }
    }
    .change-box {
      padding-top: 30px;
      padding-bottom: 10px;
      text-align: center;
      .change-btn {
        display: inline-block;
        padding: 5px 10px;
        background: #fff;
        border: 1px solid #5e5e5e;
      }
    }
  }
</style>
