//scroll fix header
$(function () {
  "use strict";
  var flag = "view";

  //スクロール関係
  $(window).on("scroll", function () {
    // scrollTop()が「200」より大きい場合
    //画面トップから、ナビゲーションメニューまでの高さ（ピクセル）を指定すれば、メニュースクロールで
    //消えていくタイミングでヘッダが表示されて固定される。  

    if ($(this).scrollTop() > 100) {
      if (flag === "view") {
        $(".fix-header").stop().css({ opacity: '0.8' }).animate({
          //”▲.fix-header”の部分は固定ヘッダとして表示させるブロックのID名もしくはクラス名に
          top: 0
        }, 500);

        flag = "hide";
      }
    } else {
      if (flag === "hide") {
        $(".fix-header").stop().animate({ top: "-66px", opacity: 0 }, 500);
        //上にあがり切ったら透過度を0%にして背景が生きるように
        //”▲.fix-header”の部分は固定ヘッダとして表示させるブロックのID名もしくはクラス名に
        flag = "view";
      }
    }

    if ($(this).scrollTop() > 500) {
      $(".title").hide()
    }
    else {
      $(".title").show()
    }

    $('.fadein').each(function () {
      var elemPos = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll > elemPos - windowHeight + 200) {
        $(this).addClass('scrollin');
      }
    });
  });

  //ボタンの処理
$(function() {
  $('#btn-all').click(function(){
        $('.card').show();
        $("button").removeClass("active");
        $('#btn-all').addClass("active");
    });
    $('#btn-dng').click(function(){
        $('.card').hide();
        $('.border-danger').show();
        $("button").removeClass("active");
        $('#btn-dng').addClass("active");
    });
    $('#btn-suc').click(function(){
        $('.card').hide();
        $('.border-success').show();
        $("button").removeClass("active");
        $('#btn-suc').addClass("active");
    });
    $('#btn-inf').click(function(){
        $('.card').hide();
        $('.border-info').show();
        $("button").removeClass("active");
        $('#btn-inf').addClass("active");
    });
});


});