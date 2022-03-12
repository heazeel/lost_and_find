<!--
 * @Description:
 * @Author: hezhijie
 * @Date: 2021-04-02 00:47:58
 * @LastEditors: hezhijie
 * @LastEditTime: 2021-04-21 13:03:01
-->
<template>
  <a-drawer
    :destroy-on-close="true"
    placement="left"
    :closable="false"
    :visible="visible"
    :width="1500"
    :body-style="{
      padding: '0px',
    }"
    :after-visible-change="afterVisibleChange"
    @close="onClose"
  >
    <a-row>
      <a-col :span="18" style="height: 100vh; overflow: auto;">
        <a-carousel arrows>
          <div
            slot="prevArrow"
            class="custom-slick-arrow"
            style="left: 10px;zIndex: 1"
          >
            <a-icon type="left-circle" />
          </div>
          <div slot="nextArrow" class="custom-slick-arrow" style="right: 10px">
            <a-icon type="right-circle" />
          </div>
          <div
            v-for="(item, index) in detailData.photos.split(',')"
            :key="index"
          >
            <img :src="item" />
          </div>
        </a-carousel>
        <div id="vcomments"></div>
      </a-col>
      <a-col id="goods-info-container" :span="6">
        <div id="person-info-container">
          <div id="person-info">
            <img src="@/assets/imgs/book.png" />
            <div id="person-detail">
              <span id="user-name">{{ detailData.userName }}</span>
              <span id="user-account">{{ detailData.userId }}</span>
            </div>
          </div>
          <a-button
            id="connect-btn"
            :style="detailData.userId == userId ? 'visibility: hidden;' : ''"
            type="primary"
            @click="onChildrenDrawerOpen(detailData.userId)"
          >
            联系
          </a-button>
        </div>
        <a-divider />
        <div class="goods-info">
          <h1>标题</h1>
          <ul>
            <li>
              <img
                src="https://lost-and-find.oss-cn-hangzhou.aliyuncs.com/local-img/btn-back3.jpg"
              />
              <div class="content">
                <p>{{ detailData.title }}</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="goods-info">
          <h1>物品信息</h1>
          <ul>
            <li>
              <img
                src="https://lost-and-find.oss-cn-hangzhou.aliyuncs.com/local-img/btn-back1.jpg"
              />
              <div class="content">
                <p>{{ detailData.type }}</p>
              </div>
            </li>
            <li>
              <img
                src="https://lost-and-find.oss-cn-hangzhou.aliyuncs.com/local-img/btn-back2.jpg"
              />
              <div class="content">
                <p>{{ detailData.description }}</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="goods-info">
          <h1>位置信息</h1>
          <ul>
            <li>
              <img
                src="https://lost-and-find.oss-cn-hangzhou.aliyuncs.com/local-img/btn-back4.jpg"
              />
              <div class="content">
                <p>{{ detailData.positionArea }}</p>
              </div>
            </li>
            <li>
              <img
                src="https://lost-and-find.oss-cn-hangzhou.aliyuncs.com/local-img/btn-back5.jpg"
              />
              <div class="content">
                <p>{{ detailData.positionDetail }}</p>
              </div>
            </li>
          </ul>
        </div>
      </a-col>
    </a-row>
    <a-drawer
      :closable="false"
      placement="left"
      :width="450"
      :body-style="{
        padding: '0px',
        height: '100%',
      }"
      :visible="childrenDrawer"
      :after-visible-change="afterChildrenVisibleChange"
      @close="onChildrenDrawerClose"
    >
      <!-- <Chat /> -->
      <Message ref="messageList" :signal="true" />
    </a-drawer>
  </a-drawer>
