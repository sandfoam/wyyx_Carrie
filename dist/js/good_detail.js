$(function () {

  $('.header').load('./common_header.html');
  $('.footer').load('./common_footer.html');
  var g_code = location.href.split('?')[1].split('=')[1]
  // console.log(g_code)
  // http://localhost:3000/good_detail.html?code=3998431 
  $.ajax({
    url: '../json/xiangqing.json',
    type: 'get',
    cache: 'false',
    data: '',
    dataType: 'json',
    async: false,
    success: function (json) {
      console.log(json)
      var str = ""
      $.each(json.data, function (index, item) {
        console.log(item)
        if (item.id === g_code) {

          $('.cart').attr('code', g_code)

          str = `<div class="bigbox">
          <div class="show show_tab">
          <img src="${item.url}" alt="">
          <div class="mask"></div>
          </div>
          <div class="show_max">
          <img src="${item.url}" alt="">
          </div>
          </div>
          <ul class="lis">
          <li><img src="${item.imgs[0].url}" alt=""></li>
          <li><img src="${item.imgs[1].url}" alt=""></li>
          <li><img src="${item.imgs[2].url}" alt=""></li>
          <li><img src="${item.imgs[3].url}" alt=""></li>
          <li><img src="${item.imgs[4].url}" alt=""></li>
          </ul>`

          $('.good_show').html(str)

          var lisImg = document.querySelectorAll('.main .good_box .lis li img')
          var lisGig = document.querySelector('.main .good_box .bigbox .show img')
          var lisMil = document.querySelector('.main .good_box .bigbox .show_max img')
          console.log(lisImg)
          for (let i = 0, len = lisImg.length; i < len; i++) {
            lisImg[i].onmouseenter = function () {
              console.log(lisGig)
              lisGig.src = item.imgs[i].url
              lisMil.src = item.imgs[i].url
            }
          }
        }
      })
      var show = document.querySelector(".show")
      var mask = document.querySelector(".mask")
      var show_max = document.querySelector(".show_max")
      var bImg = document.querySelector(".show_max img")

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

      //当鼠标移动的时候,mask跟随鼠标移动
      show.onmouseenter = function () {
        mask.style.display = 'block'
        show_max.style.display = 'block'

      }
      show.onmouseleave = function () {
        mask.style.display = 'none'
        show_max.style.display = 'none'
      }
    }
  })

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


  //商品数量添加

  var num_txt = $('.num_n').text()
  //增加
  $('.num_more').on('click', function () {
    num_txt++
    $('.num_n').text(num_txt)
  })
  //减少
  $('.num_less').on('click', function () {
    num_txt--
    if (num_txt < 1) {
      num_txt = 1
      alert('已经不能再少了...')
    }
    $('.num_n').text(num_txt)
  })



  //点击加入购物车的时候
  $('.cart').on('click', function () {
    var num_txt = Number($('.num_n').text())
    //获取商品ID和数量
    var cart_id = $(this).attr('code')
    // console.log(cart_id)
    // "good:[{'id':'123','num':'1'},{'id':'124','num':'1'}]"
    var cart_arr = []
    if (localStorage.getItem('goods')) {
      cart_arr = JSON.parse(localStorage.getItem('goods'))
    }
    var flag = false //标示本地存储中是否已有该商品
    //遍历数组判断购物车中是否已有该商品
    $.each(cart_arr, function (index, value) {
      if (value.id === cart_id) {
        value.num += num_txt
        flag = true
      }
    })
    if (!flag) {
      cart_arr.push({
        'id': cart_id,
        'num': num_txt
      })
    }
    console.log(cart_arr)
    //更新本地存储的数据
    localStorage.setItem('goods', JSON.stringify(cart_arr))
    alert('已加入购物车')
    console.log(cart_id)
    
  })
})