<!--
 * @Description: 模态框
 * @Author: hezhijie
 * @Date: 2021-03-04 18:46:15
 * @LastEditors: hezhijie
 * @LastEditTime: 2021-03-30 22:22:14
-->
<template>
  <a-modal
    v-model="$store.state.modal.modalVisible"
    :title="$store.state.modal.modalTitle"
    centered
    :destroy-on-close="true"
    :width="1300"
    :mask-closable="false"
    :footer="null"
    @ok="() => ($store.commit('showModal', null))"
    @cancel="() => ($store.commit('showModal', null))">
    <a-row style="height: 500px">
      <a-col :span="12" style="height: 500px">
        <SmallMap @getLngLat="getLngLat" />
      </a-col>
      <a-col :span="1" style="height: 500px"></a-col>
      <a-col :span="11" style="height: 500px; overflow: auto">
        <a-form :form="form"
          :label-col="{span: 4, offset:0}"
          :wrapper-col="{span: 16, offset: 0}"
          @submit="handleSubmit">
          <a-form-item label="标题">
            <a-input v-decorator="['title', validatorRules.title]" placeholder="简要说明，如：拾获XX身份证一张" />
          </a-form-item>
          <a-row>
            <a-col :span="12">
              <a-form-item label="物品类型" :label-col="{span: 8, offset: 0}" :wrapper-col="{span: 8, offset: 0}">
                <a-select
                  v-decorator="['type', validatorRules.type]"
                  initial-value="12"
                  style="width: 120px"
                  placeholder="请选择">
                  <a-select-option v-for="(item) in type" :key="item" :value="item">
                    {{ item }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="12" :pull="2">
              <a-form-item :label="typeForm.collectDate" :label-col="{span: 8, offset: 0}" :wrapper-col="{span: 12, offset: 0}">
                <a-date-picker v-decorator="['date', validatorRules.date]" placeholder="请选择" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-form-item label="物品描述">
            <a-textarea
              v-decorator="['description', validatorRules.discription]"
              placeholder="请输入物品的描述，如：大小、颜色、种类、品牌等"
              :auto-size="{ minRows: 3, maxRows: 5 }" />
          </a-form-item>
          <a-form-item label="物品照片">
            <a-upload
              :data="uploadData"
              :action="url"
              list-type="picture-card"
              :file-list="fileList"
              @preview="handlePreview"
              @change="handleChange">
              <div v-if="fileList.length < 3">
                <a-icon type="plus" />
                <div class="ant-upload-text">
                  upload
                </div>
              </div>
            </a-upload>
            <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
              <img alt="example" style="width: 100%" :src="previewImage" />
            </a-modal>
          </a-form-item>
          <a-form-item label="地点定位">
            <a-input v-decorator="['positionLngLat', validatorRules.positionLngLat]" disabled placeholder="请在左侧地图上标出地点位置" />
          </a-form-item>
          <a-form-item :label="typeForm.collectArea">
            <a-tree-select
              ref="treeSelect"
              v-decorator="['positionArea', validatorRules.positionArea]"
              style="width: 100%"
              :dropdown-style="{ maxHeight: '350px', overflow: 'auto' }"
              :tree-data="position"
              placeholder="请选择"
              :tree-default-expand-all="false"
              show-search
              @select="treeSelect"
              @change="handleSelect">
            </a-tree-select>
          </a-form-item>
          <a-form-item label="详细位置">
            <a-textarea
              v-decorator="['positionDetail', validatorRules.positionDetail]"
              placeholder="请输入拾获物品的详细位置，如：在XXX教学楼X排X桌上"
              :auto-size="{ minRows: 3, maxRows: 5 }" />
          </a-form-item>
          <a-form-item label="联系方式">
            <a-input v-decorator="['phone', validatorRules.phone]" placeholder="请输入先联系方式" />
          </a-form-item>
          <a-form-item :wrapper-col="{span: 4, offset: 4}">
            <a-button type="primary" html-type="submit" :loading="loading">
              提交
            </a-button>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
  </a-modal>
</template>
<script>
import SmallMap from './smallMap';
import position from './positionNode.js';
const lostForm = {
  formType: 'lost',
  collectDate: '拾获日期',
  collectArea: '拾获区域',
};
const findForm = {
  formType: 'find',
  collectDate: '丢失日期',
  collectArea: '丢失区域',
};
const type = [
  '证件', '钱包', '手机', '钥匙', '银行卡', '校园卡', '手提包', '笔记本',
  '电脑', '首饰', '衣服', '耳机', '相机', '电动车', '自行车', '其他',
];
const formData = {
  userId: null,
  submissionType: null,
  title: null,
  type: null,
  date: null,
  description: null,
  photos: null,
  positionLngLat: null,
  positionArea: null,
  positionDetail: null,
  phone: null,
};
function getBase64 (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
import { post } from '@/api/axios'; // 导入http中创建的axios实例
export default {
  name: 'Modal',
  components: {
    SmallMap,
  },
  data () {
    return {
      loading: false,
      typeForm: null,
      type: type,
      lngLatText: 'haveValue',
      position: position,
      validatorRules: {
        title: { rules: [{ max: 32, message: '不能多于32字符' }, { required: true, message: '请输入标题!' }] },
        type: { rules: [{ required: true, message: '请选择类型' }] },
        date: {rules: [{required: true, message: '请填写日期'}]},
        discription: {rules: [{ max: 150, message: '不能多于150字符' }, {required: true, message: '请填写物品描述'}]},
        positionLngLat: { rules: [{ required: true, message: '请在左侧地图区域标出地点位置' }] },
        positionArea: { rules: [{ required: true, message: '请选择区域' }] },
        positionDetail: { rules: [{ max: 50, message: '不能多于50字符' }, { required: true, message: '请填写具体位置' }] },
        phone: { rules: [{ required: true, message: '请输入电话号码' }, { validator: this.phoneCheck }] },
      },
      previewVisible: false,
      previewImage: '',
      fileList: [],
      url: this.HOME + '/upload',
      uploadData: {
        folder: 'find-img',
      },
    };
  },
  beforeCreate () {
    this.form = this.$form.createForm(this, { name: 'time_related_controls' });
  },
  created () {
    if (this.$store.state.modal.modalTitle == '发布失物招领') {
      this.typeForm = lostForm;
    }
    else {
      this.typeForm = findForm;
    }
  },
  mounted () {
    // this.typeForm = this.$store.state.modal.modalTitle == '发布失物招领' ? lostForm : findForm;
  },
  updated () {
    console.log('update', this.$store.state.modal.modalTitle);
    if (this.$store.state.modal.modalTitle == '发布失物招领') {
      this.typeForm = lostForm;
    }
    else {
      this.typeForm = findForm;
    }
  },
  methods: {
    async handleSubmit (e) {
      e.preventDefault();
      this.loading = true;
      let validate = new Promise((resolve, reject) => { this.form.validateFields((err, fieldsValue) => {
        if (err) {
          this.loading = false;
          return;
        }
        let values = {
          ...fieldsValue,
          'date': fieldsValue['date'].format('YYYY-MM-DD'),
          'photos': this.fileList.length == 0 ? null : this.fileList.map((item) => item.response.content),
        };
        Object.assign(formData, values);
        console.log(values);
        resolve();
      }); });

      validate.then(async () => {
        let url = this.HOME + '/goods';
        let formType = this.typeForm.formType;
        const res = await post(url, { ...formData, userId: sessionStorage.getItem('userId'), submissionType: formType });
        this.loading = false;
        if (res.code === 200) {
          this.$message.success('创建成功！');
        }
      });
    },
    getContainer () {
      return document.getElementById('app');
    },
    handleSelect (val) {
      console.log(val);
    },
    treeSelect (value, node, extra) {
      console.log(node);
      var currentNode = node;
      var str = '';
      while (currentNode.dataRef.pid != 0) {
        str += currentNode.title + ' / ';
        currentNode = currentNode.vcTreeNode;
      }
      str += currentNode.title;
      str = str.split(' / ').reverse().join('-');
      this.$nextTick(() => {
        this.form.setFieldsValue({['positionArea']: str});
      });
    },
    phoneCheck (rule, value, callback) {
      const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
      if (value !== '') {
        if (!reg.test(value)) {
          callback('请输入正确的手机号码');
          return;
        }
      }
      callback();
    },
    handleCancel () {
      this.previewVisible = false;
    },
    async handlePreview (file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange ({ file, fileList, event }) {
      this.fileList = fileList;
      console.log(this.fileList);
    },
    getLngLat (lng, lat) {
      this.form.setFieldsValue({['positionLngLat']: `经度：${lng}， 纬度：${lat}`});
    },
  },
};
</script>
<style lang="scss" scoped>

</style>
