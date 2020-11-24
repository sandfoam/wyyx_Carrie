// const { src } = require("gulp")

$(".header").load("./common_header.html");

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


var prev =document.querySelector('.left')
var next =document.querySelector('.right')
var box =document.querySelector('.new_g')
var showIndex = 0 // 当前显示图片的下标
var timer


//animate封装函数
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

    function moveNext(){
        box[showIndex].className ='';
        showIndex++;
        box[showIndex].className ='show';
    }
    prev.onclick =function(){
        moveNext();
    }
    function movePrev(){
        box[showIndex].className ='';
        showIndex--;
        

    }




/* 计时器 */
//倒计时时间
/* $(function(){
    timeDown("countDown",3600000);
});
function timeDown (id,value){
    //倒计时的总秒数
    var totalSeconds = parseInt(value/1000);//3600

    //取余
    var modulo = totalSeconds % (60*60*24);
    //小时数
    var hours =Math.floor(modulo/(60*60));
    var minutes =Math.floor(modulo/60);
    var seconds =modulo % 60;
    hours = hours.toString().length == 1 ? "0"+ hours:hours;
    minutes = minutes.toString().length == 1 ? "0"+ minutes:minutes;
    seconds = seconds.toString().length == 1 ? "0"+ minutes:seconds;
    document.querySelector(m-countDown).innerHTML = "hours" + "minutes" + "seconds"
    if(hours == "00" && minutes == "00" && parseInt(seconds)-1<0){
    }else{
        setTimeout(function(){
            timeDown(id,value-1000);
        },1000)
    }

} */
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
		
		var timer = setInterval(function(){
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
        },1000);
    