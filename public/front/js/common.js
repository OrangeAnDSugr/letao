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


  
});

function getLocationKey( key ) {
  // var arr = ['耐克','阿迪','新百伦','特步','以纯'];
  // localStorage.setItem( 'search_List' , JSON.stringify( arr ) );
  var str = location.search;
  str = decodeURI(str);
  str = str.slice( 1 );
  var hisArr = str.split( '&' );
  var obj = {};
  hisArr.forEach(function ( v , i ) {
    var arr = v.split('=');
    obj[ arr[0] ] = arr[1];
  })
  return obj[ key ]; 
  
}