<!--
 * @Description:
 * @Author: hezhijie
 * @Date: 2021-01-29 22:50:57
 * @LastEditors: hezhijie
 * @LastEditTime: 2021-04-21 01:08:42
-->
<template>
  <div id="personInfo">
    <a-dropdown placement="bottomRight" :trigger="['hover']">
      <a-button class="info-btn">
        发布物品
      </a-button>
      <a-menu slot="overlay" @click="createProject">
        <a-menu-item key="lost">
          <a>发布失物招领</a>
        </a-menu-item>
        <a-menu-item key="find">
          <a>发布寻物启事</a>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
    <a-badge
      count="99"
      :number-style="{
        fontSize: '10px',
        minWidth: '15px',
        lineHeight: '15px',
        height: '15px',
        padding: '0 4px',
        transform: 'translate(30%, -30%)',
      }"
    >
      <a-button icon="mail" theme="filled" class="info-btn" />
    </a-badge>
    <a-badge
      count="5"
      :number-style="{
        fontSize: '10px',
        minWidth: '15px',
        lineHeight: '15px',
        height: '15px',
        padding: '0 4px',
        transform: 'translate(30%, -30%)',
      }"
    >
      <a-button
        icon="bell"
        theme="filled"
        class="info-btn"
        @click="drawerVisible = true"
      />
      <a-drawer
        :closable="false"
        placement="left"
        :width="450"
        :body-style="{
          padding: '0px',
          height: '100%',
        }"
        :visible="drawerVisible"
        :after-visible-change="afterChildrenVisibleChange"
        @close="onChildrenDrawerClose"
      >
        <Chat />
        <!-- <Message ref="messageList" :signal="signal" /> -->
      </a-drawer>
    </a-badge>
    <a-popover placement="bottomRight" class="photoPopover">
      <template slot="title">
        <div style="display: flex; align-items: center;">
          <img
            src="@/assets/imgs/book.png"
            style="width: 70px; height: 70px; border-radius: 35px; margin: 10px 15px 10px 0px; object-fit: cover;"
          />
          <div style="display: flex; flex-direction: column;">
            <span style="font-size: 22px">{{ userName }}</span>
            <span style="font-size: 14px">{{ userId }}</span>
          </div>
        </div>
      </template>
      <template slot="content">
        <p
          class="photoPopoverBtn"
          style="padding: 5px 10px; margin-bottom: 5px;"
        >
          个人资料
        </p>
        <p
          class="photoPopoverBtn"
          style="padding: 5px 10px; margin-bottom: 5px;"
          @click="showModal"
        >
          我发布的
        </p>
        <a-divider />
        <p
          class="photoPopoverBtn"
          style="padding: 5px 10px; margin-top: 5px;"
          @click="logout"
        >
          注销
        </p>
      </template>
      <a-button shape="circle" class="photo" />
      <a-modal
        v-model="modalVisible"
        title="我发布的物品"
        :footer="null"
        :width="1200"
        :z-index="100"
        @cancel="handleCancel"
      >
        <a-table
          :columns="columns"
          :data-source="data"
          :pagination="{ pageSize: 6 }"
        >
          <span slot="submissionType" slot-scope="tags">
            <a-tag :key="tags" :color="tags === 'find' ? 'geekblue' : 'green'">
              {{ tags == "find" ? "寻物启事" : "失物招领" }}
            </a-tag>
          </span>
          <span slot="action" slot-scope="text, record">
            <a @click="onUpdate(record)">编辑</a>
            <a-divider type="vertical" style="margin: 0 10px;" />
            <a-popconfirm
              v-if="data.length"
              ok-text="确定"
              cancel-text="取消"
              title="确定删除?"
              @confirm="() => onDelete(record.goodsId)"
            >
              <a href="javascript:;" style="color: red;">删除</a>
            </a-popconfirm>
          </span>
        </a-table>
      </a-modal>
    </a-popover>
  </div>
