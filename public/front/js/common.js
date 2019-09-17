$(function () {
  // 初始化区域滚动 scroll
  mui(".mui-scroll-wrapper").scroll({
    deceleration: 0.0005,
    scrollY: true,
    bounce: true,
    indicators: false,
    startX: 0, //初始化时滚动至x
    startY: 0, //初始化时滚动至y
  })

  var gallery = mui(".mui-slider");
  gallery.slider({
    interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
  });
})