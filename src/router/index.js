import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/frame/Index'
Vue.use(Router)

const _import = require('./_import')

export default new Router({
  routes: [
    //底部导航
    {
      path: '/',
      name: '',
      component: Index,
      redirect: '/home',
      children: [
        //首页
        {
          path: 'home',
          name: 'home',
          component: _import('Home')
        },
        //发现
        {
          path: 'found',
          name: 'found',
          component: _import('Found')
        },
        //消息
        {
          path: 'news',
          name: 'news',
          component: _import('News')
        },
        //我的
        {
          path: 'my',
          name: 'my',
          component: _import('My')
        }
      ]
    },
    //搜索
    {
      path: '/search',
      name: 'search',
      component: _import('Search')
    },
    //上传弹出
    {
      path: '/uploadPopup',
      name: 'uploadPopup',
      component: _import('uploadPage/UploadPopup')
    },
    //上传文章
    {
      path: '/uploadArticle',
      name: 'uploadArticle',
      component: _import('uploadPage/UploadArticle')
    },
    //上传图片
    {
      path: '/uploadPhoto',
      name: 'uploadPhoto',
      component: _import('uploadPage/UploadPhoto')
    },
    //上传音乐
    {
      path: '/uploadMusic',
      name: 'uploadMusic',
      component: _import('uploadPage/UploadMusic')
    },
    //上传视频
    {
      path: '/uploadVideo',
      name: 'uploadVideo',
      component: _import('uploadPage/UploadVideo')
    },
    //文章列表
    {
      path: '/articleList',
      name: 'articleList',
      component: _import('typeListPage/ArticleList')
    },
    //图片列表
    {
      path: '/photoList',
      name: 'photoList',
      component: _import('typeListPage/PhotoList')
    },
    //音乐列表
    {
      path: '/musicList',
      name: 'musicList',
      component: _import('typeListPage/MusicList')
    },
    //视频列表
    {
      path: '/videoList',
      name: 'videoList',
      component: _import('typeListPage/VideoList')
    },
    //文章详情
    {
      path: '/articlePage',
      name: 'articlePage',
      component: _import('detailPage/ArticlePage')
    },
    //图片详情
    {
      path: '/photoPage',
      name: 'photoPage',
      component: _import('detailPage/PhotoPage')
    },
    //音乐详情
    {
      path: '/musicPage',
      name: 'musicPage',
      component: _import('detailPage/MusicPage')
    },
    //视频详情
    {
      path: '/videoPage',
      name: 'videoPage',
      component: _import('detailPage/VideoPage')
    },
    //聊天
    {
      path: '/chatPage',
      name: 'chatPage',
      component: _import('detailPage/ChatPage')
    },
    //登录
    {
      path: '/login',
      name: 'login',
      component: _import('Login')
    },
    //注册
    {
      path: '/register',
      name: 'register',
      component: _import('Register')
    },
    //忘记密码（1）
    {
      path: '/forgetPasswordFirst',
      name: 'forgetPasswordFirst',
      component: _import('forgetPasswordPage/ForgetPasswordFirst')
    },
    //忘记密码（2）
    {
      path: '/forgetPasswordSecond',
      name: 'forgetPasswordSecond',
      component: _import('forgetPasswordPage/ForgetPasswordSecond')
    },
    //个人主页
    {
      path: '/userCenter',
      name: 'userCenter',
      component: _import('detailPage/UserCenter')
    },
    //编辑资料
    {
      path: '/editInfo',
      name: 'editInfo',
      component: _import('detailPage/EditInfo')
    },
    //关注
    {
      path: '/focusPage',
      name: 'focusPage',
      component: _import('detailPage/FocusPage')
    }
  ]
})
