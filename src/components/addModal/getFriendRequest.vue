<!--
 * @Description:
 * @Author: hezhijie
 * @Date: 2021-04-06 20:07:45
 * @LastEditors: hezhijie
 * @LastEditTime: 2021-04-06 22:30:43
-->
<template>
  <div>
    <el-dialog title="请求添加好友" :visible="this.isShowFriendRequest">
      <p :class="$style.p">
        {{ this.$store.state.friendModule.friendRequest.status }}
      </p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="refusedClick">
          拒绝
        </el-button>
        <el-button type="primary" @click="acceptSubmit">
          接受
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Vue from 'vue';

export default {
  data () {
    return {
      showRequestFriendModal: this.$store.state.friendModule.friendRequest
        .isShow,
    };
  },
  computed: {
    // ...mapGetters({

    // }),
    isShowFriendRequest () {
      return this.$store.state.friendModule.friendRequest.isShow;
    },
  },

  methods: {
    ...mapActions(['acceptSubscribe', 'declineSubscribe']),
    changeModal () {
      this.$store.state.friendModule.friendRequest.isShow = !this.$store.state
        .friendModule.friendRequest.isShow;
    },
    acceptSubmit () {
      const id = this.$store.state.friendModule.friendRequest.from;
      this.acceptSubscribe(id);
      this.changeModal();
    },
    refusedClick () {
      const options = {
        id: this.$store.state.friendModule.friendRequest.from,
        params: this.$route.query.username,
      };
      this.declineSubscribe(options);
      this.changeModal();
    },
  },
};
</script>
<style module>
.p {
  text-align: center;
}
</style>
