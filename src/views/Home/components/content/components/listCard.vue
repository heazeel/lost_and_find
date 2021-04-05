<!--
 * @Description:
 * @Author: hezhijie
 * @Date: 2021-02-18 15:00:40
 * @LastEditors: hezhijie
 * @LastEditTime: 2021-04-04 13:34:23
-->
<template>
  <a-layout-content
    id="main-content">
    <div v-for="(item, index) in itemArr"
      :id="`item${index}`"
      :key="index"
      class="item-card"
      @click="showDetail(item)">
      <a-card
        style="transform: translate(0%, 0%)"
        :body-style="{}">
        <img
          slot="cover"
          alt="example"
          :src="item.photos.split(',')[0]">
        <a-card-meta id="meta1" :title="item.type">
        </a-card-meta>
        <a-card-meta id="meta2" :title="item.title">
          <template slot="description">
            {{ item.date }}
          </template>
        </a-card-meta>
      </a-card>
      <div class="card-mask">
        <p>{{ item.description }}</p>
        <p>{{ item.positionArea }}</p>
        <p>{{ item.positionDetail }}</p>
        <p>{{ item.userName }}</p>
      </div>
    </div>
    <Drawer :visible="visible" :detail-data="detailData" @close="closeDrawer" />
  </a-layout-content>
</template>
<script>
import { get } from '@/api/axios'; // 导入http中创建的axios实例
import Drawer from './drawer';
export default {
  components: {
    Drawer: () => import('./drawer'),
  },
  data () {
    return {
      showType: 0, // 0代表列表模式， 1代表地图模式
      timer: false,
      screenWidth: document.body.clientWidth,
      itemArr: this.$store.state.goodsItem.itemArr,
      visible: false,
      detailData: {
        photos: '',
      },
    };
  },
  watch: {
    'screenWidth': {
      handler (val) {
      // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
        if (!this.timer) {
          // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
          this.screenWidth = val;
          this.timer = true;
          const that = this;
          const newArr = [];
          setTimeout(function () {
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
      },
      immediate: true,
    },
  },
  created () {
    this.init();
  },
  mounted () {
    const that = this;
    window.onresize = () => {
      window.screenWidth = document.body.clientWidth;
      that.screenWidth = window.screenWidth;
    };
    this.scroll();
  },
  methods: {
    async init () {
      const url = this.HOME + '/goods';
      const res = await get(url, { ...this.$store.state.goodsItem.searchCriteria });
      this.$store.commit('setGoodsItem', res.content);
      this.itemArr = this.$store.state.goodsItem.itemArr;
    },
    listArrangement (itemArr, section) {
      for (let i = 0; i < this.itemArr.length; i += section) {
        itemArr.push(this.itemArr.slice(i, i + section));
      }
      let count = 0;
      for (let i = 0; i < itemArr.length; i++) {
        for (let j = 0; j < itemArr[i].length; j++) {
          document.getElementById('item' + count).style.transform = `translate(${j * 100}%, ${i * 100}%)`;
          count++;
        }
      }
    },
    scroll () {
      document.getElementsByClassName('ant-layout-content')[0].addEventListener('scroll', this.$tools.throttle(function () {
        var scrollTop = document.getElementsByClassName('ant-layout-content')[0].scrollTop;
        if (scrollTop <= 200) {
          document.getElementById('search').className = 'search-down';
          document.getElementById('filter-btn').className = 'filter-btn-down';
          document.getElementsByClassName('ant-layout-header')[0].style.height = '216px';
          document.getElementById('home-header').style['box-shadow'] = '0px 2px 2px #F2F2F2';
          document.getElementById('home-content').style.top = '217px';
        } else {
          document.getElementById('search').className = 'search-up';
          document.getElementById('filter-btn').className = 'filter-btn-up';
          document.getElementsByClassName('ant-layout-header')[0].style.height = '140px';
          document.getElementById('home-content').style.top = '140px';
          document.getElementById('home-header').style['box-shadow'] = '0px 2px 8px 1px #CCC';
        }
      }, 50), false);
    },
    showDetail (val) {
      this.visible = true;
      this.detailData = val;
      console.log(val);
    },
    closeDrawer () {
      this.visible = false;
    },
  },
};
</script>
<style lang="scss" scoped>
@mixin screen($sWidth) {
  @if $sWidth == level1 {
    @media screen and (min-width: 1900px) { @content; }
  }
  @if $sWidth == level2 {
    @media screen and (max-width: 1900px) { @content; }
  }
  @else if $sWidth == level3 {
    @media screen and (max-width: 1300px) { @content; }
  }
  @else if $sWidth == level4 {
    @media screen and (max-width: 965px) { @content; }
  }
  @else if $sWidth == level5 {
     @media screen and (max-width: 665px) { @content; }
  }
}
.ant-layout-content{
  position: relative;
  background-color: rgb(255, 255, 255);
  overflow: auto;
  height: 100%;
  max-width: 2968px;
  box-sizing: border-box;
  margin: 0px 10px 0px 20px;
  .item-card{
    position: absolute;
    left: 0;
    top: 0;
    padding: 10px;
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
    .ant-card{
      border: 0px;
      /deep/ .ant-card-cover{
        height: 280px;
        position: relative;
        img{
          object-fit: fill;
          border-radius: 5px;
          filter: none;
        }
      }
      /deep/ .ant-card-body{
        position: relative;
        // width: calc(100% - 2px);
        min-height: 55px;
        padding: 10px;
        // box-shadow: 1px 1px 10px 1px #e8e8e8;
        margin: auto;
        #meta1{
          .ant-card-meta-title{
            text-align: start;
            color: #000;
            font-size: 20px;
            font-weight: bold;
          }
        }
        #meta2{
          font-size: 16px;
          margin-top: 5px;
          .ant-card-meta-title{
            float: left;
          }
          .ant-card-meta-description{
            float: right;
          }
        }
      }
    }
    .card-mask{
      position: absolute;
      top: 10px;
      left: 0;
      right: 0;
      margin: auto;
      width: calc(100% - 20px);
      height: 280px;
      background-color: rgba(0,0,0,0.3);
      transition: opacity ease 0.3s;
      opacity: 0;
      border-radius: 5px;
      color: white;
    }
  }
  .item-card:hover > .card-mask{
    opacity: 1;
  }
  .item-card:hover > .ant-card > .ant-card-cover > img{
    filter: blur(3px);
  }
}
</style>
