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

//获取所有审核通过的作品
export function postFindAllIdea(data = {}) {
  return fetch(Object.assign({
    url: '/idea/findAllIdea',
    method: 'post',
    data: data
  }))
}

//删除作品
export function postDelIdea(data = {}) {
  return fetch(Object.assign({
    url: '/idea/delIdea',
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

//获取所有推荐作品
export function postFindAllRecommend(data = {}) {
  return fetch(Object.assign({
    url: '/recommend_list/findAllRecommend',
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

//取消关注
export function postDelFocus(data = {}) {
  return fetch(Object.assign({
    url: '/users/delFocus',
    method: 'post',
    data: data
  }))
}

//通过用户id数组查找多个用户信息
export function postFindArrayIdUser(data = {}) {
  return fetch(Object.assign({
    url: '/users/findArrayIdUser',
    method: 'post',
    data: data
  }))
}

//通过用户id数组查找多个用户的作品
export function postFindArrayIdIdea(data = {}) {
  return fetch(Object.assign({
    url: '/idea/findArrayIdIdea',
    method: 'post',
    data: data
  }))
}

//通过作品id数组查找多个作品信息
export function postFindArrayIdea(data = {}) {
  return fetch(Object.assign({
    url: '/idea/findArrayIdea',
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

//模糊搜索
export function postFindIdeaName(data = {}) {
  return fetch(Object.assign({
    url: '/idea/findIdeaName',
    method: 'post',
    data: data
  }))
}

//添加历史记录
export function postAddHistory(data = {}) {
  return fetch(Object.assign({
    url: '/history/addHistory',
    method: 'post',
    data: data
  }))
}

//查找所有历史记录
export function postFindAllHistory(data = {}) {
  return fetch(Object.assign({
    url: '/history/findAllHistory',
    method: 'post',
    data: data
  }))
}

//删除历史记录
export function postDeleteHistory(data = {}) {
  return fetch(Object.assign({
    url: '/history/delHistory',
    method: 'post',
    data: data
  }))
}

//更新点赞数
export function postUpdateLikeNum(data = {}) {
  return fetch(Object.assign({
    url: '/idea/updateLikeNum',
    method: 'post',
    data: data
  }))
}

//增加点赞用户
export function postAddLikeUser(data = {}) {
  return fetch(Object.assign({
    url: '/idea/addLikeUser',
    method: 'post',
    data: data
  }))
}

//减少点赞用户
export function postReduceLikeUser(data = {}) {
  return fetch(Object.assign({
    url: '/idea/reduceLikeUser',
    method: 'post',
    data: data
  }))
}

//添加收藏
export function postAddCollection(data = {}) {
  return fetch(Object.assign({
    url: '/users/addCollection',
    method: 'post',
    data: data
  }))
}

//删除收藏
export function postDelCollection(data = {}) {
  return fetch(Object.assign({
    url: '/users/delCollection',
    method: 'post',
    data: data
  }))
}

//更新访问量
export function postUpdateReadNum(data = {}) {
  return fetch(Object.assign({
    url: '/idea/updateReadNum',
    method: 'post',
    data: data
  }))
}

//添加足迹
export function postAddFootprint(data = {}) {
  return fetch(Object.assign({
    url: '/users/addFootprint',
    method: 'post',
    data: data
  }))
}

//删除足迹
export function postDelFootprint(data = {}) {
  return fetch(Object.assign({
    url: '/users/delFootprint',
    method: 'post',
    data: data
  }))
}

//上传举报
export function postAddReport(data = {}) {
  return fetch(Object.assign({
    url: '/report_list/addReport',
    method: 'post',
    data: data
  }))
}