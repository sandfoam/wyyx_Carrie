;
(() => {

    var navTop = document.querySelector('.navTop')
    // var lisNav = document.querySelectorAll('a li')
    // var li_nav=document.querySelector('.li_nav')
    var arrTop = []
    $.ajax({
        type: 'get',
        url: './json/wangyiTop.json',
        dataType: 'json',
        async: false,
        success: function (data) {
            // console.log(data.cateList)
            arrTop = data.data.cateList
            console.log(arrTop)
        }
    })
    //渲染标题内容
    var str = '<a href="./index.html" ><li class ="yellow">首页</li></a>' //先拼接上数据没有的内容
    arrTop.forEach(function (item, index) {
        // console.log(item.name)
        str += ' <a href="#"><li code=' + item.id + '>' + item.name + '</li></a>'
    })
    str += '<a href="#"><li>为你严选</li></a><a href="#"><li>众筹</li></a>'
    // console.log(str)
    // console.log($('.li_nav'))
    $('.li_nav').html(str)

    //在这里获取,渲染节点之后再获取
    var lisNav = document.querySelectorAll('a li')

    for (var i = 0, len = lisNav.length - 1; i < len; i++) {
        // console.log(lisNav[i])
        if(i===0||i===len- 1||i===len){
        continue
        }
        lisNav[i].onmouseenter = function () {

            navTop.classList.add('show')
            // console.log(this)
            var _this = this
            var str = ''
            arrTop.forEach(function (item, index) {
                var navCode = Number(_this.getAttribute('code'))
                // console.log(item)
                if (item.id === navCode) {
                    item.subCateGroupList.forEach(function (ite, index) {
                        // console.log(i)
                        str += '<ul><h3>' + ite.name + '</h3>'
                        var attrNav = ite.categoryList
                        var str1 = ''
                        attrNav.forEach(function (it, index) {
                            console.log(it)
                            str1 += `<li>
                             <img src="${it.bannerUrl}" alt="">
                             <span>${it.name}</span>
                         </li>`
                            // navTop.innerHTML=str
                        })
                         str += str1 + "</ul>"
                         
                        
                    })
                    str = '<div class="navBox">'+str+'</div>'
                         navTop.innerHTML = str
                    // navTop.innerHTML = str
                }

            })
        }
        lisNav[i].onmouseleave=function(){
            navTop.classList.remove('show')
        }
    }

    navTop.onmouseenter=function(){
        navTop.classList.add('show')
    }
    navTop.onmouseleave=function(){
        navTop.classList.remove('show')
    }































})()