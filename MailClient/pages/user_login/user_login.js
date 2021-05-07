const app = getApp()
Page({
  data: {
    account:'',
    password:'',
    windowHeight:'',
    windowWidth:''
  },
  formSumbit:function (e) {
    console.log("点击登录按钮");
    console.log(e.detail.value);
     this.setData({
       account: e.detail.value.account,
       password: e.detail.value.password,
     })
  },
  log_in: function (e) {
     var that=this
     wx.request({//to be modified
       url: app.globalData.serverIp+'url',
       menthod: "GET",   
       header: {
         'content-type': 'application/json'
       },
       data: {
         'account':that.data.account,
         'password': that.data.password,
       },
       success:function (res) {
         console.log(".....回调函数....." +res.data );
         app.globalData.token = res.data.token;
         app.globalData.userinfo = res.data.userinfo; 
       },
       fail: function (res) {
         wx.showToast({
           title: '登录失败',
           icon: 'none',
           duration: 1000,
           mask: true
         })
       }
     })
   },
  onLoad: function () {
    this.setData({
      windowWidth:app.globalData.windowWidth,
      windowHeight:app.globalData.windowHeight
    })
  },
  
  formRest:function () {
    console.log("点击了注册")
    wx.redirectTo({
      url: '../sign_up/sign_up',
    })
  },
})
