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
    //文章详情
    {
      path: '/articlePage',
      name: 'articlePage',
      component: _import('detailPage/ArticlePage')
    },
    //视频详情
    {
      path: '/videoPage',
      name: 'videoPage',
      component: _import('detailPage/VideoPage')
    },
    //音乐详情
    {
      path: '/musicPage',
      name: 'musicPage',
      component: _import('detailPage/MusicPage')
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
    }
  ]
})
