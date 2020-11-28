$('.header').load('./common_header.html');
$('.footer').load('./common_footer.html');

$(function(){

    //先获取商品列表数据

    $.ajax({
        url:'./json/renqi.json',
        type:'get',
        dataType:'json',
        success:function(json){
         //先打印下看看是不是拿到数据了   
         console.log(json)
        $.each(json,function(index,callback){

        })
        }
    })
}) 