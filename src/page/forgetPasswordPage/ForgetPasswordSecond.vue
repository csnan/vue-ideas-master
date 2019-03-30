<template>
  <div id="forgetPasswordSecond">
    <base-header 
      :leftLogo="false" 
      :leftIcon="closeIcon"
      @goBack="toBack" 
      bgColor="rgba(27, 190, 231, 0)"
    ></base-header>
    <vue-particles
      class="particles-js"
      color="#FFB6C1"
      :particleOpacity="0.4"
      linesColor="#E6E6FA"
      :particlesNumber="50"
      shapeType="circle"
      :particleSize="5"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    >
    </vue-particles>
    <div class="form-forgetPasswordSecond">
      <van-field
        :class="isPasswordLight1 ? 'van-field2' : 'van-field'"
        v-model="passwordfirst"
        icon="question-o"
        type="password"
        placeholder="请输入新密码"
        @click-icon="$toast('密码为6-16位，可为数字、大小写字母或下划线和减号')"
        @focus="onPasswordLight1"
        @blur="onPasswordDark1"
      />
      <br>
      <van-field
        :class="isPasswordLight2 ? 'van-field2' : 'van-field'"
        v-model="passwordSecond"
        type="password"
        placeholder="请确认密码"
        @focus="onPasswordLight2"
        @blur="onPasswordDark2"
      />
      <van-button @click="updatePassword">确认</van-button>
    </div>
  </div>
</template>

<script>
import { postUpdatePassword } from "@/api/index"
var h = window.innerHeight
export default {
  name: 'forgetPasswordSecond',
  data() {
    return {
      closeIcon: require('@/assets/images/close.png'),
      isPasswordLight1: false,
      isPasswordLight2: false,
      passwordfirst: '',
      passwordSecond: ''
    }
  },
  mounted() {
    var forgetPasswordSecond = document.getElementById('forgetPasswordSecond')
  },
  methods: {
    toBack() {
      this.$router.go(-1)
    },
    onPasswordLight1() {
      this.isPasswordLight1 = true
      forgetPasswordSecond.style.height = h + 'px'
    },
    onPasswordDark1() {
      this.isPasswordLight1 = false
    },
    onPasswordLight2() {
      this.isPasswordLight2 = true
      forgetPasswordSecond.style.height = h + 'px'
    },
    onPasswordDark2() {
      this.isPasswordLight2 = false
    },
    updatePassword() {
      if (this.passwordfirst == '') {
        this.$toast('新密码不能为空')
      } else if (!(/^[\w_-]{6,16}$/.test(this.passwordfirst))) {
        this.$toast('请输入正确的密码格式')
      } else if (this.passwordSecond == '') {
        this.$toast('请确认密码')
      } else if (this.passwordSecond != this.passwordfirst) {
        this.$toast('密码必须保持一致')
      } else {
        postUpdatePassword({
          userId: this.$route.query.userId,
          password: this.passwordSecond
        }).then(res => {
          if(res.success) {
            this.$toast.success('修改成功')
            this.$router.push('/login')
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
#forgetPasswordSecond{
  position: absolute;
  width: 100%;
  height: 100%;
  .particles-js {
    background: url('../../assets/images/bg.png') no-repeat;
    background-size: 100%; 
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .form-forgetPasswordSecond {
    width: 90%;
    position: relative;
    margin: 120px auto;
    .van-field {
      border: 1px solid rgb(226, 226, 226);
      background-color: rgba(255, 255, 255, 0.8);
    }
    .van-field2 {
      border: 1px solid @base-color;
      background-color: rgba(255, 255, 255, 0.8);
    }
    .van-button {
      width: 100%;
      margin-top: 15px;
      background-color: rgba(27, 190, 231, 0.8);
      color: rgb(255, 255, 255);
      letter-spacing: 8px;
      font-size: 15px;
      box-shadow: 0px 2px 10px #bbbbbb;
      border: none;
    }
  }
}
</style>

