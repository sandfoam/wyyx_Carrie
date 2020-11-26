$('.commonHeader').load('./common_header.html');
$('.footer').load('./common_footer.html');
// var tabs =document.querySelectorAll('.tab');
// var login =document.querySelectorAll('.login-content');
// // console.log(tabs)
// // console.log(login)
// var prevIndex =0 //保存当前的下标
// for(var i =0,len=tabs.length;i<len;i++){
//     tabs[i].index =i;
//     tabs[i].onclick =function () {
//         tabs[prevIndex].className ="";
//         login[prevIndex].className ="login-content";
//         tabs[this.index].className ="active";
//         login[this.index].className ="login-content show";
//         prevIndex =this.index;

//     }
// }

$(".loginHeader .item").each(function (index,item) {
    //  console.log($(item))
    // console.log($(this))
    $(item).click(function(){
    console.log(111);
        $(this).addClass("active").siblings().removeClass("active")
        $(".login_wrap").eq(index).addClass("show").siblings().removeClass("show")
    })
});

var ipt = document.querySelector('.ipt')
var btn = document.querySelector('.btn')
var eIpt =document.querySelector('.e_ipt')
var eBtn = document.querySelector('.e_btn')
var check =document.querySelector('.checks')
console.log(check)

btn.onclick = function () {
    console.log(check.checked)
    if( check.checked){
        console.log(111);
        var val = ipt.value
        var regPhone = /^(\+861|1)[3-9]\d{9}$/
       if (regPhone.test(val)) { 
           
          alert('登录成功')
        } else {
          alert('输入有误,请重新输入')
        }
      }else{
          alert("请先勾选协议")
      }
    }

// eBtn.onclick = function () {
//     var val = eIpt.value
//     var regEmail = /\w{8,24}@[0-9a-z]{1,10}(\.[a-z]{2,3}){1,2}/   
//     if (regEmail.test(val)) { 
//       alert('格式正确')
//     } else {
//       alert('格式错误,请重新输入')
//     }
//   }


