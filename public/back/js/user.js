$(function () {
  // 全局变量要放在最前面!!!!!!!!!!! 发送ajax的时候!!!!!!!!!!!
  var currentPage = 1;
  var pageSize = 5;
  var isDelete
  var id
  render();

  function render() {
    $.ajax({
      type: "get",
      url: "/user/queryUser",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);
        
        var htmlStr = template( 'tpl',info )
        $(".table tbody").html(htmlStr);
          // 分页模块初始化
        $("#pages").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: currentPage,
          totalPages: Math.ceil( info.total / pageSize ),
          size: "small",
          onPageClicked: function (a, b, c, page) {

            currentPage = page;

            render()
          }
      
        });
      }
    })
  }
  
  // 给表格里的禁用启用按钮注册事件 显示模态框
  $('.table').on('click' , '.btn',function () {
    id = $(this).parent().data('id');
    console.log(id);
    
    isDelete = $(this).hasClass('btn-danger')? 0 : 1;
    $("#stopModal").modal('show');
    // console.log(1);
  })

  $("#sure").on('click',function () {
    $.ajax({
      type:'post',
      url: '/user/updateUser',
      data: {
        id: id,
        isDelete: isDelete
      },
      dataType: 'json',
      success: function ( info ) {
        console.log(info);
        if( info.success ){
          $("#stopModal").modal('hide');
          render();
        }
      }
    })
  })

  

});