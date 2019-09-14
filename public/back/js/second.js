$(function () {
  // 一进去页面发送ajax请求 利用模板引擎进行页面渲染
  var currentPage = 1;
  var pageSize = 5;

  render();
  function render() {
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function ( info ) {
        console.log(info);
        var htmlStr = template( 'tpl',info );
        $(".table tbody").html( htmlStr );

        // 分页模块
        $("#pages").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: currentPage,
          totalPages: Math.ceil( info.total / pageSize ),
          size: 'small',
          onPageClicked: function ( a,b,c,page ) {
            currentPage = page;
            render();
          }
        })
      }
    })
  }
  // 给添加分类按钮注册点击事件 模态框展示
  $("#add").on("click",function (  ) {
    $("#addModal").modal( 'show' )
  })
})