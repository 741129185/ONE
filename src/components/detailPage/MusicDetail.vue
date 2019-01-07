<template>
  <div class="main">
    <Header :newTitle="newTitle" />
    <div class="goBack" @click="goBack"></div>
    <div class="music" ref="music">
      <ul>
        <div class="white"></div>
        <div class="music-box">
          <div class="music-tool">
            <div class="album-box">
              <img class="album-img" :src="detail.album_img">
            </div>
            <img class="play" src="http://image.wufazhuce.com/music-detail-play.png">
          </div>
          <div class="music-name">{{detail.music_name}}</div>
          <div class="album">{{detail.album}}</div>
          <div class="text-author">{{detail.text_author}}</div>
          <p class="text-title">{{detail.text_title}}</p>
          <p class="text-author-simple">{{detail.text_author}}</p>
          <p class="text-content" v-html="detail.text">{{detail.text}}</p>
          <p class="editor">{{detail.editor}}</p>
          <p class="explain">{{detail.explain}}</p>
          <div class="author-box">
            <p class="author-title">作者</p>
            <div class="black-line"></div>
            <div class="author-info">
              <div class="author-img"><img :src="detail.text_author_img"></div>
              <div class="author-info-detail">
                <p>{{detail.text_author}}</p>
                <p>{{detail.text_author_desc}}</p>
              </div>
            </div>
          </div>
          <div class="comment-box">
            <p class="comment-title">评论</p>
            <div class="black-line"></div>
          </div>
        </div>

        <div>
        </div>
      </ul>
    </div>
    <detail-page-foot :detail="detail" :detailAll="detailAll" :scrollTop.sync="scrollTop"/>
  </div>
</template>
<script>
  import Header from '../public/Header.vue'
  import BScroll from 'better-scroll'
  import DetailPageFoot from './DetailPageFoot.vue'
  export default {
    name: 'MusicDetail',
    data() {
      return {
        newTitle: '一个音乐',
        scrollTop: false
      }
    },
    components: {
      Header,
      DetailPageFoot
    },
    computed: {
      detail() {
        return this.$route.params.detail
      },
      detailAll() {
        return this.$route.params.detailAll
      }
    },
    methods: {
      goBack() {
        this.$router.push({
          name: 'MusicPage',
          query: {detail: this.$route.params.detailAll}
        })
      },
      _initMusicDetailScroll() {
        if (!this.musicScroll) {
          this.musicScroll = new BScroll(this.$refs.music, {
            click: true // 允许点击
          })
        } else {
          this.musicScroll.refresh()
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        this._initMusicDetailScroll()
      })
    },
    watch: {
      scrollTop(oldVal, newVal) {
        if (oldVal !== newVal) {
          this.musicScroll.scrollTo(0, 0, 500)
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .main {
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
    .music {
      width: 100%;
      height: 100%;
      & > ul {
        height: auto;
        padding-bottom: 200px;
        .white {
          width: 100%;
          height: 50px;
        }
        .music-box {
          width: 100%;
          padding: 0 20px;
          box-sizing: border-box;
          .music-tool {
            width: 100%;
            height: 306px;
            .album-box {
              position: absolute;
              left: -186px;
              top: -134px;
              width: 490px;
              height: 490px;
              border-radius: 245px 245px 245px 0;
              box-shadow: 0 0 20px 5px rgba(230, 230, 230, 0.6);
              .album-img {
                display: block;
                width: 454px;
                height: 454px;
                border-radius: 50%;
                position: absolute;
                left: 18px;
                top: 18px;
              }
            }
            .play {
              width: 72px;
              height: 72px;
              z-index: 80;
              position: absolute;
              top: 75px;
              left: 23px;
            }
          }
          .music-name {
            margin-top: 32px;
          }
          .music-name,.album,.text-author {
            height: 20px;
            line-height: 20px;
            text-align: center;
            font-size: 14px;
          }
          .text-title {
            color: black;
            font-size: 28px;
            font-weight: bold;
            line-height: 1.3;
            text-align: center;
            margin-top: 30px;
          }
          .text-author-simple {
            font-size: 14px;
            margin-top: 40px;
            margin-bottom: 30px;
            text-align: center;
          }
          .text-content {
            line-height: 26px;
            margin-top: 14px;
            text-align: justify;
          }
          .editor,.explain {
            color: #808080;
            font-style: oblique;
            margin: 20px 0;
            font-size: 12px;
          }
          .author-box {
            width: 100%;
            .author-title {
              font-size: 15px;
              margin-top: 60px;
              margin-bottom: 0;
            }
            .black-line {
              border: 2px solid #000;
              margin: 15px 0 7px 0;
              width: 70px;
            }
            .author-info {
              display: flex;
              .author-img {
                flex: 0 0 55px;
                width: 55px;
                & > img {
                  display: block;
                  width: 45px;
                  height: 45px;
                  border-radius: 50%;
                }
              }
              .author-info-detail {
                flex: 1;
                line-height: 20px;
                & > p:nth-child(1) {
                  font-size: 14px;
                  vertical-align: top;
                }
                & > p:nth-child(2) {
                  font-size: 10px;
                  color: #808080;
                  vertical-align: top;
                }
              }
            }
          }
          .comment-box {
            width: 100%;
            .comment-title {
              font-size: 15px;
              margin-top: 60px;
              margin-bottom: 0;
            }
            .black-line {
              border: 2px solid #000;
              margin: 15px 0 7px 0;
              width: 70px;
            }
          }
        }
      }
    }
  }
</style>

<style>
  .text-content>p{
    margin-bottom: 20px;
  }
  .text-content img {
    text-align: center;
    max-width: 100%;
    height: auto;
    width: 100%;
  }
</style>
