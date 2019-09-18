$(function () {

  //模板引擎渲染
  function render() {
    $.ajax({
      type: 'get',
      url: '/cart/queryCart',
      success: function ( info ) {
        console.log(info);
        if( info.error === 400 ){
          location.href = "login.html?retUrl="+ location.href;
          return;
        }
        console.log({info,info});
        
        var htmlStr = template( 'cartTpl' , { info: info } )
        $(".mui-scroll").html( htmlStr );

        mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh() ;
        
      }
    })
  }


  // 下拉刷新
  mui.init({
    pullRefresh : {
      container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down : {
        height:50,//可选,默认50.触发下拉刷新拖动距离,
        auto: true,//可选,默认false.首次加载自动下拉刷新一次
        contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
        contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
        contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
        callback : function ( ) {
          render();
        }
      }
    }
  });

  // 点击删除购物车商品
  $(".lt-main").on( 'tap','.btn_delete',function () {
    var id = $(this).data("id");
    $.ajax({
      type: 'get',
      url: '/cart/deleteCart',
      data: {
        id : id
      },
      dataType: 'json',
      success: function ( info ) {
        if( info.success ){
          render();
        }
        
      }
    })
  } )

  // 点击编辑购物车商品
  $(".lt-main").on('tap','.btn_edit',function(){    
    var obj = this.dataset;
    console.log(obj);
    var id = obj.id;


    var htmlStr = template( "updateTpl" , obj )
    htmlStr = htmlStr.replace( /\n/g , '' )
    mui.confirm( htmlStr,'编辑商品',[ '确认','取消' ] , function ( e ) {
      if( e.index === 0 ){
        var size = $( ".pro-size span.current" ).text();
        var num = $(".mui-numbox-input").val();
        if( !size  ){
          mui.toast( "请选择尺码" );
          return;
        }

        $.ajax({
          type: 'post',
          url: '/cart/updateCart',
          data: {
            id: id,
            size: size,
            num: num
          },
          dataType: 'json',
          success: function ( info ) {
            console.log(info);
            render();
          }
        })
      }

    })

    mui('.mui-numbox').numbox();
  })


  // 让尺码点击时高亮
  $("body").on( 'tap','.pro-size span',function () {
    $(this).addClass( 'current' ).siblings().removeClass( 'current' );
  } )
})