$(function () {
  // 一进入页面 发送ajax请求 利用模板引擎进行页面渲染
  var currentPage = 1;
  var pageSize  = 5;
  
  render();
  function render() {
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function ( info ) {
        console.log(info);
        var htmlStr = template( 'tpl',info );
        $(".table tbody").html(htmlStr);
        // 分页模块 初始化插件 
        $("#pages").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: currentPage,
          totalPages: Math.ceil(info.total / pageSize),
          size: "small",
          onPageClicked: function ( a,b,c,page ) {
            currentPage = page;
            render();
          }
        });
      }
    })
  }

  // 给添加分类按钮注册点击事件 点击 模态框显示
  $("#add").on('click',function(){
    $("#addModal").modal('show');
    console.log(1);
    
  });
  
  // 表单校验功能 表单校验插件 必须在表单进行提交时 才会进行 表单校验
  $("#addForm").bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: '信息不能为空'
          }
        }
      }
    }
  });

  // 注册点击添加事件 阻止默认的表单提交 发送ajax请求 刷新页面 重置表单元素
  $("#addForm").on("success.form.bv",function ( e ) {
    e.preventDefault();
    
  })
  $("#addCate").on('click',function () {
    $.ajax({
      type: 'post',
      url: '/category/addTopCategory',
      data: $("#addForm").serialize(),
      dataType: 'json',
      success: function ( info ) {
        console.log( info );
        if( info.success ){
          $("#addModal").modal('hide');
          // 渲染当前页
          currentPage = 1;
          render();
          //重置表单元素
          $("#addForm").data('bootstrapValidator').resetForm(true);
        }
      }
    })
  })
})