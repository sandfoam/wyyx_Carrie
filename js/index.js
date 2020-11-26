
$(".header").load("./common_header.html");
$(".footer").load("./common_footer.html");


/* 人气推荐 tab切换 */
// console.log(111)    
$(".innerWrap ul .item").each(function (index,item) {
    // console.log($(item))
    // console.log($(this))
    $(item).click(function(){
        $(this).addClass("active").siblings().removeClass("active")
        $(".showContainer").eq(index).addClass("show").siblings().removeClass("show")
    })
});
console.log('99999');
 //新品首发板块轮播图
var prev = $('.left');
var next = $('.right');
var box = $('.new_show');
// var showIndex = 0 // 当前显示图片的下标
    
    next.on("click",function(){
        console.log(111)
        box.animate({
           scrollLeft :1090
        },1000)
    }) 
    prev.on("click",function(){
        box.animate({
            scrollLeft :0
         },1000)
    }) 
     
    console.log('99999');
/* 计时器 */

//获取时间差
function getDifTime(startDate,endDate){
   return (endDate.getTime() - startDate.getTime()) //1000;
}
//获取元素
var j_hours = document.querySelector(".j_hours");
var j_minutes = document.querySelector(".j_minutes");
var j_seconds = document.querySelector(".j_seconds");
//设置结束时间
var endDate = new Date("2020/11/26 12:12:12");
//获取当前时间
var nowDate = new Date();
//获取时间差
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



var s = getDifTime(nowDate,endDate)
// console.log(s);
//页面初始化
init(s);
function init(s){
    if(s <= 0){
        // showTime.innerHTML= "商品活动时间已结束";
        return j_hours.innerHTML = 0,j_minutes.innerHTML = 0,j_seconds.innerHTML =0;
    }
    var day = (s/(1000*60*60*24));
    var hours = parseInt(day*24); 
    var minute = parseInt((s-(hours*60*60*1000))/(1000*60));
    var second = parseInt((s-(hours*60*60*1000)-(minute*60*1000))/1000);
    // countDown.innerHTML = day+ hour + minute;
    // console.log(h,minute,second)
    hours = hours.toString().length == 1 ? "0"+ hours:hours;
    minute = minute.toString().length == 1 ? "0"+ minute:minute;
    second = second.toString().length == 1 ? "0"+ second:second;
    return j_hours.innerHTML = hours,j_minutes.innerHTML = minute,j_seconds.innerHTML = second;
}
 // 定时器控制秒
		
		/* var timer = setInterval(function(){
			s-=1000;
            console.log(s);
            // console.log(day,hour,minute)
            // console.log(111)
			if(s <= 0){
                // showTime.innerHTML = "商品活动时间已结束";
				//清除定时器
				clearInterval(timer);
				return;
			}
            init(s);
        },1000); */

// talk板块 轮播图  
//获取元素
// console.log(777)
var content =document.querySelector('.talk_scroll');
var main = document.querySelector('.talk_show');
var lis = document.querySelectorAll('.li');
var left = document.querySelector('.left_');
var right = document.querySelector('.right_');
var imgIndex = 0; //当前图片的下标
var timer;
console.log(right)

function animate(dom,options,callback){
    // 遍历对象属性
    for (var attr in options){
      // 获取元素当前的attr值
      if (attr === 'opacity') {
        // 获取当前元素的透明度*100
        var current = parseInt( getComputedStyle(dom)[attr]*100 )
        var target = options[attr]*100
      } else if (attr.indexOf('scroll') !== -1){
        var current = dom[attr]
        var target = options[attr]
      } else {
        var current = parseInt( getComputedStyle(dom)[attr] )
        var target = options[attr]
      }
      options[attr] = {
        'current': current,
        'target': target
      }
      // 目标数据结构:
      // options = {
      //   'width': {
      //     'current': 100,
      //     'target': 300
      //   },
      //   'height': {
      //     'current': 100,
      //     'target': 300
      //   },
      //   ...
      // }
    }
  
    clearInterval(dom.timer)
    dom.timer = setInterval(function (){
      // 遍历对象，取出数据
      for (var attr in options){
        var current = options[attr].current
        var target = options[attr].target
        // 持续变化的速度
        var speed = (target - current)/10
        // 浮点数计算会造成结果有偏差，可能造成数据丢失：取整
        // 判断运动方向取整
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed)
  
        // 临界值判断：剩余运动量<=每次的运动量
        if ( Math.abs( target - current ) <= Math.abs(speed) ) {
          // 到达终点
          if (attr === 'opacity') {
            dom.style[attr] = target/100 // 立即到达终点
          } else if (attr.indexOf('scroll') !== -1) {
            dom[attr] = target
          } else {
            dom.style[attr] = target + 'px'
          }
  
          // 删除已运动完成的属性
          delete options[attr]
  
          for (var attr in options){
            // 还有其他属性没运动完成，提前结束当前程序，不清除计时器
            return false;
          }
          //如果有回调函数，则执行回调函数
          typeof callback === 'function'? callback() : ''
          clearInterval(dom.timer) // 清除计时器
        } else {
          // 未到达终点
          options[attr].current += speed
          if (attr === 'opacity') {
            dom.style[attr] = options[attr].current/100
          } else if (attr.indexOf('scroll') !== -1) {
            dom[attr] = options[attr].current
          } else {
            dom.style[attr] = options[attr].current + 'px'
          }
        }
      }
    },20)
  }


//自动播放
//在ul中补一张图片,把第一张图先克隆下来补到最后去
var firstImg = main.children[0].cloneNode(true);
main.appendChild(firstImg);
var twoImg = main.children[1].cloneNode(true);
main.appendChild(twoImg);
var threeImg = main.children[2].cloneNode(true);
main.appendChild(threeImg);


// console.log(main.children)

//图片的长度
var imgLen = main.children.length;
//图片的宽度 
var imgWidth = main.children[0].clientWidth + 15;
//进入页面的时候就自动播放
 autoMove();
//自动播放
function autoMove() {
    
  timer =setInterval(function () {
        moveNext() ; 
    },3000)
};
//播放下一页
function moveNext() {
imgIndex++;
//临界值判断
if(imgIndex >= (imgLen-3)){
    imgIndex =1;
    content.scrollLeft =0;
  } 
//移动滚动条
animate(content,{"scrollLeft":imgIndex * imgWidth })
}
//播放上一页
function movePrev() {
    // console.log(000)
    imgIndex--;
    if(imgIndex <0){
        imgIndex =imgLen-2;
        content.scrollLeft =imgWidth*(imgLen-1);
    }
    animate(content,{"scrollLeft":imgIndex*imgWidth})
}
//点击下一页
right.onclick =function () {
    // console.log(99);
    clearInterval(timer);
    moveNext();
    autoMove();
}
console.log(right)
left.onclick =function () {
    // console.log(888)
    clearInterval(timer);
    movePrev();
    autoMove();
}