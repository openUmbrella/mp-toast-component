
import {
  Toast,
} from '../../component/index.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrolltoId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  loading: function () {
    Toast.showLoading('loading...');
  },
  success: function () {
    Toast.showSuccess('success');
  },
  info: function () {
    Toast.showInfo('this is a message');
  },
  warn: function () {
    Toast.showWarn('warning warning');
  },

  error: function () {
    Toast.showError("error: don't touch that button");
  },
  hide: function () {
    Toast.hide();
  },
})
