$(function () {
  // 一进入页面 
  

  //页面渲染
  $.ajax({
    type: 'get',
    url: '/user/queryUserMessage',
    success: function ( info ) {
     console.log(info);
      // 进行登录拦截
      if( info.error === 400 ){
        location.href = "login.html";
        return;
      }

      var htmlStr = template( 'userTpl',info );
      $("#userPit").html(  htmlStr )
    }
  })

  // 退出登录功能
  $(".logout").click(function () {
    $.ajax({
      type: "get",
      url: '/user/logout',
      success: function( info ){
        console.log(info);
        if( info.success ){
          location.href = "login.html";
        }
      }
    })
  })
})