import fetch from '@/utils/fetch'

// 用户注册
export function postRegister(data = {}) {
  return fetch(Object.assign({
    url: '/users/register',
    method: 'post',
    data: data
  }))
}

// 用户登录
export function postLogin(data = {}) {
  return fetch(Object.assign({
    url: '/users/login',
    method: 'post',
    data: data
  }))
}

// 用户修改密码
export function postUpdatePassword(data = {}) {
  return fetch(Object.assign({
    url: '/users/updatePassword',
    method: 'post',
    data: data
  }))
}

//获取用户资料信息
export function postObtainUserInfo(data = {}) {
  return fetch(Object.assign({
    url: '/users/findUserInfo',
    method: 'post',
    data: data
  }))
}

//修改更新用户资料信息
export function postUpdateUserInfo(data = {}) {
  return fetch(Object.assign({
    url: '/users/updateUserInfo',
    method: 'post',
    data: data
  }))
}

//修改更新用户头像
export function postUpdateHeadImg(data = {}) {
  return fetch(Object.assign({
    url: '/upload/uploadHeadImg',
    method: 'post',
    data: data
  }))
}

//修改更新个人主页背景
export function postUpdateCoverImg(data = {}) {
  return fetch(Object.assign({
    url: '/upload/uploadCoverImg',
    method: 'post',
    data: data
  }))
}

//上传发布作品(图片除外)
export function postAddIdea(data = {}) {
  return fetch(Object.assign({
    url: '/upload/uploadIdea',
    method: 'post',
    data: data
  }))
}

//上传发布图片
export function postAddPhoto(data = {}) {
  return fetch(Object.assign({
    url: '/upload/uploadIdea/photo',
    method: 'post',
    data: data
  }))
}

//获取首页轮播图
export function postFindSwipeImages(data = {}) {
  return fetch(Object.assign({
    url: '/swipe_list/findAllSwipe',
    method: 'post',
    data: data
  }))
}

//获取首页推荐作品
export function postFindRecommendType(data = {}) {
  return fetch(Object.assign({
    url: '/idea/findRecommendType',
    method: 'post',
    data: data
  }))
}

//获取相对应的作品类型
export function postFindIdeaType(data = {}) {
  return fetch(Object.assign({
    url: '/idea/findIdeaType',
    method: 'post',
    data: data
  }))
}

//获取作品详情页
export function postFindOneIdea(data = {}) {
  return fetch(Object.assign({
    url: '/idea/findOneIdea',
    method: 'post',
    data: data
  }))
}

//获取用户对应的作品
export function postFindAuthorIdea(data = {}) {
  return fetch(Object.assign({
    url: '/idea/findAuthorIdea',
    method: 'post',
    data: data
  }))
}

//添加关注
export function postAddFocus(data = {}) {
  return fetch(Object.assign({
    url: '/users/addFocus',
    method: 'post',
    data: data
  }))
}

//发布评论
export function postAddComment(data = {}) {
  return fetch(Object.assign({
    url: '/comment/addComment',
    method: 'post',
    data: data
  }))
}