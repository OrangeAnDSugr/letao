$(function () {
  var currentPage = 1;
  var pageSize = 5;

  var brandId;
  var imgHtml='';
  var imgArr = [];
  
  // 一进入页面 发送ajax 使用模板进行渲染页面
  render();
  function render() {
    $.ajax({
      type: 'get',
      url: '/product/queryProductDetailList',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function (info) {
        // 模板引擎进行渲染
        var htmlStr = template("proTpl", info);
        $(".lt-main .table tbody").html(htmlStr);

        // 分页模块初始化
        $('#pages').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: currentPage,
          totalPages: Math.ceil(info.total / pageSize),
          size: 'small',
          useBootstrapTooltip: true,
          itemTexts: function (type, page, current) {
            switch (type) {
              case 'page':
                return "第" + page + "页";
              case 'next':
                return "下一页";
              case 'last':
                return '尾页';
              case 'first':
                return '首页';
              case 'prev':
                return '上一页';
            }
          },
          tooltipTitles: function (type, page, current) {
            switch (type) {
              case 'page':
                return "前往第" + page + "页";
              case 'next':
                return "前往下一页";
              case 'last':
                return '前往尾页';
              case 'first':
                return '前往首页';
              case 'prev':
                return '前往上一页';
            }
          },
          onPageClicked: function (a, b, c, page) {
            // 渲染点击的页面
            currentPage = page;
            render();
          }
        })
      }
    })
  }

  // 给添加商品按钮 注册点击事件 点击显示模态框
  $("#add").click(function () {
    $("#addModal").modal('show');

    // 渲染二级分类下拉菜单
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: 'json',
      success: function ( info ) {
        console.log( info );
        // 利用模板引擎进行渲染
        var htmlStr = template( 'cateTpl',info );
        $("#addModal .dropdown-menu").html( htmlStr );
      }
    })
  });

  // 给下拉菜单的每个li注册点击事件
  $('.dropdown-menu').on('click','li',function () {
     brandId = $(this).data('id');
    //  给隐藏域 设置值
     $("#addModal [name='brandId']").val(brandId);

     $('#addModal .btn-group .text').text( $(this).children().text() );
     
     //重置下拉框的校验状态为通过
     $("#addForm").data("bootstrapValidator").updateStatus('brandId','VALID');
  });

  // 文件上传初始化
  $("#fileupload").fileupload({
    dataType: 'json',
    done: function ( e , data ) {
      // console.log(data.result.picAddr,data.result.picName);
      var obj = {
        picAddr: data.result.picAddr,
        picName: data.result.picName
      }
      imgArr.unshift(obj);
      imgHtml = "<img src='"+ data.result.picAddr +"' alt=''>";
      console.log(imgArr);
      
      $(".imgBox").prepend(imgHtml);
      if( imgArr.length > 3 ){
        $(".imgBox img:last-of-type").remove();

        imgArr.pop();


      }
      if( imgArr.length === 3 ){
        $("#addForm").data('bootstrapValidator').updateStatus('pic2','VALID');
      }
      
    }
  });

  //表单校验
  $("#addForm").bootstrapValidator({
    excluded:[],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      // 商品名称
      proName: {
        validators: {
          notEmpty: {
            message: '商品名称不能为空'
          }
        }
      },
      // 二级分类
      brandId: {
        validators: {
          notEmpty: {
            message: '请选择二级分类'
          }
        }
      },
      // 商品描述
      proDesc: {
        validators: {
          notEmpty: {
            message: '商品名称不能为空'
          }
        }
      },
      // 商品库存
      num: {
        validators: {
          notEmpty: {
            message: '商品库存不能为空'
          },
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '商品库存格式, 必须是非零开头的数字'
          }
        }
      },
      // 商品尺码
      size: {
        validators: {
          notEmpty: {
            message: '商品名称不能为空'
          },
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '尺码格式, 必须是 32-40'
          }
        }
      },
      // 商品原价
      oldPrice: {
        validators: {
          notEmpty: {
            message: '商品名称不能为空'
          }
        }
      },
      // 商品现价
      price: {
        validators: {
          notEmpty: {
            message: '商品名称不能为空'
          }
        }
      },
      // 商品名称
      pic2: {
        validators: {
          notEmpty: {
            message: '商品名称不能为空'
          }
        }
      },
    }
  })

  // 阻止默认的表单提交 通过ajax发送请求
  $("#addForm").on("success.form.bv",function ( e ) {
    console.log(1);
    
    e.preventDefault();
    console.log(imgArr);
    
    var addFormData = $("#addForm").serialize();
    console.log(addFormData);
    
    addFormData += "&picName1="+ imgArr[0].picName +"&picAddr1="+ imgArr[0].picAddr;
    addFormData += "&picName2="+ imgArr[1].picName +"&picAddr2="+ imgArr[1].picAddr;
    addFormData += "&picName3="+ imgArr[2].picName +"&picAddr3="+ imgArr[2].picAddr;
    $.ajax({
      type: 'post',
      url: '/product/addProduct',
      data: addFormData,
      dataType: 'json',
      success: function( info ){
        console.log(info);
        if( info.success ){
          // 隐藏模态框
          $("#addModal").modal('hide');
          // 渲染第一页
          currentPage = 1;
          render();

          //重置表单
          $("#addForm").data('bootstrapValidator').resetForm(true);
          //重置下拉框
          $("#addModal .btn-group .text").text('请选择二级分类');
          //重置上传的图片
          $(".imgBox img").remove();

          // 重置数组
          imgArr = [];
        }
      }
    })
  })
})