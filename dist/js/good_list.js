$('.header').load('./common_header.html');
$('.footer').load('./common_footer.html');


$.ajax({
    type: 'get',
    url: './json/renqi.json',
    dataType: 'json',
    async: false,
    success: function (data) {console.log(data.oneDayHotSellList)
    var str = "";
    $.each(data.oneDayHotSellList,function(index, item){
    // console.log(item)
    // 商品详情页和购物车需要用到这里的ID,所以要先获取到商品的id
    str +=`<li code = "${item.id}"> 
    <div><a href="./good_detail.html?code=${item.id}" target="_blank" ><img src="${item.scenePicUrl}" alt=""></a></div>
    <div><a href="./good_detail.html?code=${item.id}" target="_blank"><img src="${item.listPicUrl} " class="img_none" alt=""></a></div>
    <p>${item.name}</p>
    <span>¥${item.retailPrice}<i>¥${item.counterPrice}</i></span>
 </li>`
    } )
$('.list_01 .lis').html(str)

console.log(data)

$.each(data.popularTotalList,function(index, item){
    // console.log(item)
    str +=`<li code = "${item.id}">
    <div><a href="./good_detail.html?code=${item.id}" target="_blank"><img src="${item.scenePicUrl}" alt=""></a></div>
    <div><a href="./good_detail.html?code=${item.id}" target="_blank""><img src="${item.listPicUrl} " class="img_none" alt=""></a></div>
    <p>${item.name}</p>
    <span>¥${item.retailPrice}<i>¥${item.counterPrice}</i></span>
</li>`
    } )
$('.list_02 .lis02').html(str)
console.log($('.list_02 .lis02'))

    }
})



// //要获取商品列表页的id来做购物车的数据传输
// //通过url获取到下标为1的数组
// var code = location.href.split('?')[1].split("=")[1];
//  console.log(code);
//  console.log(location.href);