$('.header').load('./common_header.html');
$('.footer').load('./common_footer.html');
var show = document.querySelector(".show")
var mask = document.querySelector(".mask")
var show_max = document.querySelector(".show_max")
var bImg = document.querySelector(".show_max img")

// 获取元素到最外层定位父级的距离  封装的函数
function offset(dom, bool) {
  var t = 0,
    l = 0
  var bdl = dom.clientLeft // 保存当前元素的左边框
  var bdt = dom.clientTop // 保存当前元素的上边框
  while (dom) {
    l += dom.offsetLeft + dom.clientLeft
    t += dom.offsetTop + dom.clientTop
    // 每次循环完让当前dom元素等于他的定位父级
    dom = dom.offsetParent
  }
  if (bool) { // 包含自身边框
    return {
      left: l,
      top: t
    }
  } else { // 不包含自身边框
    return {
      left: l - bdl,
      top: t - bdt
    }
  }
}

//当鼠标移动的时候,mask跟随鼠标移动
show.onmousemove = function (ev) {
  var e = ev || event
  //计算mask的定位坐标
  var maskLeft = e.pageX - offset(show).left - mask.clientWidth / 2
  var maskTop = e.pageY - offset(show).top - mask.clientHeight / 2

  // 限制mask移动范围
  if (maskLeft < 0) {
    maskLeft = 0
  }
  if (maskLeft >= (show.clientWidth - mask.clientWidth)) {
    maskLeft = show.clientWidth - mask.clientWidth
  }
  if (maskTop < 0) {
    maskTop = 0
  }
  if (maskTop >= (show.clientHeight - mask.clientHeight)) {
    maskTop = show.clientHeight - mask.clientHeight
  }

  mask.style.left = maskLeft + 'px'
  mask.style.top = maskTop + 'px'

  var scaleX = maskLeft / (show.clientWidth - mask.clientWidth)
  var scaleY = maskTop / (show.clientHeight - mask.clientHeight)

  // 大图也跟随移动
  bImg.style.left = -scaleX * (bImg.clientWidth - show.clientWidth) + 'px'
  bImg.style.top = -scaleY * (bImg.clientHeight - show.clientHeight) + 'px'
}

show.onmouseenter = function () {
  mask.style.display = 'block'
  show_max.style.display = 'block'
}
show.onmouseleave = function () {
  mask.style.display = 'none'
  show_max.style.display = 'none'
}

//要获取商品列表页的id来做购物车的数据传输
//通过url获取到下标为1的数组
var code = location.href.split('?')[1].split("=")[1];
// console.log(code);
// console.log(location.href);
//设置cookie  
function setCookie(options) {
  options.days = options.days || 0;
  options.path = options.path || '';
  if (options.days === 0) {
    document.cookie = options.key + '=' + options.val + '; path=' + options.path;
  } else {
    var d = new Date();
    d.setDate(d.getDate() + options.days);
    document.cookie =
      options.key +
      '=' +
      options.val +
      '; expires=' +
      d +
      '; path=' +
      options.path;
  }
}
//获取cookie

function getCookie(key) {
  var arr = document.cookie.split('; ')
  for (var i = 0, len = arr.length; i < len; i++) {
    var arr2 = arr[i].split('=')
    if (arr2[0] === key) {
      return arr2[1]
    }
  }
  return null
}

// 删除cookie（cookie过期浏览器自动删除）
function removeCookie(key) {
  setCookie({
    key: key,
    val: '123',
    days: -2
  })
}

//放大镜获取数据
$.ajax({
  //请求到详情页的数据
  type: 'get',
  url: './json/xiangqing.json',
  dataType: 'json',
  async: false,
  success: function (data) {
    var str = '';
    // 判断有没有数据
    var hascode = true;
    var imgstr = ''
    var boximg = null;
    // console.log(data)
    $.each(data.data, function (index, item) {
      // console.log(item.id);
      // 判断，通过code和拿到的数据匹配并渲染页面
      if (code === item.id) {
        // console.log(item);
        hascode = false
        str = `<div class="show">
          <img src="${item.url}" alt="">
          <div class="mask"></div>
      </div>
      <div class="show_max">
          <img src="${item.url}" alt="">
      </div>`;
        $.each(item.imgs, function (ind, ite) {
          imgstr += `<li><img src="${ite.url}" alt=""></li>`
        })
      }
    })

    $(".good_show .bigbox").html(str)
    $(".good_show .lis").html(imgstr)
    if (hascode) {
      // 这里为true代表没有code数据
      $('.good_show .bigbox').html('<h4>商品补货中</h4>')
    }
    // 点击立即购买跳转页面并传过去code
    $(".btn_box .buy").on('click', function () {
      $(this).attr('href', `shoppingcart.html?code=${code}`);
    });
    $(".btn_box .cart").on('click', function () {
  setCookie({
  key:"code",
  val:code,
  days:10
})
console.log(code);
    });
  }
})

//点击加入购物车保存在本地储存保存code    加入购物车 cart
//给动态元素绑定点击事件,事件委托,给当前存在的父级绑定,哪个父级不重要,一定是当前存在的
$('.detail').on ('click','.btn_box .cart', function(){//事件处理函数
  //获取当前点击的商品的code
  var code =$(this).attr('code')

  // goods [{code:'aba1',num:1},{code:'aba2',num:2}]

//获取之后就要进行判断
   //判断1:本地存储是否有数据
   if(localStorage.getItem('goods')){
     console.log(localStorage.getItem('goods'))
     var goodsArr = JSON.parse(localStorage.getItem('goods'))
   }else{//没有的话给空数组
     var goodsArr =[]
   }

   var hasgoods =false;
   if(goodsArr.length >0){
     //判断2:当前选中的商品是都在购物车中
    $.each(goodsArr,function(index,item){
      console.log(index)
      console.log(item.code)
      console.log(item)
      if(item.code === code){//商品存在
        item.num++
        hasgoods = true;
        return false //判断完数量之后就不用再往后遍历了
      }
    })
   }
   //没有当前选中的商品就添加一个
   if(!hasgoods){
    //  var objStr =JSON.stringify({code:code,num:1})
     goodsArr.push({"code":code,num:1});
   }
   console.log(goodsArr);
//更新本地存储的数据

localStorage.setItem("goods",JSON.stringify(goodsArr))
alert("购物车添加成功");

})



//  tab切换
// 图片切换
// $(' .good_show .lis img').on('mouseenter', function () {
//   // console.log($(this));
//   $('.good_show .show').children().attr('src', $(this).attr('src'));
//   $('.good_show .show_max').children().attr('src', $(this).attr('src'));
//   $('.good_show .lis img').parent().removeClass('show');
//   $(this).parent().toggleClass('show');
// });