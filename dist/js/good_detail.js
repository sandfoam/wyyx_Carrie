$('.header').load('./common_header.html');
$('.footer').load('./common_footer.html');
var show =document.querySelector(".show")
var mask =document.querySelector(".mask")
var show_max =document.querySelector(".show_max")
var bImg =document.querySelector(".show_max img")

// 获取元素到最外层定位父级的距离  封装的函数
function offset(dom,bool){
    var t = 0, l = 0
    var bdl = dom.clientLeft // 保存当前元素的左边框
    var bdt = dom.clientTop// 保存当前元素的上边框
    while(dom){
      l += dom.offsetLeft + dom.clientLeft
      t += dom.offsetTop + dom.clientTop
      // 每次循环完让当前dom元素等于他的定位父级
      dom = dom.offsetParent
    }
    if (bool) {// 包含自身边框
      return {left: l, top: t}
    } else {// 不包含自身边框
      return {left: l-bdl, top: t-bdt}
    }
  }

  //当鼠标移动的时候,mask跟随鼠标移动
  show.onmousemove =function(ev){
      var e = ev || event
      //计算mask的定位坐标
      var maskLeft = e.pageX - offset(show).left - mask.clientWidth/2
     var maskTop = e.pageY - offset(show).top - mask.clientHeight/2

  // 限制mask移动范围
  if (maskLeft < 0) {
    maskLeft = 0
  }
  if (maskLeft >= (show.clientWidth-mask.clientWidth)) {
    maskLeft = show.clientWidth-mask.clientWidth
  }
  if (maskTop < 0) {
    maskTop = 0
  }
  if (maskTop >= (show.clientHeight-mask.clientHeight)) {
    maskTop = show.clientHeight-mask.clientHeight
  }

  mask.style.left = maskLeft + 'px'
  mask.style.top = maskTop + 'px'

  var scaleX = maskLeft/(show.clientWidth-mask.clientWidth)
  var scaleY = maskTop/(show.clientHeight-mask.clientHeight)

  // 大图也跟随移动
  bImg.style.left = -scaleX*(bImg.clientWidth-show.clientWidth) + 'px'
  bImg.style.top = -scaleY*(bImg.clientHeight-show.clientHeight) + 'px'
}

show.onmouseenter = function (){
  mask.style.display = 'block'
  show_max.style.display = 'block'
}
show.onmouseleave = function (){
  mask.style.display = 'none'
  show_max.style.display = 'none'
}
  