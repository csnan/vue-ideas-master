<template>
  <div class="homeFocus">
    <div 
      :class="index == 0 ? 'home-first-cell-wrap':'home-cell-wrap'"
      v-for="(cell, index) in cellListCircle"
      :key="index"
    >
      <van-cell class="home-cell-top" :title="cell.name" :label="cell.time" :border="false" center>
        <div class="head-image" slot="icon">
          <img :src="cell.headImg">
        </div>
        <van-button 
          class="focus-button"
          v-if="cell.focus == 1" 
          slot="right-icon" 
          size="small" 
          type="primary"
          @click="onFocus(index, cell.focus)" 
          plain
        >+ 关注</van-button>
      </van-cell>
      <div class="home-cell-bottom">
        <div class="home-cell-bottom-content">{{cell.content}}</div>
        <div class="home-cell-bottom-image">
          <img :src="cell.contentImg">
        </div>
        <van-row class="home-cell-bottom-foot">
          <van-col span="6">
            <img src="../../assets/images/share.png">
            <span>{{cell.forwardNum}}</span>
          </van-col>
          <van-col span="6">
            <img src="../../assets/images/comment2.png">
            <span>{{cell.commentNum}}</span>
          </van-col>
          <van-col span="6">
            <img src="../../assets/images/like.png">
            <span>{{cell.likeNum}}</span>
          </van-col>
          <van-col class="foot-more" span="6">
            <van-icon 
              name="ellipsis" 
              color="rgb(180, 180, 180)"
              @click="onPopup(index)"
            />
          </van-col>
        </van-row>
      </div>
      <van-popup v-model="cell.show"> 
        <van-cell-group>
          <!-- <van-cell title="不再看到此条微博" @click="onDelete(index)"/>
          <van-cell title="减少此人的微博" />
          <van-cell title="标题党、假新闻" />
          <van-cell title="投诉" /> -->
          <van-cell 
          v-for="(cellPopup, indexPopup) in cellPopupList"
          :key="indexPopup"
          :title="cellPopup"
          @click="onHandItem(index, indexPopup)"
          />
        </van-cell-group>
      </van-popup>
    </div>
  </div>
</template>

<script>
export default {
  name: 'homeFocus',
  data() {
    return {
      cellListCircle: [
        {
          headImg: require('@/assets/images/1.jpeg'),
          name: 'OKOer1',
          time: '20分钟前',
          content: '阿送给非国大送给颠三倒四单色光单色光单色光速度阿斯顿发送到广东省1231232132111232221232213123123213',
          contentImg: require('@/assets/images/1.jpeg'),
          forwardNum: '16',
          commentNum: '16',
          likeNum: '16',
          focus: 1,
          show: false,
        },
        {
          headImg: require('@/assets/images/1.jpeg'),
          name: 'OKOer2',
          time: '20分钟前',
          content: '阿送给非国大送给颠三倒四单色光单色光单色光速度阿斯顿发送到广东省1231232132111232221232213123123213',
          contentImg: require('@/assets/images/1.jpeg'),
          forwardNum: '16',
          commentNum: '16',
          likeNum: '16',
          focus: 2,
          show: false,
        },
        {
          headImg: require('@/assets/images/1.jpeg'),
          name: 'OKOer3',
          time: '20分钟前',
          content: '阿送给非国大送给颠三倒四单色光单色光单色光速度阿斯顿发送到广东省1231232132111232221232213123123213',
          contentImg: require('@/assets/images/1.jpeg'),
          forwardNum: '16',
          commentNum: '16',
          likeNum: '16',
          focus: 1,
          show: false,
        },
        {
          headImg: require('@/assets/images/1.jpeg'),
          name: 'OKOer4',
          time: '20分钟前',
          content: '阿送给非国大送给颠三倒四单色光单色光单色光速度阿斯顿发送到广东省1231232132111232221232213123123213',
          contentImg: require('@/assets/images/1.jpeg'),
          forwardNum: '16',
          commentNum: '16',
          likeNum: '16',
          focus: 1,
          show: false,
        }
      ],
      cellPopupList: [
        '不再看到此条微博',
        '减少此人的微博',
        '标题党、假新闻',
        '投诉'
      ]
    }
  },
  methods: {
    onFocus(index, focus) {
      if(focus == 1){
        this.cellListCircle[index].focus = 2
      }else{
        this.cellListCircle[index].focus = 1
      }
    },
    onPopup(index) {
      this.cellListCircle[index].show = true
    },
    // onDelete(index) {
    //   this.cellListCircle.splice(index, 1)
    //   //this.show = false
    // },
    onHandItem(index, indexPopup) {
      if(indexPopup == 0) {
        this.cellListCircle.splice(index, 1)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.homeFocus {
  .home-first-cell-wrap {
    margin-bottom: 10px;
    .home-cell-top {
      .head-image {
        width: 40px;
        height: 40px;
        margin-right: 10px;
        border-radius: 50px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .focus-button {
        border: 1px solid rgb(246, 131, 12);
        color: rgb(246, 131, 12);
      }
    }
    .home-cell-bottom {
      padding: 0 15px;
      .home-cell-bottom-content {
        word-break: break-all;
        font-size: 15px;
      }
      .home-cell-bottom-image {
        width: 100%;
        height: 120px;
        position: relative;
        margin-top: 8px;
        overflow: hidden;
        img {
          width: 100%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .home-cell-bottom-foot {
        margin-top: 10px;
        font-size: 12px;
        .foot-more {
          text-align: right;
        }
        img {
          width: 15px;
          height: 15px;
          vertical-align: middle;
        }
        span {
          vertical-align: middle;
          color: rgb(100, 100, 100);
        }
      }
    }
  }
  .home-cell-wrap {
    margin-bottom: 10px;
    border-top: 6px solid rgb(240, 240, 240);
    .home-cell-top {
      .head-image {
        width: 40px;
        height: 40px;
        margin-right: 10px;
        border-radius: 50px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .focus-button {
        border: 1px solid rgb(246, 131, 12);
        color: rgb(246, 131, 12);
      }
    }
    .home-cell-bottom {
      padding: 0 15px;
      .home-cell-bottom-content {
        word-break: break-all;
        font-size: 15px;
      }
      .home-cell-bottom-image {
        width: 100%;
        height: 120px;
        position: relative;
        margin-top: 8px;
        overflow: hidden;
        img {
          width: 100%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .home-cell-bottom-foot {
        margin-top: 10px;
        font-size: 12px;
        .foot-more {
          text-align: right;
        }
        img {
          width: 15px;
          height: 15px;
          vertical-align: middle;
        }
        span {
          vertical-align: middle;
          color: rgb(100, 100, 100);
        }
      }
    }
  }
}
</style>
<style lang="less">
.homeFocus{
  .van-popup {
    width: 80%;
    border-radius: 10px;
  }
  .van-cell__value {
    text-align: left;
  }
}
</style>