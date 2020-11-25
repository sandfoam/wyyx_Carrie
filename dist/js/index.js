"use strict";

// const { src } = require("gulp")
$(".header").load("./common_header.html");
/* 人气推荐 tab切换 */
// console.log(111)    

$(".innerWrap ul .item").each(function (index, item) {
  // console.log($(item))
  // console.log($(this))
  $(item).click(function () {
    $(this).addClass("active").siblings().removeClass("active");
    $(".showContainer").eq(index).addClass("show").siblings().removeClass("show");
  });
}); //新品首发板块轮播图

var prev = $('.left');
var next = $('.right');
var box = $('.new_show'); // var showIndex = 0 // 当前显示图片的下标

next.on("click", function () {
  console.log(111);
  box.animate({
    scrollLeft: 1090
  }, 1000);
});
prev.on("click", function () {
  box.animate({
    scrollLeft: 0
  }, 1000);
});
/* 计时器 */
//获取时间差

function getDifTime(startDate, endDate) {
  return endDate.getTime() - startDate.getTime(); //1000;
} //获取元素


var j_hours = document.querySelector(".j_hours");
var j_minutes = document.querySelector(".j_minutes");
var j_seconds = document.querySelector(".j_seconds"); //设置结束时间

var endDate = new Date("2020/11/26 12:12:12"); //获取当前时间

var nowDate = new Date(); //获取时间差
// var s =parseInt(getDifTime(nowDate,endDate))/1000
// console.log(s);
// //页面初始化
// init(s);
// function init(s){
//     if(s <= 0){
//         // showTime.innerHTML= "商品活动时间已结束";
//         return;
//     }
//     var hours =(s/60/60); 
//     // console.log(hours);
//     var day =parseInt(hours/24); //天数
//     var h =parseInt((hours/24-day)*24);
//     var minute =parseInt(((hours/24-day)-h)*60);
//     var second = parseInt((((hours/24 - day) * 24 - h) * 60 - minute) * 60);
//     // countDown.innerHTML = day+ hour + minute;
//     // console.log(h,minute,second)
//     return j_hours.innerHTML = h,j_minutes.innerHTML = minute,j_seconds.innerHTML = second;
//     // console.log(h);
// }

var s = getDifTime(nowDate, endDate); // console.log(s);
//页面初始化

init(s);

function init(s) {
  if (s <= 0) {
    // showTime.innerHTML= "商品活动时间已结束";
    return j_hours.innerHTML = 0, j_minutes.innerHTML = 0, j_seconds.innerHTML = 0;
  }

  var day = s / (1000 * 60 * 60 * 24);
  var hours = parseInt(day * 24);
  var minute = parseInt((s - hours * 60 * 60 * 1000) / (1000 * 60));
  var second = parseInt((s - hours * 60 * 60 * 1000 - minute * 60 * 1000) / 1000); // countDown.innerHTML = day+ hour + minute;
  // console.log(h,minute,second)

  hours = hours.toString().length == 1 ? "0" + hours : hours;
  minute = minute.toString().length == 1 ? "0" + minute : minute;
  second = second.toString().length == 1 ? "0" + second : second;
  return j_hours.innerHTML = hours, j_minutes.innerHTML = minute, j_seconds.innerHTML = second;
} // 定时器控制秒


var timer = setInterval(function () {
  s -= 1000;
  console.log(s); // console.log(day,hour,minute)
  // console.log(111)

  if (s <= 0) {
    // showTime.innerHTML = "商品活动时间已结束";
    //清除定时器
    clearInterval(timer);
    return;
  }

  init(s);
}, 1000); // talk板块 轮播图  
//获取元素

var content = document.querySelector('talk_scroll');
var main = document.querySelector('talk_show');
var lis = document.querySelectorAll('.li');
var left = document.querySelector('.left');
var right = document.querySelector('right');
var imgIndex = 0; //当前图片的下标

var timer; //自动播放
//在ul中补一张图片,把第一张图克隆下来

var firstImg = main.children[0].cloneNode(true);
main.appendChild(firstImg); //图片的长度

var imgLen = main.children.length; //图片的宽度 

var imgWidth = main.children[0].clientWidth; //进入页面的时候就自动播放

autoMove(); //自动播放

function autoMove() {
  timer = setInterval(function () {
    moveNext();
  }, 3000);
}

; //播放下一页