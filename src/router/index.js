import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '../components/homePage/HomePage.vue'
import AllPage from '../components/allPage/AllPage.vue'
import AuthorPage from '../components/allPage/AuthorPage.vue'
import MePage from '../components/mePage/MePage.vue'
import ImgTextPage from '../components/allCategoryPage/ImgTextPage.vue'
import ArticlePage from '../components/allCategoryPage/ArticlePage.vue'
import QuestionPage from '../components/allCategoryPage/QuestionPage.vue'
import MusicPage from '../components/allCategoryPage/MusicPage.vue'
import FilmPage from '../components/allCategoryPage/FilmPage.vue'
import ImgTextDetail from '../components/detailPage/ImgTextDetail.vue'
import ArticleDetail from '../components/detailPage/ArticleDetail.vue'
import QuestionDetail from '../components/detailPage/QuestionDetail.vue'
import MusicDetail from '../components/detailPage/MusicDetail.vue'
import FilmDetail from '../components/detailPage/FilmDetail.vue'
import SearchResultPage from '../components/searchPage/SearchResultPage.vue'
import SearchResultDetail from '../components/searchPage/SearchResultDetail.vue'
import RegisterView from '../components/loginAndregister/RegisterView.vue'
import LoginView from '../components/loginAndregister/LoginView.vue'
import ArticleCollect from '../components/collectPage/ArticleCollect.vue'
import FilmCollect from '../components/collectPage/FilmCollect.vue'
import ImgCollect from '../components/collectPage/ImgCollect.vue'
import MusicCollect from '../components/collectPage/MusicCollect.vue'
import QuestionCollect from '../components/collectPage/QuestionCollect.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/all',
      name: 'AllPage',
      component: AllPage
    },
    {
      path: '/me',
      name: 'MePage',
      component: MePage
    },
    {
      path: '/one',
      name: 'ImgTextPage',
      component: ImgTextPage
    },
    {
      path: '/article',
      name: 'ArticlePage',
      component: ArticlePage
    },
    {
      path: '/question',
      name: 'QuestionPage',
      component: QuestionPage
    },
    {
      path: '/music',
      name: 'MusicPage',
      component: MusicPage
    },
    {
      path: '/film',
      name: 'FilmPage',
      component: FilmPage
    },
    {
      path: '/register',
      name: 'RegisterView',
      component: RegisterView
    },
    {
      path: '/login',
      name: 'LoginView',
      component: LoginView
    },
    {
      path: '/search',
      name: 'SearchResultPage',
      component: SearchResultPage,
      children: [
        {
          path: '/search/:name',
          name: 'SearchResultDetail',
          component: SearchResultDetail
        }
      ]
    },
    {
      path: '/author/:id',
      name: 'AuthorPage',
      component: AuthorPage
    },
    {
      path: '/one/:id',
      name: 'ImgTextDetail',
      component: ImgTextDetail
    },
    {
      path: '/article/:id',
      name: 'ArticleDetail',
      component: ArticleDetail
    },
    {
      path: '/question/:id',
      name: 'QuestionDetail',
      component: QuestionDetail
    },
    {
      path: '/music/:id',
      name: 'MusicDetail',
      component: MusicDetail
    },
    {
      path: '/film/:id',
      name: 'FilmDetail',
      component: FilmDetail
    },
    {
      path: '/collect/article',
      name: 'ArticleCollect',
      component: ArticleCollect
    },
    {
      path: '/collect/film',
      name: 'FilmCollect',
      component: FilmCollect
    },
    {
      path: '/collect/one',
      name: 'ImgCollect',
      component: ImgCollect
    },
    {
      path: '/collect/music',
      name: 'MusicCollect',
      component: MusicCollect
    },
    {
      path: '/collect/question',
      name: 'QuestionCollect',
      component: QuestionCollect
    }
  ]
})
