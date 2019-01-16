<template>
  <div class="main">
    <div class="header" v-if="isLogin">
      <div class="set" @click="showSetting = true"><img src="../../assets/img/settings.png"></div>
    </div>
    <transition name="fade">
      <div class="setting" v-show="showSetting" @click="showSetting = false">
        <div class="quit" @click.stop="quitLogin">退出登录</div>
      </div>
    </transition>
    <div class="scroll-box" ref="main">
      <ul>
        <div class="unLogin" v-if="!isLogin">
          <div class="header"><img src="../../assets/img/settings.png"></div>
          <div class="bg-pic"><img src="../../assets/img/me-bg.jpg"></div>
          <div class="login-box">
            <div class="login-btn">
              <p class="login" @click="toLoginPage">登录</p>
              <p class="text">ONE一个</p>
            </div>
            <p class="register">还没有账号？点击<span @click="toRegisterPage">注册</span></p>
            <div class="login-way">
              <div class="wechat"><img src="../../assets/img/login_wechat.png"></div>
              <div class="weibo"><img src="../../assets/img/login_weibo.png"></div>
              <div class="qq"><img src="../../assets/img/login_qq.png"></div>
            </div>
            <p class="agree">创建账号即代表您同意<span>用户服务协议</span></p>
          </div>
        </div>
        <div class="login" v-else>
          <div class="user-box">
            <div class="user">
              <p>欢迎回来！</p>
              <p>{{userName}}</p>
            </div>
          </div>
          <div class="collect">
            <p class="title">我的收藏</p>
            <div class="collect-list">
              <router-link to="/collect/one" tag="div" @click.native="hiddenNav">
                <img src="../../assets/img/collect-img.png">
                <p>图文</p>
              </router-link>
              <router-link to="/collect/article" tag="div" @click.native="hiddenNav">
                <img src="../../assets/img/collect-article.png">
                <p>文章</p>
              </router-link>
              <router-link to="/collect/question" tag="div" @click.native="hiddenNav">
                <img src="../../assets/img/collect-question.png">
                <p>问答</p>
              </router-link>
              <router-link to="/collect/music" tag="div" @click.native="hiddenNav">
                <img src="../../assets/img/collect-music.png">
                <p>音乐</p>
              </router-link>
              <router-link to="/collect/film" tag="div" @click.native="hiddenNav">
                <img src="../../assets/img/collect-film.png">
                <p>影视</p>
              </router-link>
            </div>
          </div>
          <div class="follow-box">
            <div class="follow" @click="showFollowDetail">
              <div class="follow-icon"><img src="../../assets/img/follow.png"></div>
              <p class="my-follow">我的关注</p>
              <div class="check-more">
                <span class="follow-num">{{followNum}}</span>
                <span class="follow-detail" :class="{show_detail:showDetail}"></span>
              </div>
            </div>
            <div class="detail-box">
              <transition name="follow-detail">
                <div v-show="showDetail">
                  <div class="detail" @click="toDetailPage(item.user_id,item)" v-for="item in followAuthorList"
                       :key="item.user_id">
                    <img class="author-img" :src="item.web_url">
                    <div class="author-desc">
                      <p class="author-name">{{item.user_name}}</p>
                      <p class="author-summary">{{item.summary}}</p>
                    </div>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  import {unEncrypt} from '../../assets/js/tool'
  export default {
    name: 'MePage',
    props: ['showNav', 'allData'],
    data() {
      return {
        showSetting: false,
        showDetail: false
      }
    },
    computed: {
      isLogin() {
        return sessionStorage.getItem('isLogin')
      },
      userName() {
        return unEncrypt(sessionStorage.getItem('userName'))
      },
      followNum() {
        return JSON.parse(sessionStorage.getItem('followList')).length
      },
      followAuthorList() {
        let followList = JSON.parse(sessionStorage.getItem('followList'))
        let list = []
        this.allData.hotAuthor.data.forEach(e => {
          if (followList.find(el => (el === e.user_id))) {
            list.push(e)
          }
        })
        return list
      }
    },
    methods: {
      hiddenNav() {
        this.$emit('update:showNav', false)
      },
      toRegisterPage() {
        this.hiddenNav()
        this.$router.push({
          name: 'RegisterView'
        })
      },
      toLoginPage() {
        this.hiddenNav()
        this.$router.push({
          name: 'LoginView'
        })
      },
      quitLogin() {
        sessionStorage.removeItem('isLogin')
        this.showSetting = false
        this.$router.push({
          path: '/login'
        })
      },
      toDetailPage(id, authorInfo) {
        this.$router.push({
          name: 'AuthorPage',
          params: {
            id,
            authorInfo
          }
        })
      },
      showFollowDetail() {
        this.showDetail = !this.showDetail
      },
      _initMePageScroll() {
        if (!this.mePageScroll) {
          this.mePageScroll = new BScroll(this.$refs.main, {
            click: true, // 允许点击
            probeType: 3 // 滑动监听
          })
        } else {
          this.mePageScroll.refresh()
        }
      }
    },
    created() {
      this.$nextTick(() => {
        this._initMePageScroll()
      })
    }
  }
