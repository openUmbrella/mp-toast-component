// components/toast/toast.js

/**
 * 组件的id 注意:使用该组件时,必须为其指定id名
 */
let componnetId = 'we-toast'; // 在组件生命中周期中获取 页面定义的id 默认是we-toast

// 渐隐 渐现 动画时长
const animateTime = 200;

const ICON = {
  loading: './images/loading.gif',
  suceess: './images/success.png',
  error: './images/error.png',
  info: './images/info.png',
  warn: './images/warn.png',
};
/**
 * options的属性及默认值
 */
const defaultOptions = {
  mask: true, // 是否显示遮罩 注意:如果显示遮罩的时,任何触摸事件都传递不到页面上去了
  maskColor: 'rgba(0, 0, 0, 0.0)', // 透明
  text: '加载中...', // 显示的文本
  icon: ICON.loading, // 显示的图标路径
  time: 2000, // 显示的时间 单位 毫秒
  showText: true, // 是否显示文本
  showIcon: true, // 是否显示图标,
};

let timer = null; // 用于记录setTimeout的

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    text: {
      type: String,
      value: '加载中...',
    },
    icon: {
      type: String,
      value: ICON.loading,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    visible: false,
    ...defaultOptions,
    // 动画数据
    fadeAniData: null,
  },
  /**
   * 组件生命周期方法
   */
  created() {
    this.data.fadeAni = wx.createAnimation({
      duration: animateTime,
      timingFunction: 'ease-in-out',
    });
  },
  attached() {
    // 记录下ID名字
    componnetId = this.id;
  },
  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 简化用法 显示加载中..
     * options可以是一段文字或者一个对象
     */
    showLoading(options) {
      const defaultOpt = {
        time: 24 * 60 * 60 * 1000, // 就显示一天吧
        icon: ICON.loading, // 菊花图标
      };
      this.show(options, defaultOpt);
    },

    /**
     * 简化用法 显示成功toast..
     * options可以是一段文字或者一个对象
     */
    showSuccess(options) {
      const defaultOpt = {
        icon: ICON.suceess, // 成功图标
      };
      this.show(options, defaultOpt);
    },
    showError(options) {
      const defaultOpt = {
        icon: ICON.error, // 错误图标
      };
      this.show(options, defaultOpt);
    },
    showInfo(options) {
      const defaultOpt = {
        icon: ICON.info, // info图标
      };
      this.show(options, defaultOpt);
    },
    showWarn(options) {
      const defaultOpt = {
        icon: ICON.warn, // 警告图标
      };
      this.show(options, defaultOpt);
    },


    show(options, defaultOpt = {}) {
      if (typeof options === 'string') {
        // 判断是否显示文字
        if (options.length > 0) {
          defaultOpt.text = options;
        } else {
          defaultOpt.showText = false;
        }
      } else if (typeof options === 'undefined') {
        // 不显示文字
        defaultOpt.showText = false;
      } else if (typeof options === 'object') {

      } else {
        throw new Error('传入的options类型不正确!');
      }
      const opt = {
        ...defaultOptions,
        ...defaultOpt,
        ...options,
      };
      // 判断是否显示图片
      if (opt.icon.length <= 0) {
        options.showIcon = false;
      }
      // 动画
      this.data.fadeAni.opacity(1).step();
      setTimeout(() => {
        this.setData({
          fadeAniData: this.data.fadeAni.export(),
        });
      }, 100);

      // 清除上一个计时器
      timer && clearTimeout(timer);
      // 将页面显示出来
      this.setData({
        visible: true,
        ...opt,
      });
      // 倒计时完成后 关闭页面
      timer = setTimeout(() => {
        this.data.fadeAni.opacity(0).step();
        this.setData({
          fadeAniData: this.data.fadeAni.export(),
        });

        setTimeout(() => {
          this.setData({
            visible: false,
            ...defaultOptions,
          });
          timer && clearTimeout(timer);
        }, animateTime);
      }, opt.time);
    },

    hide() {
      this.data.fadeAni.opacity(0).step();
      this.setData({
        fadeAniData: this.data.fadeAni.export(),
      });

      // 不需要 隐藏动画, 因为 有动画延迟 会造成: 在一个请求中,添加了spin 成功回调后,展示successToast会一闪而过
      // setTimeout(() => {

      this.setData({
        visible: false,
        ...defaultOptions,
      });
      timer && clearTimeout(timer);

      // }, animateTime);
    },
    /**
     * 捕获事件 空实现,不让底部的界面滑动
     */
    captrueEvent(e) {

    },
  },
});

/**
 * 获取组件对象
 */
const getComponent = function () {
  const currentPage = getCurrentPages()[getCurrentPages().length - 1];
  const componentCtx = currentPage.selectComponent(`#${componnetId}`);
  if (!componentCtx) {
    throw new Error(`无法找到Toast组件,请检查当前页面中Toast组件是否指定了${componnetId}的id标签`);
  }

  return componentCtx;
};


// 再包装成类方法 导出
export class Toast {
  static show(options) {
    getComponent().show(options);
  }

  static hide() {
    getComponent().hide();
  }

  static showLoading(options) {
    getComponent().showLoading(options);
  }

  static showSuccess(options) {
    getComponent().showSuccess(options);
  }

  static showError(options) {
    getComponent().showError(options);
  }

  static showInfo(options) {
    getComponent().showInfo(options);
  }

  static showWarn(options) {
    getComponent().showWarn(options);
  }
}
