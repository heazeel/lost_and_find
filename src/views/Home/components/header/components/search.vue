<!--
 * @Description:
 * @Author: hezhijie
 * @Date: 2021-01-30 17:30:26
 * @LastEditors: hezhijie
 * @LastEditTime: 2021-03-04 21:24:14
-->
<template>
  <div
    id="search"
    class="search-down">
    <a-row
      id="search-row"
      type="flex"
      justify="center">
      <a-col flex="auto">
        <a-input
          id="search-input"
          placeholder="搜索 Lost&Found">
          <a-icon
            slot="prefix"
            type="search"
            :style="{color: '#707070', 'padding-left': '3px'}" />
        </a-input>
      </a-col>
      <a-col flex="15%">
        <div id="search-criteria">
          <a-radio-group
            id="search-radio-item"
            default-value="a"
            button-style="solid">
            <div
              id="search-radio-item-mask"
              ref="slider" />
            <a-radio-button
              value="a"
              @click="changeSearchCriteria(0)">
              失物招领
            </a-radio-button>
            <a-radio-button
              value="b"
              @click="changeSearchCriteria(1)">
              寻物启事
            </a-radio-button>
          </a-radio-group>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
export default {
  name: 'Search',
  methods: {
    changeSearchCriteria (index) {
      this.$refs.slider.style.transform = `translateX(${index * 97.5}px)`;
    },
  },
};
</script>
<style lang="scss" scoped>
#search{
  // transition: transform 0.5s ease;
  // transition: width 0.8s ease;
  transition-property: width , transform;
  transition-duration: 0.3s , 0.3s;
  transition-timing-function: ease, ease;
  #search-row{
    transition: all 0.3s ease;
    .ant-input-affix-wrapper{
      transition: all 0.3s ease;
    }
    #search-criteria{
      transition: all 0.3s ease;
      #search-radio-item-mask{
        transition: all 0.3s ease;
      }
      .ant-radio-button-wrapper{
        transition: all 0.3s ease;
      }
      .ant-radio-button-wrapper-checked{
        transition: all 0.3s ease;
      }
    }
  }
}
.search-down{
  width: 100%;
  #search-row{
    height: 56px;
    margin: 0 30px 0 30px;
    .ant-input-affix-wrapper{
      height: 56px;
      border: 1px solid #CCC;
      border-radius: 28px;
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
      background-color: $searchBackColor;
      color: #CCC;
      font-size:26px;
      font-weight: bold;
      /deep/ input{
        height: 100%;
        border: 0px;
        border-radius: 28px;
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
        background-color: $searchBackColor;
        color: #000;
        font-size: 22px;
        font-weight: bold;
        padding-left: 55px;
        &::-webkit-input-placeholder{
          color: $inputPlaceholderColor;
        }
        &::-moz-placeholder{   /* Mozilla Firefox 19+ */
          color: $inputPlaceholderColor;
        }
        &:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
          color: $inputPlaceholderColor;
        }
        &:-ms-input-placeholder{  /* Internet Explorer 10-11 */
          color: $inputPlaceholderColor;
        }
        &:focus{
          box-shadow:0 0 0 0;
        }
      }
    }
    #search-criteria{
      height: 100%;
      border: 1px solid #CCC;
      border-left: 0px;
      border-radius: 28px;
      border-bottom-left-radius: 0px;
      border-top-left-radius: 0px;
      display: flex;
      justify-content: center;
      align-items: center;
      #search-radio-item{
        width: 180px;
        display: flex;
        justify-content: between;
        #search-radio-item-mask{
          position: absolute;
          width: 82.5px;
          height: 32px;
          background-color: #000;
          border-radius: 16px;
          transition: all 0.4s ease;
          transform: translateX(0px);
        }
        label:focus-within{
          outline: 0px;
        }
        label{
          border: 0px;
          &:before{
              display: none;
            }
          &:hover{
            background-color: $hoverBackColor;
            color: #000;
          }
          &:nth-child(3){
            margin-left: 15px;
          }
        }
        .ant-radio-button-wrapper{
          width: 50%;
          border-radius: 16px;
          display:flex;
          justify-content: center;
          align-items: center;
        }
        .ant-radio-button-wrapper-checked{
          background-color: rgba(0,0,0,0);
          color: #FFF;
          border-color: rgba(0,0,0,0);
          box-shadow: 0 0 0 rgba(0,0,0,0);
          transition: all 0.3s ease;
          &:hover{
            color: #FFF;
            background-color: rgba(0,0,0,1);
          }
        }
      }
    }
  }
}
.search-up{
  width: 40%;
  transform: translate(80%, -68px);
  #search-row{
    height: 35px;
    // margin: 0 30% 0 30%;
    .ant-input-affix-wrapper{
      height: 35px;
      border: 1px solid #CCC;
      border-radius: 4px;
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
      background-color: $searchBackColor;
      color: #CCC;
      font-size:18px;
      font-weight: bold;
      /deep/ input{
        height: 100%;
        border: 0px;
        border-radius: 28px;
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
        background-color: $searchBackColor;
        color: #000;
        font-size: 16px;
        font-weight: bold;
        padding-left: 45px;
        &::-webkit-input-placeholder{
          color: $inputPlaceholderColor;
        }
        &::-moz-placeholder{   /* Mozilla Firefox 19+ */
          color: $inputPlaceholderColor;
        }
        &:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
          color: $inputPlaceholderColor;
        }
        &:-ms-input-placeholder{  /* Internet Explorer 10-11 */
          color: $inputPlaceholderColor;
        }
        &:focus{
          box-shadow:0 0 0 0;
        }
      }
    }
    #search-criteria{
      height: 100%;
      border: 1px solid #CCC;
      border-left: 0px;
      border-radius: 4px;
      border-bottom-left-radius: 0px;
      border-top-left-radius: 0px;
      display: flex;
      justify-content: center;
      align-items: center;
      #search-radio-item{
        width: 180px;
        display: flex;
        justify-content: between;
        #search-radio-item-mask{
          position: absolute;
          width: 82.5px;
          height: 32px;
          background-color: #000;
          border-radius: 4px;
          transition: all 0.4s ease;
          transform: translateX(0px);
          display: none;
        }
        label:focus-within{
          outline: 0px;
        }
        label{
          border: 0px;
          &:before{
              display: none;
            }
          &:hover{
            background-color: $hoverBackColor;
            color: #000;
          }
          &:nth-child(3){
            margin-left: 0px;
          }
        }
        .ant-radio-button-wrapper{
          width: 50%;
          border-radius: 4px;
          display:flex;
          justify-content: center;
          align-items: center;
        }
        .ant-radio-button-wrapper-checked{
          background-color: rgba(0,0,0,1);
          color: #FFF;
          border-color: rgba(0,0,0,1);
          box-shadow: 0 0 0 rgba(0,0,0,0);
          transition: all 0.3s ease;
          &:hover{
            color: #FFF;
            background-color: rgba(0,0,0,1);
          }
        }
      }
    }
  }
}
</style>
