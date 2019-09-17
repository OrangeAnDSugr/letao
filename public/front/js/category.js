$(function(){
  // 一进入页面 进行页面渲染一级分类
    $.ajax({
      type: 'get',
      url: "/category/queryTopCategory",
      success: function( info ) {
        console.log(info);
        var htmlStr = template( 'leftTpl' , info );
        $(".cate-left .mui-scroll ul").html( htmlStr );

        //info的值取不出来 在第一次ajax请求内部进行请求 第二次ajax请求
        brandRender(info.rows[0].id)
      }
    })


  
  //发送ajax请求渲染 二级分类
  function brandRender(id) {
    $.ajax({
      type: 'get',
      url:　'/category/querySecondCategory',
      data: {
        id: id
      },
      dataType: 'json',
      success: function ( info ) {
        console.log(info);
        var htmlStr = template( 'rightTpl',info );
        if( info.rows.length > 0 ){
          $(".cate-right .mui-scroll").html( htmlStr );
        }
        else{
          $(".cate-right .mui-scroll").html('<p>没有更多商品了</p>' );
        }
      }
    })
  }

  //给左边列表注册点击事件 发送ajax请求 渲染右边的二级分类
  $(".cate-left").on('click','li',function () {

    //给当前li加上 current类 给其他li 清除current类
    $(this).addClass('current').siblings().removeClass('current');

    //发送ajax请求渲染右边二级分类
    var id = $(this).data('id');
    brandRender(id);
  })
})