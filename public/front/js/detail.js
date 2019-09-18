$(function () {



  //  一进入页面 发送ajax请求 动态渲染页面
  // 从地址栏获取商品id
  var id = getLocationKey('productId');

  // 点击尺码 添加高亮
  $(".lt-main").on( 'click' , '.pro-size span' ,function () {
    $(this).addClass( 'current' ).siblings().removeClass( 'current' );
  } )


  // 动态渲染页面数据
  $.ajax({
    type: 'get',
    url: '/product/queryProductDetail',
    data: {
      id: id
    },
    dataType: 'json',
    success: function (info) {
      console.log(info);
      var htmlStr = template('detailTpl', info);
      $(".lt-main .mui-scroll").html(htmlStr);

      // 图片轮播初始化
      var gallery = mui('.mui-slider');
      gallery.slider({
        interval: 2000//自动轮播周期，若为0则不自动播放，默认为0；
      });

      //手动初始化数字输入框
      mui(".mui-numbox").numbox();

      
    }
  })

  //点击 加购物车
  $(".addCart").click(function () {
    // 判断有没有选择尺码 没有 则提示
     if  ( $(".pro-size span.current").length === 0) {
       mui.toast("请选择尺码");
       return;
     }
    //  获取产品数量
     var num = $(".mui-numbox-input").val();
     var size = $(".pro-size span.current").text();
     
    $.ajax({
      type: 'post',
      url: '/cart/addCart',
      data: {
        productId: id,
        num: num,
        size: size
      },
      dataType: 'json',
      success: function ( info ) {
        console.log( info );

        // 未登录 跳转到登录页面
        if( info.error === 400 ){
          location.href = "login.html?retUrl=" + location.href;
        }

        // 已登录 弹出提示框
        if( info.success ){
          mui.confirm( '添加成功','温馨提示',['去购物车','继续浏览'],function ( e ) {
            if( e.index === 0 ){
              location.href = "cart.html";
            }
          } )
        }
      }
    }) 
  })
})