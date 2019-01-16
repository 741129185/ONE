<template>
  <div class="search" ref="search">
    <ul>
      <div class="article-box" v-if="$route.params.name === 'article'">
        <not-found v-if="$route.params.name === 'article' && $route.params.res.length === 0"/>
        <div class="res-box" v-for="(el,index) in res" :key="index">
          <p class="date">{{el.day}} {{el.date}}</p>
          <p class="title">{{el.title}}</p>
          <p class="author">作者 / {{el.author}}</p>
          <p class="content" v-html="el.content">{{el.content}}</p>
        </div>
      </div>
      <div class="pic-box" v-if="$route.params.name === 'pic'">
        <not-found v-if="$route.params.name === 'pic' && $route.params.res.length === 0"/>
        <div class="res-box" v-for="(el, index) in res" :key="index">
          <p class="date">{{el.day}} {{el.date}}</p>
          <div class="main">
            <div class="pic"><img :src="el.img_url"></div>
            <div class="desc">
              <p class="desc-title">{{el.title}}</p>
              <p class="desc-forward">{{el.forward}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="question-box" v-if="$route.params.name === 'question'">
        <not-found v-if="$route.params.name === 'question'  && $route.params.res.length === 0"/>
        <div class="res-box" v-for="(el,index) in res" :key="index">
          <p class="date">{{el.date}}</p>
          <p class="title">{{el.title}}</p>
          <p class="answer" v-html="el.answer">{{el.answer}}</p>
        </div>
      </div>
      <div class="film-box" v-if="$route.params.name === 'film'">
        <not-found v-if="$route.params.name === 'film'  && $route.params.res.length === 0"/>
        <div class="res-box" v-for="(el,index) in res" :key="index">
          <p class="title">{{el.title}}</p>
          <p class="film">{{el.text_subtitle}}</p>
          <img :src="el.category_img">
          <p class="desc">&nbsp;&nbsp;&nbsp;&nbsp;{{el.content_short}}</p>
        </div>
      </div>
    </ul>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  import NotFound from './NotFound'
  export default {
    name: 'SearchResultDetail',
    components: {
      NotFound
    },
    computed: {
      res() {
        return this.$route.params.res
      }
    },
    methods: {
      _initSearchScroll() {
        if (!this.searchScroll) {
          this.searchScroll = new BScroll(this.$refs.search, {
            click: true // 允许点击
          })
        } else {
          this.searchScroll.refresh()
        }
      }
    },
    updated: function () { // 滚动组件要复用 页面有更新
      this.$nextTick(function () {
        this._initSearchScroll()
      })
    }
  }
</script>
<style lang="scss" scoped>
  .search {
    width: 100%;
    height: 552px;
    overflow: hidden;
    & > ul {
      width: 100%;
      padding-bottom: 200px;
      .article-box {
        .res-box {
          padding: 10px 20px;
          border-top: 4px solid #d7d7d7;
          box-sizing: border-box;
        }
        .date {
          display: block;
          width: 100%;
          height: 32px;
          line-height: 32px;
          font-size: 16px;
          color: #333
        }
        .title {
          color: black;
          font-size: 28px;
          font-weight: bold;
          line-height: 1.3;
        }
        .author {
          text-align: right;
          padding: 5px 0;
          color: black;
          font-size: 13px;
          font-weight: bold;
          line-height: 1.3;
        }
        .content {
          line-height: 26px;
          max-height: 50px;
          margin-top: 14px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
      .pic-box {
        .res-box {
          padding: 0 20px 53px 20px;
          box-sizing: border-box;
          border-top: 4px solid #d8d8d8;
        }
        .date {
          display: block;
          width: 100%;
          height: 32px;
          line-height: 32px;
          font-size: 16px;
          color: #333;
        }
        .main {
          display: flex;
        }
        .pic {
          flex: 0 0 30%;
          img {
            border: none;
            margin: 10px 0 0 -10px;
            width: 110px;
            height: 75px;
          }
        }
        .desc {
          flex: 0 0 70%;
          .desc-title {
            display: block;
            height: 32px;
            line-height: 32px;
            padding: 0 40px;
            margin-bottom: 6px;
            margin-left: 10px;
            font-size: 13px;
          }
          .desc-forward {
            line-height: 26px;
            max-height: 78px;
            margin-left: 30px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
          }
        }
      }
      .question-box {
        .res-box {
          padding: 10px 20px;
          border-top: 4px solid #dcdcdc;
          .date {
            display: block;
            height: 32px;
            line-height: 32px;
            font-size: 16px;
            color: #333;
          }
          .title {
            color: black;
            font-size: 28px;
            font-weight: bold;
            line-height: 1.3;
          }
          .answer {
            font-size: 16px;
            color: #333;
            line-height: 26px;
            max-height: 50px;
            margin-top: 14px;
            overflow: hidden;
            text-overflow: ellipsis;
            -moz-text-overflow: ellipsis;
            -webkit-text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
      }
      .film-box {
        .res-box {
          border-top: 4px solid #d8d8d8;
          padding: 20px;
          box-sizing: border-box;
          .title {
            display: block;
            height: 32px;
            line-height: 32px;
            font-size: 16px;
            color: #333;
          }
          .film {
            display: block;
            height: 32px;
            line-height: 32px;
            text-align: right;
            color: #6e6e6e;
          }
          img {
            display: block;
            width: 100%;
            height: auto;
            margin: 5px 0;
          }
          .desc {
            display: block;
            padding: 5px 0;
            font-size: 16px;
            color: #333;
            line-height: 25px;
          }
        }
      }
    }
  }
</style>
