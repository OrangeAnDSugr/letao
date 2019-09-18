$(function () {


  $(".btn-login").click(function () {
    var username = $("#username").val().trim();
    var password = $("#password").val().trim();
    if( !username || !password ){
      mui.toast( "请输入用户名或者密码" );
    }  
    
    $.ajax({
      type: 'post',
      url: '/user/login',
      data: {
        username: username,
        password: password
      },
      dataType: 'json',
      success: function ( info ) {
        console.log(info);
        //登录失败  用户名错误 密码错误 
        if( info.error === 403 ){
          mui.toast( '用户名或者密码错误' )
          return;
        }
        
        //登录成功 1. 从别的页面跳转过来,登录成功过后再跳转回去.
        //        2. 不是从别的页面跳转过来的,跳转到用户中心页
        var retUrl = location.search.replace( '?retUrl=','' );
        if( retUrl === '' ){
          location.href = "user.html"

        }
        else {
          location.href = retUrl;
        }
      }
    })
  })
})