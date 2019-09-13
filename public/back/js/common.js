// 进度条
$(function () {
  $(document).ajaxStart(function () {
    NProgress.start();
  })

  $(document).ajaxStop(function () {
    NProgress.done();
  })
});

//登录拦截功能
$(function () {
  if( window.location.href.indexOf('login.html') === -1 ){
    $.ajax({
      type: 'get',
      url: '/employee/checkRootLogin',
      success: function ( info ) {
        console.log( info );
        if( info.error === 400 ){
          location.href = 'login.html';
        }
      }
    }) 
  }
  
});

// 公共模块功能
$(function () {
  // 侧边栏分类管理点击展示
  $(".nav .category").on("click",function () {
    $(".nav .small").stop().slideToggle();
  })

  // 点击展示或隐藏侧边栏
  // 给a标签注册点击事件 如果不指定href 会刷新页面 点击事件会刷线
  $(".lt-top .glyphicon-align-justify").on("click",function () {
    $(".lt-aside").toggleClass("current");
    $(".lt-top").toggleClass("current");   
    $(".lt-main").toggleClass("current");       
  })
  
  // 点击退出页面按钮 显示模态框
  $(".lt-top .glyphicon-log-out").on("click",function () {
    $("#outModal").modal('toggle');

  })

  //点击退出 退出登录状态
  $("#logout").on("click",function () {
    $.ajax({
      type: 'get',
      url: '/employee/employeeLogout',
      success: function ( info ) {
        console.log(info);
        if( info.success ) {
          location.href = "login.html"
        }
      }
    })
  })
});


