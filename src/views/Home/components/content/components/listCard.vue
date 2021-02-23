<!--
 * @Description:
 * @Author: hezhijie
 * @Date: 2021-02-18 15:00:40
 * @LastEditors: hezhijie
 * @LastEditTime: 2021-02-18 15:16:59
-->
<template>
  <a-layout-content
    id="main-content"
  >
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
        src="../../../../../assets/imgs/book.png"
      >
      <a-card-meta title="Europe Street beat">
        <template slot="description">
          {{ index }}
        </template>
      </a-card-meta>
    </a-card>
  </a-layout-content>
</template>
<script>
export default {
  data() {
    return {
      showType: 0, // 0代表列表模式， 1代表地图模式
      timer: false,
      arr: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      screenWidth: document.body.clientWidth
    }
  },
  watch: {
    'screenWidth': {
      handler(val) {
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
          }, 400)
        }
      },
      immediate: true,
    }
  },
  mounted() {
    const that = this
    window.onresize = () => {
      window.screenWidth = document.body.clientWidth
      that.screenWidth = window.screenWidth
    }
    this.scroll();
    // this.scroll(function(direction) {
    //   console.log(direction)
    //   if (direction === 'up') {
    //     document.getElementById('search').className = 'search-down';
    //     document.getElementById('filter-btn').className = 'filter-btn-down'
    //     document.getElementsByClassName('ant-layout-header')[0].style.height = '216px'
    //     document.getElementById('home-content').style.top = '216px'
    //   } else if (direction === 'down') {
    //     document.getElementById('search').className = 'search-up';
    //     document.getElementById('filter-btn').className = 'filter-btn-up'
    //     document.getElementsByClassName('ant-layout-header')[0].style.height = '125px'
    //     document.getElementById('home-content').style.top = '125px'
    //   }
    // });
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
    },
    // scroll(fn) {
    //   var beforeScrollTop = document.getElementsByClassName('ant-layout-content')[0].scrollTop;
    //   fn = fn || function() {};
    //   document.getElementsByClassName('ant-layout-content')[0].addEventListener('scroll', this.$tools.throttle(function() {
    //     var afterScrollTop = document.getElementsByClassName('ant-layout-content')[0].scrollTop;
    //     var delta = afterScrollTop - beforeScrollTop;
    //     if (delta === 0) return false;
    //     fn(delta > 50 ? 'down' : 'up');
    //     beforeScrollTop = afterScrollTop;
    //   }, 0), false);
    // }
    scroll() {
      document.getElementsByClassName('ant-layout-content')[0].addEventListener('scroll', this.$tools.throttle(function() {
        var scrollTop = document.getElementsByClassName('ant-layout-content')[0].scrollTop;
        if (scrollTop <= 200) {
          document.getElementById('search').className = 'search-down';
          document.getElementById('filter-btn').className = 'filter-btn-down'
          document.getElementsByClassName('ant-layout-header')[0].style.height = '216px'
          document.getElementById('home-header').style['box-shadow'] = '0px 2px 2px #F2F2F2'
          document.getElementById('home-content').style.top = '217px'
        } else {
          document.getElementById('search').className = 'search-up';
          document.getElementById('filter-btn').className = 'filter-btn-up'
          document.getElementsByClassName('ant-layout-header')[0].style.height = '140px'
          document.getElementById('home-content').style.top = '140px'
          document.getElementById('home-header').style['box-shadow'] = '0px 2px 8px 1px #CCC'
        }
      }, 50), false);
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
.ant-layout-content{
  position: relative;
  background-color: rgb(255, 255, 255);
  overflow: auto;
  height: 100%;
  max-width: 2968px;
  box-sizing: border-box;
  .card-mask{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
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
  .ant-card-hoverable:hover{
    box-shadow: none;
  }
}
</style>
