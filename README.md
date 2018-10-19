### mp-toast-component

微信小程序自定义toast组件，提供比原生更好都表现。

#### 功能
1. 简便的api调用方法（Toast.showLoading('msg...')、showSuccess()、showError()、showInfo()）
2. 提供背景遮罩属性
3. 将loading和常用提示（success、error、warn、info）集合到同一个对象中

#### 用法

1. 在页面的.json文件中添加组件

```
"usingComponents": {
    "toast": "mp-toast-component"
  }
```
2. 在页面的.wxml文件中添加组件,并指定id(#必须#)

```
<!-- 页面.wxml -->
<toast id="we-toast"/>
```

3. 在页面的.js文件中,导入上面的对象

```
<!-- 页面.js -->
import {
  Toast,
} from 'mp-toast-component';
```

4. 在代码中调用对象相应的方法

```
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

```