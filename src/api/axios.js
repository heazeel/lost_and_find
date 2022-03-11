/*
 * @Description: 接口
 * @Author: hezhijie
 * @Date: 2021-02-27 16:26:18
 * @LastEditors: hezhijie
 * @LastEditTime: 2021-04-20 22:00:51
 */

import axios from 'axios';
import QS from 'qs'; // 序列化post数据

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function get (url, params = {}, options = {}) {
  // if (!options.noTokenApi) {
  //   params.token = localStorage.getItem('token');
  // }
  // get都是查询，查询过滤空值
  // params = deleteEmptyProperty(params);
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url,
      params,
      timeout: 30000,
      ...options,
    }).then(response => {
      resolve(response);
      // if (options.loading) { // 只关闭自己的已经有loading的请求
      //   loading.close(); // 响应成功关闭loading
      // }
    }).catch(err => {
      reject(err);
    });
  });
}
/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post (url, params = {}, options = {}) {
  // if (!options.noTokenApi) {
  //   if (options.formData) {
  //     params.append('token', localStorage.getItem('token'));
  //   } else {
  //     params.token = localStorage.getItem('token');
  //   }
  // }
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url,
      // data: options.formData ? params : QS.stringify(params), // 如果是FormData的数据就不要处理了
      data: QS.stringify(params), // 如果是FormData的数据就不要处理了
      // data: params,
      timeout: 30000,
      ...options,
      // headers: {
      //   'X-Requested-With': 'XMLHttpRequest',
      //   'Content-Type': 'application/json; charset=utf-8',
      //   // 'Content-Type': options.formData ? 'multipart/form-data' : 'application/json',
      // },
    }).then(
      response => {
        resolve(response);
        // if (options.loading) { // 只关闭自己的已经有loading的请求
        //   loading.close(); // 响应成功关闭loading
        // }
      },
      err => {
        reject(err);
      },
    );
  });
}
// request 拦截器，主要对请求前的数据进行统一处理
// axios.interceptors.request.use(config => {
//   if (config.loading) { // 如果配置了loading: false，则不显示loading
//     startLoading(config.loadingText); // 显示文字
//   }
//   if (config.noLimitTimeOut) { // 不限时
//     delete config.timeout;
//   }
//   if (!config.noTokenApi) {
//     setCookie('token', localStorage.getItem('token'), 3);
//   }
//   // ------------------------------------------------------------------------------------
//   // removePending(config); // 在一个ajax发送前执行一下取消操作
//   // config.cancelToken = new CancelToken((c) => {
//   //   // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
//   //   pending.push({ u: config.url + '&' + config.method + '&' + (QS.stringify(config.data) || QS.stringify(config.params)), f: c });
//   // });
//   // ------------------------------------------------------------------------------------
//   return config;
// }, error => Promise.reject(error));

// response 拦截器，主要对请求后的数据进行统一处理
axios.interceptors.response.use(response => {
  // 如果http状态码正常
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    // 校验返回的状态码
    // response = codeStatusHandle(response.data);
    return Promise.resolve(response.data);
  } else if (response && response.status === 500) {
    return Promise.reject({ code: 999, msg: '服务器神游了~', content: null });
  } else {
    return Promise.reject({ code: 999, msg: '网络异常', content: null });
  }
}
, error => Promise.resolve(error.response));

function codeStatusHandle (res) {
  const response = res;
  const responseMap = new Map([
    [undefined, null],
    [200, null], // 成功;
    [210, () => this.$message.success('dasd')], // 操作失败;
    [414, null], // 不支持该操作，需要单独做提示内容
    // [411, () => {
    //   setTimeout(() => { // MessageBox 就有问题，删除的时候就不会执行，得加个延时
    //     MessageBox.alert('用户未登录或已超时', '提示', {
    //       confirmButtonText: '确定',
    //       callback: action => {
    //         router.replace({
    //           path: '/Login',
    //           query: {
    //             redirect: router.currentRoute.fullPath,
    //           },
    //         });
    //       },
    //     });
    //   });
    // },
    // ],
    [412, () => this.$message.warning('权限不足')],
    [413, () => this.$message.warning('入参错误')],
    [500, () => this.$message.warning('服务器异常')],
  ]);
  const handleFunc = responseMap.get(res.code);
  handleFunc && handleFunc();
  return response;
}
