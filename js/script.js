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
      if (scroll > elemPos - windowHeight + 100) {
        $(this).addClass('scrollin');
      }
    });
  });

  // ニュースの読み込み
  $(function () {
    $.ajax({
      url:'news.txt',
      success: function(data){
        var data_array = data.split(/\r\n|\r|\n/);  // 改行コードで分割
        var len = data_array.length;
        if(len > 36)len = 36;
        var rowlengh = 6;
        for (var i = 0; i < len; i++){
          switch(i % rowlengh){
            case 0:
              $("#newscolums").append('<div class="card border-' + data_array[i] + '"><div class="card-body"' + 'id=colums' + Math.floor(i/rowlengh) +
               '><h4 class="card-title text-' + data_array[i] + '"' + 'id=columstitle' + Math.floor(i/rowlengh) + '>');
            break;
            case 1:
              $("#columstitle" + Math.floor(i/rowlengh)).append(data_array[i]);
            break;
            case 2:
              $("#colums" + Math.floor(i/rowlengh)).append('<p class="card-text">' + data_array[i]);
            break;
            case 3:
              $("#colums" + Math.floor(i/rowlengh)).append('<a href="' + data_array[i] + '" class="card-link" ' + 'id=columslink' + Math.floor(i/rowlengh) + '>');
            break;
            case 4:
              $("#columslink" + Math.floor(i/rowlengh)).append(data_array[i] + "</a>");
            break;
            case 5:
              $("#colums" + Math.floor(i/rowlengh)).append("<p class=\"card-text\"><small class=\"text-muted\">" + data_array[i] + "</small></p>");
            break;
          }
        }
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