</template>
<script>
import Valine from "valine";
import Message from "@/components/chat/message";
import { mapActions, mapGetters } from "vuex";
import { post } from "@/api/axios"; // 导入http中创建的axios实例
export default {
  components: {
    Message,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    detailData: {
      type: Object,
      default: () => {
        Object.create({ title: null, photos: "" });
      },
    },
  },
  data() {
    return {
      childrenDrawer: false,
      signal: true,
      userId: null,
    };
  },
  created() {
    // console.log('created');
    // console.log(this.detailData);
    this.userId = localStorage.getItem("userId");
  },
  mounted() {
    // console.log(this.detailData);
  },
  methods: {
    ...mapActions(["addfirend"]),
    afterVisibleChange(val) {
      this.initValine();
    },
    afterChildrenVisibleChange(val) {
      const option = {
        id: this.detailData.userId, // 联系人id
        params: localStorage.getItem("userInfo").userId, // 自己的id
      };
      this.addfirend(option);
      this.$refs.messageList.select({ name: this.detailData.userId });
    },
    async onChildrenDrawerOpen(userId) {
      if (localStorage.getItem("userId") !== null) {
        this.childrenDrawer = true;
        // let url = '/sendEmail';
        // const res = await post(url, { userId: userId, _method: 'PUT'});
      } else {
        this.$message.warning("请先登录！");
      }
    },
    onChildrenDrawerClose() {
      this.childrenDrawer = false;
    },
    onClose() {
      this.$emit("close");
    },
    initValine() {
      let self = this;
      new Valine({
        el: "#vcomments",
        appId: "URmdycfso0YukNoucAfLUw4e-gzGzoHsz",
        appKey: "YIjBiPpilaNgOV2mv8oDL3gz",
        placeholder: "有线索的小伙伴快举个爪！",
        visitor: true,
        avatar: "wavatar",
        path: self.detailData.goodsId,
        // path: self.detailData.goodsId,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .ant-drawer-content-wrapper {
  .ant-drawer-content {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  .ant-carousel {
    .slick-slide {
      text-align: center;
      height: 68vh;
      line-height: 68vh;
      background: #000;
      overflow: hidden;
      img {
        width: auto;
        height: 68vh;
        margin: auto;
        object-fit: cover;
      }
    }
    .custom-slick-arrow {
      width: 35px;
      height: 35px;
      font-size: 35px;
      color: #fff;
      opacity: 0.4;
      background-color: #000;
      border-radius: 35px;
    }
    .custom-slick-arrow:before {
      display: none;
    }
    .custom-slick-arrow:hover {
      opacity: 0.7;
    }
    .custom-slick-arrow:hover {
      opacity: 0.7;
    }
  }
  #goods-info-container {
    overflow: hidden;
    border-left: 1px solid #e8e8e8;
    height: 100vh;
    #person-info-container {
      display: flex;
      align-items: center;
      padding: 15px;
      justify-content: space-around;
      #person-info {
        display: flex;
        align-items: center;
        img {
          width: 50px;
          height: 50px;
          border-radius: 25px;
          margin: 10px 15px 10px 0px;
          object-fit: cover;
        }
        #person-detail {
          display: flex;
          flex-direction: column;
          #user-name {
            font-size: 18px;
            font-weight: bold;
            color: #191919;
          }
          #user-account {
            font-size: 14px;
            color: #696969;
          }
        }
      }
      #connect-btn {
        background-color: $mainColor;
        border-radius: 20px;
        border-color: $mainColor;
        &:hover {
          border-color: $mainColor;
          opacity: 0.8;
        }
      }
    }
    .goods-info {
      padding: 20px 30px 0 30px;
      h1 {
        margin-bottom: 10px;
        color: #959595;
      }
      ul {
        li {
          position: relative;
          min-height: 50px;
          height: fit-content;
          height: -moz-fit-content;
          width: 100%;
          // box-sizing: border-box;
          border-radius: 5px;
          overflow: hidden;
          background-color: #330000;
          margin-bottom: 10px;
          img {
            display: block;
            -o-object-fit: cover;
            object-fit: cover;
            overflow: hidden;
            width: 100%;
            height: 100%;
            mix-blend-mode: luminosity;
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            z-index: 1;
          }
          .content {
            height: fit-content;
            height: -moz-fit-content;
            width: 100%;
            position: relative;
            z-index: 10;
            background-color: rgba(0, 0, 0, 0.7);
            padding: 15px 10px;
            p {
              color: #fff;
              font-size: 16px;
              text-align: center;
            }
            &:hover {
              background-color: rgba(0, 0, 0, 0.6);
            }
          }
        }
      }
    }
  }
  #vcomments {
    width: 90%;
    margin: auto;
    margin-top: 40px;
    margin-bottom: 40px;
    box-sizing: border-box;
    .vpanel {
      background-color: #f8f8f8;
      border-radius: 10px;
      padding: 15px 15px 5px 15px;
      margin-bottom: 10px;
      box-shadow: #b4b4b4 0px 0px 10px 0px;
    }
    .vpower {
      display: none;
    }
  }
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.1);
  }
  ::-webkit-scrollbar-track {
    border-radius: 0;
    background: rgba(255, 255, 255, 0.5);
  }
}
</style>
