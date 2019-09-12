// 进度条
$(function () {
  $(document).ajaxStart(function () {
    NProgress.start();
  })

  $(document).ajaxStop(function () {
    NProgress.done();
  })
})


