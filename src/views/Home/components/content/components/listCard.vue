<!--
 * @Description:
 * @Author: hezhijie
 * @Date: 2021-02-18 15:00:40
 * @LastEditors: hezhijie
 * @LastEditTime: 2021-05-27 23:02:49
-->
<template>
  <div id="main-content">
    <div id="empty-container">
      <a-empty v-show="isEmpty">
        <span slot="description">暂无数据</span>
      </a-empty>
    </div>
    <ul @click="showDetail">
      <li
        v-for="(item, index) in itemArr"
        :id="`item${index}`"
        :key="item.goodsId"
        class="item-card"
        :data-index="index"
      >
        <a-card>
          <img slot="cover" alt="example" :src="item.photos.split(',')[0]" />
          <a-card-meta id="meta1" :title="item.type"> </a-card-meta>
          <a-card-meta id="meta2" :title="item.title">
            <template slot="description">
              {{ item.date }}
            </template>
          </a-card-meta>
        </a-card>
        <div class="card-mask">
          <p><span>物品描述：</span>{{ item.description }}</p>
          <p><span>区域：</span>{{ item.positionArea }}</p>
          <p><span>详细位置：</span>{{ item.positionDetail }}</p>
          <p><span>发布者：</span>{{ item.userName }}</p>
        </div>
      </li>
    </ul>
    <Drawer :visible="visible" :detail-data="detailData" @close="closeDrawer" />
  </div>
