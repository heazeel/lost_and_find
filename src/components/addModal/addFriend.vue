<!--
 * @Description:
 * @Author: hezhijie
 * @Date: 2021-04-06 20:07:45
 * @LastEditors: hezhijie
 * @LastEditTime: 2021-04-06 23:28:30
-->
<template>
  <a-modal
    v-model="showAddFriendModal"
    title="添加好友"
    @ok="submitValue"
    @cancel="showAddFriendModal = false">
    <el-form :model="form">
      <el-form-item label="用户名">
        <el-input v-model="form.name" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="showAddFriendModal = false">
        取 消
      </el-button>
      <el-button type="primary" @click="submitValue">
        确 定
      </el-button>
    </div>
  </a-modal>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Vue from 'vue';

export default {
  data () {
    return {
      form: {
        name: '',
      },
      showAddFriendModal: false,
    };
  },
  computed: {
    // ...mapGetters({
    //   contact: "addfirend"
    // }),
  },
  methods: {
    ...mapActions(['addfirend']),
    changeModal () {
      this.$data.showAddFriendModal = !this.$data.showAddFriendModal;
    },
    submitValue () {
      const option = {
        id: this.form.name, // 联系人id
        params: this.$route.query.username, // 自己的id
      };
      this.changeModal();
      this.addfirend(option);
      this.$message.success('已发送请求');
      this.$data.form.name ='';
    },
  },
};
</script>
