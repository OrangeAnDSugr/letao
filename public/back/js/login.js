$(function () {
  //登录表单校验
  $("#form").bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      username: {
        validators: {
          notEmpty: {
            message: '用户名不能为空'
          },
          stringLength: {
            min: 2,
            max: 6,
            message: '用户名错误,请重新输入'
          },
          callback: {
            message: '用户名错误,请重新输入'
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: '密码不能为空'
          },
          stringLength: {
            min: 6,
            max: 12,
            message: '密码错误,请重新输入'
          },
          callback: {
            message: '密码输入有误'
          }
        }
      }
    }
  
  })
  
  //登录提交ajax请求
  $("#form").on('success.form.bv',function (e) {
    e.preventDefault();
    $.ajax({
      type: 'post',
      url: '/employee/employeeLogin',
      data: $("#form").serialize(),
      datatype: 'json',
      success: function ( info ) {
        if( info.success ) {
          location.href = "index.html";
        }
        if( info.error === 1000 ){
          $("#form").data('bootstrapValidator').resetForm();
          $("#form").data('bootstrapValidator').updateStatus('username','INVALID','callback');
          $("#password").val('');

        }
        if( info.error === 1001 ){
          $("#form").data('bootstrapValidator').updateStatus('password','INVALID','callback');
          $("#password").val('');
        }
      }
    })
  })

  // 重置键 重置表单验证
  $("[type='reset']").on('click',function () {
    $("#form").data('bootstrapValidator').resetForm();
  })
})