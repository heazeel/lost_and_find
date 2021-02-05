<!--
 * @Description:筛选按钮
 * @Author: hezhijie
 * @Date: 2021-01-31 18:50:25
 * @LastEditors: hezhijie
 * @LastEditTime: 2021-02-02 21:20:11
-->
<template>
  <div id="filter-btn">
    <a-row
      class="row"
      type="flex"
      justify="space-between"
    >
      <a-col
        id="col-left"
        :span="12"
      >
        <a-dropdown :trigger="['click']">
          <a-menu
            slot="overlay"
          >
            <a-menu-item key="1"> <a-icon type="user" />1st menu item </a-menu-item>
            <a-menu-item key="2"> <a-icon type="user" />2nd menu item </a-menu-item>
            <a-menu-item key="3"> <a-icon type="user" />3rd item </a-menu-item>
          </a-menu>
          <a-button>
            <svg
              id="icon-type"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 22 22"
              class="icon"
            ><path d="M20 7.5h-5.5v-6a.5.5 0 00-.854-.353L1.654 13.136a.5.5 0 00.353.854h5.681a4.56 4.56 0 00.365 3.435 4.726 4.726 0 008.61-.425H20a.5.5 0 00.5-.5V8a.5.5 0 00-.5-.5zm-11.618 5H4.364L13 3.85V7.5h-1.5a.5.5 0 00-.5.5v2.672A4.749 4.749 0 008.382 12.5zm3.868 6.025a3.275 3.275 0 113.275-3.275 3.275 3.275 0 01-3.275 3.275z" /></svg>
            <span
              id="filter-btn-name"
              ref="filterBtnName"
            >类别</span>
            <a-icon type="caret-down" />
          </a-button>
        </a-dropdown>
        <a-dropdown :trigger="['click']">
          <a-menu
            slot="overlay"
          >
            <a-menu-item key="1"> <a-icon type="user" />1st menu item </a-menu-item>
            <a-menu-item key="2"> <a-icon type="user" />2nd menu item </a-menu-item>
            <a-menu-item key="3"> <a-icon type="user" />3rd item </a-menu-item>
          </a-menu>
          <a-button>
            <svg
              id="icon-position"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-4808 -20688 14.286 20"
              class="icon"
            ><g><path d="M-4800.857-20688a7.143 7.143 0 0 0-7.143 7.143c0 5.714 7.143 12.857 7.143 12.857s7.143-7.143 7.143-12.857a7.142 7.142 0 0 0-7.143-7.143zm0 10a2.857 2.857 0 1 1 2.857-2.859 2.858 2.858 0 0 1-2.857 2.859z" /></g></svg>
            <span
              id="filter-btn-name"
              ref="filterBtnName"
            >位置</span>
            <a-icon type="caret-down" />
          </a-button>
        </a-dropdown>
        <a-dropdown :trigger="['click']">
          <a-menu
            slot="overlay"
          >
            <a-menu-item key="1"> <a-icon type="user" />1st menu item </a-menu-item>
            <a-menu-item key="2"> <a-icon type="user" />2nd menu item </a-menu-item>
            <a-menu-item key="3"> <a-icon type="user" />3rd item </a-menu-item>
          </a-menu>
          <a-button>
            <svg
              id="icon-time"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 18 18"
              class="icon"
            ><path d="M3.085 3.633a7.9 7.9 0 00-1.7 7.779h4.281zm9.172-1.927a7.918 7.918 0 00-7.864.764l1.322 3.983zm4.714 7.871C16.986 9.386 17 9.2 17 9a7.975 7.975 0 00-3.229-6.406l-3.25 2.358zm-3.546-.564l-2.5 7.741a8 8 0 005.724-5.431zm-4.27 7.979l1.284-3.972H2.092A7.987 7.987 0 009 17a1.026 1.026 0 00.155-.008z" /></svg>
            <span
              id="filter-btn-name"
              ref="filterBtnName"
            >时间</span>
            <a-icon type="caret-down" />
          </a-button>
        </a-dropdown>
      </a-col>
      <a-col
        id="col-right"
        :span="12"
      >
        <a-button
          icon="search"
          :loading="loading"
          @click="switchListType"
        >
          列表模式
        </a-button>
      </a-col>
    </a-row>
  </div>
</template>
<script>
export default {
  name: 'FilterBtn',
  data() {
    return {
      btnStatus: {
        'type': false,
        'position': false,
        'time': false
      },
      loading: false,
    }
  },
  methods: {
    switchListType() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    }
  }
}
</script>
<style lang="scss" scoped>
#filter-btn{
  display: flex;
  justify-content: space-around;
  .row{
    width: 100%;
    #col-left{
      padding-left:20px;
      .ant-dropdown-trigger{
        float: left;
        height: 38px;
        width: 100px;
        padding: 0 0px;
        color: #000;
        font-weight: bold;
        border-color: #e8e8e8;
        border-radius: 4px;
        margin-left: 10px;
        &:hover{
          border-color: #000;
        }
        &:focus{
          outline: 0px;
        }
        &:after{
          display: none;
        }
        .icon{
          position: relative;
          left: 0px;
          margin-right: 6px;
          line-height: 38px;
          vertical-align: middle;
        }
        #icon-type{
          height: 20px;
        }
        #icon-position{
          height: 16px;
        }
        #icon-time{
          height: 18px;
        }
        #filter-btn-name{
          vertical-align: middle;
          background-color: #FFF;
          padding: 0 5px 0 5px;
          transition: all 0.1s linear;
        }
        i{
          line-height: 38px;
          vertical-align: middle;
          font-size: 10px;
          margin-left: 6px;
          transition: all 0.1s linear;
        }
      }
      .ant-dropdown-open{
        border-color: #0057FF;
        &:hover{
          border-color:#0057FF;
        }
        #filter-btn-name{
          transform: translate(-32px, -18px) scale(0.8);
          color: #0057FF;
        }
        i{
          transform-origin: 50% 48%;
          transform: rotate(180deg);
        }
      }
    }
    #col-right{
      padding-right: 30px;
      .ant-btn{
        float: right;
        height: 38px;
        color: #000;
        border-color: #e8e8e8;
        border-radius: 19px;
        font-weight: bold;
        &:hover{
          border-color: #000;
        }
        &:after{
          display: none;
        }
      }
    }
  }
}
</style>