</template>
<script>
import { get } from "@/api/axios"; // 导入http中创建的axios实例
import Drawer from "./drawer";
export default {
  components: {
    Drawer,
  },
  data() {
    return {
      showType: 0, // 0代表列表模式， 1代表地图模式
      timer: false,
      screenWidth: document.body.clientWidth,
      visible: false,
      detailData: {
        photos: "",
      },
      isEmpty: true,
    };
  },
  computed: {
    itemArr() {
      return this.$store.state.goodsItem.itemArr;
    },
  },
  watch: {
    itemArr(val) {
      if (val.length != 0) {
        this.isEmpty = false;
        const that = this;
        const newArr = [];
        this.$nextTick(() => {
          if (that.screenWidth > 1900) {
            that.listArrangement(newArr, 5);
          } else if (that.screenWidth > 1300 && that.screenWidth <= 1900) {
            that.listArrangement(newArr, 4);
          } else if (that.screenWidth > 965 && that.screenWidth <= 1300) {
            that.listArrangement(newArr, 3);
          } else if (that.screenWidth > 665 && that.screenWidth <= 965) {
            that.listArrangement(newArr, 2);
          } else if (that.screenWidth <= 665) {
            that.listArrangement(newArr, 1);
          }
        });
      } else {
        this.isEmpty = true;
      }
    },
  },
  created() {
    this.initData();
  },
  mounted() {
    const that = this;
    window.onresize = () => {
      that.screenWidth = document.body.clientWidth;
      if (!that.timer) {
        // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
        // this.screenWidth = val;
        that.timer = true;
        // const that = this;
        const newArr = [];
        setTimeout(function() {
          if (that.screenWidth > 1900) {
            that.listArrangement(newArr, 5);
          } else if (that.screenWidth > 1300 && that.screenWidth <= 1900) {
            that.listArrangement(newArr, 4);
          } else if (that.screenWidth > 965 && that.screenWidth <= 1300) {
            that.listArrangement(newArr, 3);
          } else if (that.screenWidth > 665 && that.screenWidth <= 965) {
            that.listArrangement(newArr, 2);
          } else if (that.screenWidth <= 665) {
            that.listArrangement(newArr, 1);
          }
          that.timer = false;
        }, 400);
      }
    };
    // this.scroll();
  },
  methods: {
    // 获取物品信息数据
    async initData() {
      const url = "/goods";
      const res = await get(url, {
        ...this.$store.state.goodsItem.searchCriteria,
      });
      this.$store.commit("setGoodsItem", res.content);
    },
    // 列表响应式布局
    listArrangement(newArr, section) {
      for (let i = 0; i < this.itemArr.length; i += section) {
        newArr.push(this.itemArr.slice(i, i + section));
      }
      let count = 0;
      for (let i = 0; i < newArr.length; i++) {
        for (let j = 0; j < newArr[i].length; j++) {
          if (document.getElementById("item" + count)) {
            document.getElementById(
              "item" + count
            ).style.transform = `translate(${j * 100}%, ${i * 100}%)`;
          }
          // this.$refs[`item${count}`].style = `transform: translate(${j * 100}%, ${i * 100}%)`;
          count++;
        }
      }
    },
    scroll() {
      document.getElementsByClassName("ant-layout-content")[0].addEventListener(
        "scroll",
        this.$tools.throttle(function() {
          var scrollTop = document.getElementsByClassName(
            "ant-layout-content"
          )[0].scrollTop;
          if (scrollTop <= 200) {
            document.getElementById("search").className = "search-down";
            document.getElementById("filter-btn").className = "filter-btn-down";
            document.getElementsByClassName(
              "ant-layout-header"
            )[0].style.height = "216px";
            document.getElementById("home-header").style["box-shadow"] =
              "0px 2px 2px #F2F2F2";
            document.getElementById("home-content").style.top = "217px";
          } else {
            document.getElementById("search").className = "search-up";
            document.getElementById("filter-btn").className = "filter-btn-up";
            document.getElementsByClassName(
              "ant-layout-header"
            )[0].style.height = "140px";
            document.getElementById("home-content").style.top = "140px";
            document.getElementById("home-header").style["box-shadow"] =
              "0px 2px 8px 1px #CCC";
          }
        }, 50),
        false
      );
    },
    showDetail(e) {
      this.visible = true;
      if (e.target.offsetParent.nodeName.toLowerCase() === "li") {
        const index = parseInt(e.target.offsetParent.dataset.index);
        this.detailData = this.itemArr[index];
      }
    },
    closeDrawer() {
      this.visible = false;
    },
  },
};
</script>
<style lang="scss" scoped>
@mixin screen($sWidth) {
  @if $sWidth == level1 {
    @media screen and (min-width: 1900px) {
      @content;
    }
  }
  @if $sWidth == level2 {
    @media screen and (max-width: 1900px) {
      @content;
    }
  } @else if $sWidth == level3 {
    @media screen and (max-width: 1300px) {
      @content;
    }
  } @else if $sWidth == level4 {
    @media screen and (max-width: 965px) {
      @content;
    }
  } @else if $sWidth == level5 {
    @media screen and (max-width: 665px) {
      @content;
    }
  }
}
#main-content {
  position: relative;
  background-color: rgb(255, 255, 255);
  // overflow: auto;
  height: 100%;
  max-width: 2968px;
  box-sizing: border-box;
  margin: 14px 15px 0px 20px;
  #empty-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .ant-empty {
      transform: translateY(-50px);
    }
  }
  .item-card {
    position: absolute;
    transition: transform 0.3s ease;
    left: 0;
    top: 0;
    border: none;
    cursor: pointer;
    @include screen(level1) {
      width: 20%;
    }
    @include screen(level2) {
      width: 25%;
    }
    @include screen(level3) {
      width: 33.3333%;
    }
    @include screen(level4) {
      width: 50%;
    }
    @include screen(level5) {
      width: 100%;
    }
    &::before {
      content: "";
      padding-top: 95%;
      float: left;
    }
    &::after {
      content: "";
      display: block;
      clear: both;
    }
    .ant-card {
      border: 0px;
      height: 100%;
      width: 95%;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      ::v-deep .ant-card-cover {
        // height: 280px;
        height: 80%;
        position: relative;
        // overflow: hidden;
        img {
          height: 100%;
          width: 100%;
          object-fit: cover;
          border-radius: 5px;
          filter: none;
        }
      }
      ::v-deep .ant-card-body {
        position: relative;
        // width: calc(100% - 2px);
        // min-height: 55px;
        height: 20%;
        padding: 10px;
        // box-shadow: 1px 1px 10px 1px #e8e8e8;
        margin: auto;
        #meta1 {
          .ant-card-meta-title {
            text-align: start;
            color: #000;
            font-size: 20px;
            font-weight: bold;
          }
        }
        #meta2 {
          font-size: 16px;
          margin-top: 5px;
          .ant-card-meta-title {
            float: left;
          }
          .ant-card-meta-description {
            float: right;
          }
        }
      }
    }
    .card-mask {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      margin: auto;
      width: calc(100% - 20px);
      height: 80%;
      background-color: rgba(0, 0, 0, 0.3);
      transition: opacity ease 0.3s;
      opacity: 0;
      border-radius: 5px;
      color: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      font-size: 16px;
      span {
        color: #fff;
        font-weight: bold;
        font-size: 18px;
      }
    }
  }
  .item-card:hover > .card-mask {
    opacity: 1;
  }
  .item-card:hover > .ant-card > .ant-card-cover > img {
    filter: blur(3px);
  }
}
</style>
