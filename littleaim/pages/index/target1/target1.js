Page({
  data: {
    aimdate1: '',
    aiminfo1: '',
    endtime1: '',
    items: [
      { name: '每天', value: '每天', checked: 'true' },
      { name: '每周', value: '每周' },
      { name: '每月', value: '每月' },
      { name: '其他', value: '其他' },
    ],
    remindtime1: '',
  },
  //触发表单相关控件
  he: function(e){
    this.setData({
      showView:(!this.data.showView),
      aimdate1: '2018-1-1',
      aiminfo1: '   ',
      endtime1: '12:12',
      remindtime1: '12:12',
    })
    var aimflag = getApp().globalData.aimflag;
    aimflag=false
  },
  //记录表单控件各个值改变以及存入缓存
  aiminfoBindchange: function (e) {
    this.setData({
      aiminfo1: e.detail.value
    });
    console.log(e.detail.value);
    wx.setStorageSync('aiminfo1', e.detail.value);
  },
  datePickerBindchange: function (e) {
    this.setData({
      aimdate1: e.detail.value
    });
    console.log(e.detail.value);
    wx.setStorageSync('aimdate1', e.detail.value);
  },
  timePickerBindchange: function (e) {
    this.setData({
      endtime1: e.detail.value
    });
    console.log(e.detail.value);
    wx.setStorageSync('endtime1', e.detail.value);
  },
  rtimePickerBindchange: function (e) {
    this.setData({
      remindtime1: e.detail.value
    });
    wx.setStorageSync('remindtime1', e.detail.value);
  },
  aim: function (e) {
    //表单验证
    var warn = "";
    var flag = true;
    if (e.detail.value.aimdate1 == "2018-1-1") {
      warn = "请填写目标截止日期哟";
    } else if (e.detail.value.aiminfo1 == "") { 
      warn = "请填写目标信息哟";
    } else if (e.detail.value.endtime1 == "") {
      warn = "请填写目标截止时间哟";
    } else if (e.detail.value.items == "") {
      warn = "请填写目标提醒周期哟";
    } else if (e.detail.value.remindtime1 == "") {
      warn = "请填写目标提醒时间哟";
    } else {
      flag = false;
      var that = this;
    }
    if (flag == true) {
      wx.showModal({
        title: '提示',
        content: warn,
      })
    };
    //表单存储
    var datevalue = wx.getStorageSync('aimdate1');
    var infovalue = wx.getStorageSync('aiminfo1');
    var timevalue = wx.getStorageSync('endtime1');
    var rtimevalue = wx.getStorageSync('remindtime1');
    this.setData({
      aimdate1: datevalue,
      aiminfo1: infovalue,
      endtime1: timevalue,
      remindtime1: rtimevalue,
    })
    //部分参数传递
    wx.navigateTo({
      url: '../index?aimdate1=' + e.detail.value.aimdate1 + '&aiminfo1=' + e.detail.value.aiminfo1
    }),
      console.log('form发生了submit事件，携带数据为：', e.detail.value);
  },
  //调用缓存加载页面
  onLoad: function (options) {
    var aimflag = getApp().globalData.aimflag;
    if(aimflag==true){
      showView: (options.showView == "true" ? true : false)
    }
    var datevalue = wx.getStorageSync('aimdate1');
    var infovalue = wx.getStorageSync('aiminfo1');
    var timevalue = wx.getStorageSync('endtime1');
    var rtimevalue = wx.getStorageSync('remindtime1');
    console.log(datevalue);
    console.log(infovalue);
    console.log(timevalue);
    console.log(rtimevalue);
    this.setData({
      aimdate1: datevalue,
      aiminfo1: infovalue,
      endtime1: timevalue,
      remindtime1: rtimevalue,
    })
  },
  //清除并重置缓存
  finish: function () {
    wx.clearStorageSync();
    wx.setStorageSync('aimdate1', '2018-1-1');
    wx.setStorageSync('aiminfo1', '');
    wx.setStorageSync('endtime1', '12:12');
    wx.setStorageSync('remindtime1', '12:12');
    wx.navigateTo({
      url: '../finished/finished',
    })
  }
})
