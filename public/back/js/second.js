$(function () {
  // 一进去页面发送ajax请求 利用模板引擎进行页面渲染
  var currentPage = 1;
  var pageSize = 5;
  var total 
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
    });


  }
  // 给添加分类按钮注册点击事件 模态框展示
  $("#add").on("click",function (  ) {
    $("#addModal").modal( 'show' )

    // 发送ajax请求渲染1级分类下拉列表
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: currentPage,
        pageSize: 100
      },
      dataType: 'json',
      success: function ( info ) {
        console.log(info);
        
        var htmlStr = template('firstTpl',info);
        $('.dropdown-menu').html(htmlStr);
      }
    })
  });

  // 给下拉菜单的每个li注册点击事件
  $(".dropdown-menu").on( 'click','li',function () {
    $("[name='categoryId']").val( $(this).data('id') );

    $("[for='topCate']").text($(this).text());
    $("#addForm").data('bootstrapValidator').updateStatus('categoryId','VALID');
  } )

  //点击获取文件路径
  $("[for='brandLogo']").on('click',function () {
    // console.log($("#brandLogo").val());

   
  })

  //文件上传初始化
  $('#brandLogo') .fileupload({
    dataType: 'json',
    done: function ( e,data ) {

      console.log(data.result.picAddr);
      // 设置img的src属性
      $('#brandImg').attr('src',data.result.picAddr);
      // 设置隐藏域的值
      $("[name='brandLogo']").val(data.result.picAddr);
      $("#addForm").data('bootstrapValidator').updateStatus('brandLogo','VALID');
    }
  })

  // 配置表单校验
  $("#addForm").bootstrapValidator({
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      categoryId: {
        validators: {
          notEmpty: {
            message:'请选择一级分类'
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: '请输入二级分类'
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: '请选择图片'
          }
        }
      }
    }
  })

  // 点击添加按钮 发送ajax请求
  $('#addForm').on('success.form.bv',function ( e ) {
    e.preventDefault();
    $.ajax({
      type: 'post',
      url: '/category/addSecondCategory',
      data: $("#addForm").serialize(),
      dataType: 'json',
      success: function ( info ) {
        console.log(info);
        if(  info.success ){
          $('#addModal').modal('hide');
          currentPage = 1;
          render();

          $("#addForm").data('bootstrapValidator').resetForm(true);
          $("[for='topCate']").text("请选择一级分类");
          $('#brandImg').attr('src','./images/none.png');
        }
      }
    })
  })
})