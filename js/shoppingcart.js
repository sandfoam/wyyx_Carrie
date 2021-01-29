$(function () {
  $('.header').load('./common_header.html');
  $('.footer').load('./common_footer.html');
  var less = $('.num_less')
  var more = $('.num_more')
  if (localStorage.getItem('goods')) {
    var cart_arr = JSON.parse(localStorage.getItem('goods'))
  }
  $.ajax({
    url: '../json/xiangqing.json',
    type: 'get',
    datatype: 'json',
    success: function (json) {
      var chart_str = ''
      // console.log(json.data)
      var json_data = json.data
      $.each(json_data, function (index, item) {
        $.each(cart_arr, function (ind, ite) {
          console.log(item)
          console.log(ite)
          if (item.id === ite.id) {
            var price_num = item.nowPrice * ite.num
            chart_str +=
              ` <div class="select">
            <input type="checkbox" class="ipt_s">
            <div class="se_img">
              <img src="${item.url}" alt="">
            </div>
            <div class='h3box'><h3>${item.name}</h3></div>
            <p class="price_01"> <span class='nowPrice'>¥${item.nowPrice}</span> <span class='totalPrice'>¥${item.totalPrice}</span></p>
            <div class="num_box">
                <button class="num_less">-</button>
                <input class="num_n" type="text" name="" id="" value="${ite.num}" />
                <button class="num_more">+</button>
            </div>
            <p class="price_02">¥${price_num}</p>
            <div class="handle">
                <a class="like">移入收藏夹</a>
                <a class="delete"  delCode=${item.id}>删除</a>
            </div>
        </div>
          `
          }

        })

      })
      $('.select_box').html(chart_str)
      //点击收藏
      $('.handle').on("click", '.like', function () {
        alert("你的眼光太棒了,好物已经收藏了")
        $(this).css('color', '#B4A078')
      })

      // 删除单条任务  这里是要从本地储存中删除的,不仅仅是删除dom结构
      $('.handle').on('click', '.delete', function () {
        var del_id = $(this).attr('delCode')
        $.each(cart_arr, function (index, item) {
          if (del_id === item.id) {
            cart_arr.splice(index, 1)
            return false
          }
        })
        //删除dom结构
        $(this).parent().parent().remove()
        //更新本地存储
        localStorage.setItem('goods', JSON.stringify(cart_arr))
        if (cart_arr.length <= 0) {
          localStorage.removeItem('cart_arr')
          var kongLi = '<li class="cart_null">购物车暂无数据,快去选购吧...</li>'
          // $('<li>购物车暂无数据,快去选购吧...</li>').append('select_box')
          $('.select_box').html(kongLi)
        }
      });
      //点击增加数量
      $('.num_box').on('click', '.num_more', function () {
        var num = parseInt($(this).prev().prop('value'));
        num += 1
        $(this).prev().prop('value', num)
        var price_good = $(this).parent().prev().children('.nowPrice').text().substr(1) // 32
        // console.log(price_good)
        var price_sum = price_good * num
        // console.log(num)
        // console.log(price_good)
        $(this).parent().next().html('¥' + price_sum)
        //更新本地存储
      })
      //点击减少数量
      $('.num_box').on('click', '.num_less', function () {
        var num = parseInt($(this).next().prop('value'));
        num--;
        console.log(num)
        if (num < 1) {
          num = 1
          alert('已经不能再少了...')
        }
        $(this).next().prop('value', num)
        var price_good = $(this).parent().prev().children('.nowPrice').text().substr(1) // 32
        var price_sum = price_good * num
        console.log(price_sum)
        $(this).parent().next().html('¥' + price_sum)

      })
      //全选框
      var ips=$(' .ipt_s')
      console.log(ips)
      $(' .cart_title .all').on('click',function(){
        console.log(111)
        
        
      })
      

    }
  })


  //全选框









  
  // //放大镜获取数据
  // $.ajax({
  //   //请求到详情页的数据
  //   type: 'get',
  //   url: './json/xiangqing.json',
  //   dataType: 'json',
  //   async: false,
  //   success: function (data) {
  //     var str = '';
  //     // 判断有没有数据
  //     var hascode = true;
  //     var imgstr = ''
  //     var boximg = null;
  //     // console.log(data)
  //     $.each(data.data, function (index, item) {
  //     //   console.log(item.id);
  //       // 判断，通过code和拿到的数据匹配并渲染页面
  //       if (getCookie (item.id)) {
  //         // console.log(item);
  //     //要先看下是否有存在cookie
  //         hascode = false
  //         str = `<div class="select">
  //         <input type="checkbox" class="ipt_s">
  //         <div class="se_img">
  //           <img src="${item.url}" alt="">
  //         </div>
  //         <h3>${item.name}</h3>
  //         <p class="price_01">¥39.90 <span>¥${item.nowPrice}</span></p>
  //         <div class="num_box">
  //             <button class="num_less">-</button>
  //             <input code="${item.id}" class="num_n" type="text" name="" id="">1</input>
  //             <button class="num_more">+</button>
  //         </div>
  //         <p class="price_02 code="${item.id}">¥${item.nowPrice}</p>
  //         <div class="handle">
  //             <a class="like">移入收藏夹</a>
  //             <a class="delete">删除</a>
  //         </div>
  //     </div> `;
  //       }
  //     });
  //    if(hascode){//默认false
  //        str =`<h2>购物车里空空如也呢,快去选购吧</h2>`;
  //    }else{//如果有ID,说明有选购
  //     $('.main').html(str);
  //     $.each($('.select .num_box input'),function(ind,ite){
  //         $(ite).val(getCookie($(this).attr('code')));
  //     });
  //     $.each($('.select')),function(index,item){
  //         //变量保存单价
  //         var price = Number($(item).children().eq(2).text().substr(1));
  //         //保存数量
  //         var num = Number($(item).children().eq(3).children().eq(1).val());

  //         //计算总价
  //         $(item).children().eq(4).text('¥'+price*num);
  //         console.log(price,num);

  //     }
  //  }
  // }
  // });
})