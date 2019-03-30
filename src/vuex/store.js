import Vue  from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idData: '', //用户数据库的Id（唯一）
    userIdData: '', //手机号
    passwordData: '',  //密码
    memberData: false, //用户登陆成功后的数据
    headImgData: require('@/assets/images/defaultImg.jpg'),  //用户头像
    coverImgData: require('@/assets/images/defaultImg.jpg'),  //个人主页背景
    usernameData: '',  //用户昵称
    sexData: 'male',  //用户性别
    introductionData: '一个有想法的人',  //个人简介
    focusData: [],  //关注
    focusNumData: 0  //关注数
  },
  mutations: {
    upDateMemberData (state) {
      state.memberData = true
    }
  }
})
