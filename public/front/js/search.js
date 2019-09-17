$(function () {
  // 一进入页面 获取localStorage里的数据 进行渲染
  render();
  function getHistory() {
    var history = localStorage.getItem('search_List')|| '[]';
    var arr = JSON.parse(history);
    return arr;
  }
  
  function render() {
    var arr = getHistory();
    var htmlStr = template( 'historyTpl', {arr:arr} )
    if( arr.length > 0 ){
      $(".history").html(htmlStr);
    }
    else {
      $(".history").html('<p>没有更多数据了</p>');
    }
  }
  
  // 给清空记录注册点击事件
  $( '.history' ).on( 'click','.clearHistory',function () {
    // 增加确认框
    mui.confirm( '你确定要清空所有历史记录吗?','温馨提示',['取消','确认'],function (e) {
      console.log(e);
      if( e.index === 1 ){
        localStorage.removeItem('search_List');
        render();
      }
    } )
   
  })

  //删除单条记录
  // 1.注册点击事件
  $(".history").on( 'click' ,'i.mui-icon-closeempty', function () {
    // 增加确认框
    mui.confirm( '你确认要删除这条历史记录吗?','温馨提示',['否','是'],function (e) {
      var that = this;
      if( e.index === 1 ){
        // 2.获取点击的历史记录的下标
        var index = $(that).data("index");
          
        var jsonStr = localStorage.getItem( 'search_List' );
        var  arr = JSON.parse( jsonStr );
        // 在数组里将对应项删除
        arr.splice( index , 1  );
        localStorage.setItem( 'search_List' , JSON.stringify( arr ));
        //重新渲染
        render();
      }
    } )

    

  })

  // 点击搜索 添加历史记录功能 ( 不能重复 不能超过15条记录 )
  $(".search-btn").click(function () {
    //1.获取输入框的关键字
    var key = $('.search-input').val();
    // 关键字为空时 提示
    if( !key.trim() ){
      mui.toast( '请输入搜索关键字',{duration:"2000"} )
      return;
    }
    // 不为空时
    

    var arr = getHistory();
    
    
    // 判断是否重复
    if( arr.indexOf( key ) != -1 ){
      var index = arr.indexOf( key );
      arr.splice( index , 1 );
    }
    // 判断搜索历史记录是否大于 10
    if( arr.length >= 10 ){
      arr.pop();
    }

    arr.unshift( key );
    localStorage.setItem( 'search_List',JSON.stringify( arr ) );
    render();

    // 重置搜索框的值
    $(".search-input").val('');

    location.href= 'searchList.html?key='+ key;
  })

})