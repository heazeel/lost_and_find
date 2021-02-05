<!--
 * @Description:
 * @Author: hezhijie
 * @Date: 2021-01-29 21:51:15
 * @LastEditors: hezhijie
 * @LastEditTime: 2021-02-06 01:06:45
-->
<template>
  <div id="home-content">
    <a-layout-content id="main-content">
      <a-card
        v-for="(item, index) in arr"
        :id="`item${index}`"
        :key="index"
        hoverable
        style="transform: translate(0%, 0%)"
      >
        <img
          slot="cover"
          alt="example"
          src="../../../assets/imgs/book.png"
        >
        <a-card-meta title="Europe Street beat">
          <template slot="description">
            {{ index }}
          </template>
        </a-card-meta>
      </a-card>
    </a-layout-content>
  </div>
</template>
<script>
export default {
  name: 'Content',
  data() {
    return {
      timer: false,
      arr: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      screenWidth: document.body.clientWidth
    }
  },
  watch: {
    screenWidth(val) {
    // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
      if (!this.timer) {
        // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
        this.screenWidth = val
        this.timer = true
        const that = this
        const newArr = []
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
          that.timer = false
        }, 500)
      }
    }
  },
  mounted() {
    const that = this
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        that.screenWidth = window.screenWidth
      })()
    }
  },
  methods: {
    listArrangement(arr, section) {
      for (let i = 0; i < this.arr.length; i += section) {
        arr.push(this.arr.slice(i, i + section))
      }
      let count = 0;
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
          document.getElementById('item' + count).style.transform = `translate(${j * 100}%, ${i * 100}%)`;
          count++;
        }
      }
    }
  }
}
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
#home-content{
  overflow: hidden;
  position: relative;
  max-width: 2968px;
  padding: 0px 10px 20px 20px;
  .ant-layout-content{
    position: relative;
    background-color: white;
    overflow: auto;
    height: 100%;
    max-width: 2968px;
    box-sizing: border-box;
    .ant-card{
      position: absolute;
      left: 0;
      top: 0;
      padding: 10px;
      border: none;
      cursor: default;
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
      /deep/ .ant-card-cover{
        height: auto;
        position: relative;
        img{
          width: 100%;
          height: auto;
        }
      }
      /deep/ .ant-card-body{
        position: relative;
        width: calc(100% - 2px);
        min-height: 55px;
        padding: 10px;
        box-shadow: 1px 1px 10px 1px #e8e8e8;
        margin: auto;
      }
    }
  }
}
</style>