</script>
<style lang="scss" scoped>
  .main {
    margin: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: relative;
    .header {
      width: 100%;
      height: 60px;
      background: rgba(0, 0, 0, 0.3);
      position: fixed;
      top: 0;
      left: 0;
      z-index: 99;
      .set {
        width: 20px;
        height: 20px;
        position: absolute;
        left: 16px;
        bottom: 11px;
      }
    }
    .setting {
      position: fixed;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      background: rgba(0, 0, 0, 0.8);
      z-index: 80;
      .quit {
        width: 100px;
        height: 40px;
        line-height: 40px;
        padding: 10px;
        text-align: center;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        background: #568d4c;
        border-radius: 7px;
        z-index: 99;
        color: #fff;
      }
    }
    .fade-enter, .fade-leave-to {
      opacity: 0;
    }
    .fade-enter-active, .fade-leave-active {
      transition: all 0.3s;
    }
    .scroll-box {
      width: 100%;
      height: 100%;
      & > ul {
        padding-bottom: 100px;
        .unLogin {
          .header {
            width: 100%;
            height: 50px;
            position: relative;
            img {
              display: block;
              position: absolute;
              top: 50%;
              left: 20px;
              transform: translateY(-50%);
            }
          }
          .bg-pic {
            width: 100%;
            height: 200px;
            overflow: hidden;
            img {
              width: 100%;
              height: 200px;
            }
          }
          .login-box {
            .login-btn {
              width: 100px;
              height: 100px;
              margin: 0 auto;
              margin-top: 10px;
              border-radius: 50%;
              background-color: #232323;
              color: #fff;
              font-weight: bold;
              & > p {
                text-align: center;
              }
              .login {
                padding-top: 28px;
              }
              .text {
                padding-top: 5px;
              }
            }
            .register {
              margin-top: 50px;
              text-align: center;
              font-size: 16px;
              color: #333;
              span {
                text-decoration: underline;
              }
            }
            .login-way {
              position: absolute;
              left: 0;
              bottom: 100px;
              width: 100%;
              height: 30px;
              display: flex;
              & > div {
                flex: 1;
                text-align: center;
              }
            }
            .agree {
              width: 100%;
              position: absolute;
              left: 0;
              bottom: 70px;
              font-size: 13px;
              text-align: center;
              color: #838383;
              span {
                color: #1d1d1d;
                text-decoration: underline;
              }
            }
          }
        }
        .login {
          .user-box {
            width: 100%;
            height: 250px;
            background: url("../../assets/img/login-bg.png") no-repeat;
            background-size: 100%;
            position: relative;
            .user {
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translateX(-50%) translateY(-50%);
              width: 50%;
              background: rgba(0, 0, 0, 0.5);
              border-radius: 5px;
              padding: 10px;
              & > p {
                text-align: center;
                color: #fff;
                font-weight: bold;
                font-size: 21px;
                margin-top: 10px;
              }
            }
          }
          .collect {
            border-top: 10px solid #e6e6e6;
            .title {
              padding: 12px 20px;
            }
            .collect-list {
              padding: 25px 20px;
              display: flex;
              & > div {
                flex: 1;
                & > img {
                  display: block;
                  width: 30px;
                  height: 30px;
                  margin: 0 auto;
                }
                & > p {
                  text-align: center;
                  margin-top: 10px;
                  color: #bfbfbf;
                  font-size: 15px;
                }
              }
            }
          }
          .follow-box {
            overflow: hidden;
            .follow {
              padding: 15px;
              border-top: 10px solid #e6e6e6;
              display: flex;
              .follow-icon {
                flex: 0 0 35px;
              }
              .my-follow {
                flex: 0 0 275px;
                color: #7b7b7b;
                line-height: 22px;
              }
              .check-more {
                flex: 1;
                position: relative;
                .follow-num {
                  line-height: 22px;
                  color: #7b7b7b;
                  margin-right: 10px;
                }
                .follow-detail {
                  width: 15px;
                  height: 15px;
                  background: url("../../assets/img/follow-more.png");
                  position: absolute;
                  top: 50%;
                  transform: translateY(-50%);
                  transition: all 0.3s;
                  &.show_detail {
                    transform: rotate(90deg);
                    transform-origin: 50% 20%;
                  }
                }
              }
            }
            .follow-detail-enter, .follow-detail-leave-to {
              transform: translateY(-100%);
            }
            .follow-detail-enter-active, .follow-detail-leave-active {
              transition: all 0.5s;
            }
            .detail-box {
              overflow: hidden;
              .detail {
                overflow: hidden;
                padding: 10px 20px;
                display: flex;
                .author-img {
                  width: 40px;
                  height: 40px;
                  border-radius: 50%;
                }
                .author-desc {
                  flex: 1;
                  box-sizing: border-box;
                  padding-left: 15px;
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
          }
        }
      }
    }
  }
</style>
