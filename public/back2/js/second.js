/**
 * Created by Jepson on 2018/8/19.
 */


$(function() {


  var currentPage = 1; // 当前页
  var pageSize = 5; // 每页条数

  // 1. 一进入页面, 发送 ajax 请求进行渲染
  render();
  function render() {
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function( info ) {
         console.log( info );
        // 在模板中可以任意使用数据对象里面的所有属性
        var htmlStr = template( "secondTpl", info );
        $('.lt_content tbody').html( htmlStr );

        // 进行分页初始化
        $('#paginator').bootstrapPaginator({
          // 版本
          bootstrapMajorVersion: 3,
          // 当前页
          currentPage: info.page,
          // 总页数
          totalPages: Math.ceil( info.total / info.size ),
          // 添加按钮点击事件
          onPageClicked: function( a, b, c, page ) {
            // 更新当前页
            currentPage = page;
            // 重新渲染
            render();
          }
        })
      }
    })

  };



  // 2. 点击添加分类按钮, 显示添加模态框
  $('#addBtn').click(function() {
    $('#addModal').modal("show");

    // 发送ajax请求, 获取所有的一级分类数据, 进行动态渲染下拉框

    // 通过获取一级分类接口(带分页的) 模拟 获取全部一级分类的接口
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: "json",
      success: function( info ) {
        console.log( info )
        var htmlStr = template("dropdownTpl", info );
        $('.dropdown-menu').html( htmlStr );
      }
    })

  });



  // 3. 给下拉列表的 a 添加点击事件(通过事件委托绑定)
  $('.dropdown-menu').on("click", "a", function() {
    // 获取 a 的文本
    var txt = $(this).text();
    // 设置 给按钮
    $('#dropdownText').text( txt );
  });



  // 4. 配置文件上传插件, 进行文件上传初始化
  $('#fileupload').fileupload({
    // 配置返回数据格式
    dataType: "json",
    // 上传完成图片后, 调用的回调函数
    // 通过 data.result.picAddr 获取响应的图片地址
    done: function( e, data ) {
      console.log( data.result.picAddr )
      // 获取地址
      var imgUrl = data.result.picAddr;
      // 设置给 img
      $('#imgBox img').attr("src", imgUrl);
    }
  });


})