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
    str +=`<li>
    <div><img src="${item.scenePicUrl}" alt=""></div>
    <div><img src="${item.listPicUrl} " class="img_none" alt=""></div>
    <p>${item.name}</p>
    <span>¥${item.retailPrice}<i>¥${item.counterPrice}</i></span>
</li>`
    } )
$('.list_01 .lis').html(str)

console.log(data)

$.each(data.popularTotalList,function(index, item){
    // console.log(item)
    str +=`<li>
    <div><img src="${item.scenePicUrl}" alt=""></div>
    <div><img src="${item.listPicUrl} " class="img_none" alt=""></div>
    <p>${item.name}</p>
    <span>¥${item.retailPrice}<i>¥${item.counterPrice}</i></span>
</li>`
    } )
$('.list_02 .lis02').html(str)
console.log($('.list_02 .lis02'))

    }
})
