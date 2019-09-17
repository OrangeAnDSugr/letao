$(function () {
  var params = {};
  // 一进入页面 获取关键地址栏的关键字
  var key = getLocationKey( 'key' );
  console.log(key);
  $(".search-input").val( key );

  // 点击搜索按钮 搜索关键字 
  $(".search-btn").click( function () {
    render();
  } )

  // 给排序按钮 注册点击事件
  $( '.sort' ).on('click','a[data-type]',function(){
    if( !$(this).hasClass( 'current' ) ){
      $(this).addClass( 'current' ).siblings().removeClass( 'current' );
    }
    else{
      $(this).find('i').toggleClass( 'fa-angle-down' ).toggleClass( 'fa-angle-up' )
    }
    console.log(1);
    
    render();
  })


  //根据关键字渲染当前页面
  render();
  function render() {
    $(".lt-main .product").html( '<div class="loading"></div>' )

    // 三个必选参数 proName page pageSize
    params[ 'proName' ] = $(".search-input").val();
    params[ 'page' ] = 1;
    params[ 'pageSize' ] = 100;

    // 两个可选参数 price  num
    if( $( '.sort a.current' ).length > 0 ){
      var key = $(".sort a.current").data('type');
      var value = $(".sort a.current").find( 'i' ).hasClass('fa-angle-down')? 2 : 1;
      params[ key ] = value ;
    }

    
    setTimeout(function(){
      $.ajax({
        type: 'get',
        url: '/product/queryProduct',
        data: params,
        dataType: 'json',
        success: function ( info ) {
          // console.log(info);
          var htmlStr = template( 'proTpl' , info );
          $(".lt-main .product").html( htmlStr );
        }
      })
    },500)
  }

  
})