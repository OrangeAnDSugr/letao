$(function () {
  var params = {};
  var currentPage = 1;
  var pageSize = 2;
  // 一进入页面 获取关键地址栏的关键字
  var key = getLocationKey( 'key' );
  $(".search-input").val( key );

  // 配置下拉刷新
  mui.init({
    pullRefresh: {
      container: ".mui-scroll-wrapper",
      down: {
        contentdown:"下拉可以刷新",
        contentover: "释放立即刷新",
        contentrefresh: "正在刷新...",
        callback: function () {
          currentPage = 1;
          // 下拉刷新成功
          render(function ( info ) {
            var htmlStr = template( 'proTpl' , info );
            $(".lt-main .product").html( htmlStr );
            mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();
            // console.log( mui(".mui-scroll-wrapper").pullRefresh()   );
            mui(".mui-scroll-wrapper").pullRefresh().enablePullupToRefresh();
          });
          
        }
      },
      up: {
        height: 50,
        contentrefresh: "正在加载...",
        contentnomore: "再拉也没有商品给你看啦QAQ!",
        callback: function () {
          currentPage++;
          render(function ( info ) {

            var htmlStr = template( 'proTpl' , info );
            $(".lt-main .product").append( htmlStr );
            if( info.data.length === 0 ){
              mui(".mui-scroll-wrapper").pullRefresh().endPullupToRefresh( true );
            
            }
            else{
              mui(".mui-scroll-wrapper").pullRefresh().endPullupToRefresh( false );
            }

          })
        }
      }
    }
  })







  // 点击搜索按钮 搜索关键字 
  $(".search-btn").click( function () {
    var key = $('.search_input').val(); // 获取搜索关键字
    if ( key.trim() === "" ) {
      mui.toast("请输入搜索关键字");
      return;
    }

    // 执行一次下拉刷新即可, 在下拉刷新回调中, 会进行页面渲染
    // 调用 pulldownLoading 执行下拉刷新
    mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();

    // 有搜索内容, 需要添加到本地存储中
    var history = localStorage.getItem("search_list") || '[]'; // jsonStr
    var arr = JSON.parse( history ); // 转成数组

    // 要求:
    // 1. 不能重复
    var index = arr.indexOf( key );
    if ( index != -1 ) {
      // 删除对应重复项
      arr.splice( index, 1 );
    }
    // 2. 不能超过 10
    if ( arr.length >= 10 ) {
      // 删除最后一项
      arr.pop();
    }

    // 往数组最前面追加
    arr.unshift( key );
    // 转成 json, 存到本地
    localStorage.setItem( "search_list", JSON.stringify( arr ) );

  } )

  // 给排序按钮 注册点击事件
  $( '.sort' ).on('tap','a[data-type]',function(){
    if( !$(this).hasClass( 'current' ) ){
      $(this).addClass( 'current' ).siblings().removeClass( 'current' );
    }
    else{
      $(this).find('i').toggleClass( 'fa-angle-down' ).toggleClass( 'fa-angle-up' )
    }    
    

    mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();

  })


  //根据关键字渲染当前页面
  render(function ( info ) {
    var htmlStr = template( 'proTpl' , info );
    $(".lt-main .product").html( htmlStr );
    mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();
  });
  function render( callback ) {
    // $(".lt-main .product").html( '<div class="loading"></div>' )

    // 三个必选参数 proName page pageSize
    params[ 'proName' ] = $(".search-input").val();
    params[ 'page' ] = currentPage;
    params[ 'pageSize' ] = pageSize;

    // 两个可选参数 price  num
    if( $( '.sort a.current' ).length > 0 ){
      var key = $(".sort a.current").data('type');
      var value = $(".sort a.current").find( 'i' ).hasClass('fa-angle-down')? 2 : 1;
      params[ key ] = value ;
    }

    
      $.ajax({
        type: 'get',
        url: '/product/queryProduct',
        data: params,
        dataType: 'json',
        success: function ( info ) {
          console.log(info);
          
          callback&&callback( info )
        }
      })
  }

  // 给商品注册点击事件
  $(".lt-main .product").on( 'tap', '.pro-item' ,function () {
    var id =  $(this).data("id");
    // console.log(id);
     location.href = "detail.html?productId="+ id;
    
  })


})