</template>
<script>
import Chat from "@/views/pages/chat/index";
import { mapState, mapActions } from "vuex";
const columns = [
  {
    title: "标题",
    dataIndex: "title",
    key: "title",
    width: "15%",
    ellipsis: true,
  },
  {
    title: "类型",
    dataIndex: "type",
    key: "type",
    width: "8%",
  },
  {
    title: "描述",
    dataIndex: "description",
    key: "description",
    width: "25%",
    ellipsis: true,
  },
  {
    title: "位置",
    dataIndex: "positionArea",
    key: "positionArea",
    width: "20%",
    ellipsis: true,
  },
  {
    title: "发布类型",
    key: "submissionType",
    dataIndex: "submissionType",
    scopedSlots: { customRender: "submissionType" },
    width: "10%",
  },
  {
    title: "日期",
    key: "date",
    dataIndex: "date",
    width: "12%",
  },
  {
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" },
    width: "10%",
  },
];
import { get, post } from "@/api/axios"; // 导入http中创建的axios实例
export default {
  name: "PersonInfo",
  components: {
    Chat,
  },
  data() {
    return {
      userId: null,
      userName: null,
      modalVisible: false,
      drawerVisible: false,
      columns,
      data: [],
    };
  },
  mounted() {
    this.userId = localStorage.getItem("userId");
    this.userName = localStorage.getItem("userName");
  },
  methods: {
    ...mapActions(["onLogout"]),
    createProject({ key }) {
      this.$store.commit("showModal", {
        formType: key,
        createOrUpdate: "create",
      });
    },
    afterChildrenVisibleChange(val) {
      console.log("visible2", val);
      // this.$refs.messageList.select({name: 'zxx'});
    },
    onChildrenDrawerOpen() {
      this.drawerVisible = true;
    },
    onChildrenDrawerClose() {
      this.drawerVisible = false;
    },
    async showModal() {
      const url = "/goods";
      const res = await get(url, { userId: localStorage.getItem("userId") });
      this.data = res.content;
      this.modalVisible = true;
    },
    async handleCancel(e) {
      // this.modalVisible = false;
      // this.$store.dispatch('init');
      const url = "/goods";
      let searchCriteria = JSON.parse(
        JSON.stringify(this.$store.state.goodsItem.searchCriteria)
      );
      const res = await get(url, { ...searchCriteria });
      this.$store.commit("setGoodsItem", res.content);
    },
    async onDelete(key) {
      console.log(key);
      // const data = [...this.data];
      // this.data = data.filter(item => item.goodsId !== key);
      const url = "/goods";
      const deleteRes = await post(url, { goodsId: key, _method: "DELETE" });
      if (deleteRes.code == 200) {
        this.$message.success(deleteRes.msg);
        const res = await get(url, { userId: localStorage.getItem("userId") });
        this.data = res.content;
      }
    },
    onUpdate(item) {
      this.$store.commit("showModal", {
        formType: item.submissionType,
        createOrUpdate: "update",
        itemData: item,
      });
    },
    logout() {
      localStorage.removeItem("userId", "");
      localStorage.removeItem("userName", "");
      this.onLogout();
      this.$router.push("/account");
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .ant-drawer-content-wrapper {
  .ant-drawer-content {
    // border-top-right-radius: 10px;
    // border-bottom-right-radius: 10px;
    border-radius: 10px;
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
}
#personInfo {
  .ant-btn {
    height: 32px;
    border-radius: 16px;
    font-size: 14px;
    font-weight: bold;
    color: #000;
    margin-left: 15px;
    transition: all 0.2s ease;
  }
  .info-btn {
    border-color: #e8e8e8;
    &:hover {
      border-color: #000;
    }
    &:focus {
      outline: 0px;
    }
    &:after {
      display: none;
    }
    &:active {
      opacity: 0.6;
    }
  }
  .photo {
    width: 32px;
    height: 32px;
    border-radius: 16px;
    background-color: lightcoral;
    background-image: url("../../../../../assets/imgs/book.png");
    background-size: cover;
    background-repeat: no-repeat;
    border: 0px;
    &:hover {
      border-color: none;
    }
  }
}
.photoPopoverBtn {
  border-radius: 2px;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: #f1f1f1;
    cursor: pointer;
  }
}
</style>
