Page({
  data: {
    name: '小团子',
    birth: '2014-4-13',
    day: '29220',
    leftp: '0',
  },
  datePickerBindchange: function (e) {
    this.setData({
      birth: e.detail.value
    })
  },
  adjustDays: function(){
    var now = getNow();
    var birth = this.data.birth;
    var bnday = getDays(birth, now);
    var day = 29220 - bnday
    console.log(day);
    this.setData({
      day : day
    });
    var day = this.data.day;
    var leftp = (day / 29220) * 100;
    console.log(leftp);
    this.setData({
      leftp: leftp
    })
    //参数传递
    /*wx.navigateTo({
      url: '../index/finished/finished?name='+ name,
    })*/
  },
})
function getDays(date1, date2) {
  var date1Str = date1.split("-");//将日期字符串分隔为数组,数组元素分别为年.月.日  
  //根据年 . 月 . 日的值创建Date对象  
  var date1Obj = new Date(date1Str[0], (date1Str[1] - 1), date1Str[2]);
  var date2Str = date2.split("-");
  var date2Obj = new Date(date2Str[0], (date2Str[1] - 1), date2Str[2]);
  var t1 = date1Obj.getTime();
  var t2 = date2Obj.getTime();
  var dateTime = 1000 * 60 * 60 * 24; //每一天的毫秒数  
  var minusDays = Math.floor(((t2 - t1) / dateTime));//计算出两个日期的天数差  
  var days = Math.abs(minusDays);//取绝对值  
  return days;
} 
function getNow(){
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth();
  var day = date.getDay();
  var time = year + "-" + month + "-" + day;
  return time;
}
