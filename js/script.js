// ニュースの読み込み
$(function () {
  $.ajax({
    url: 'news.txt',
    success: function (data) {
      var data_array = data.split(/\r\n|\r|\n/);  // 改行コードで分割
      var len = data_array.length;
      if (len > 36) len = 36;
      var rowlengh = 6;
      for (var i = 0; i < len; i++) {
        switch (i % rowlengh) {
          case 0:
            $("#newscolums").append('<div class="card border-' + data_array[i] + '"><div class="card-body"' + 'id=colums' + Math.floor(i / rowlengh) +
              '><h4 class="card-title text-' + data_array[i] + '"' + 'id=columstitle' + Math.floor(i / rowlengh) + '>');
            break;
          case 1:
            $("#columstitle" + Math.floor(i / rowlengh)).append(data_array[i]);
            break;
          case 2:
            $("#colums" + Math.floor(i / rowlengh)).append('<p class="card-text">' + data_array[i]);
            break;
          case 3:
            $("#colums" + Math.floor(i / rowlengh)).append('<a href="' + data_array[i] + '" class="card-link" ' + 'id=columslink' + Math.floor(i / rowlengh) + '>');
            break;
          case 4:
            $("#columslink" + Math.floor(i / rowlengh)).append(data_array[i] + "</a>");
            break;
          case 5:
            $("#colums" + Math.floor(i / rowlengh)).append("<p class=\"card-text\"><small class=\"text-muted\">" + data_array[i] + "</small></p>");
            break;
        }
      }
    }
  });
});

//ボタンの処理
$(function () {
  $('#btn-all').click(function () {
    $('.card').show();
    $("button").removeClass("active");
    $('#btn-all').addClass("active");
  });
  $('#btn-dng').click(function () {
    $('.card').hide();
    $('.border-danger').show();
    $("button").removeClass("active");
    $('#btn-dng').addClass("active");
  });
  $('#btn-suc').click(function () {
    $('.card').hide();
    $('.border-success').show();
    $("button").removeClass("active");
    $('#btn-suc').addClass("active");
  });
  $('#btn-inf').click(function () {
    $('.card').hide();
    $('.border-info').show();
    $("button").removeClass("active");
    $('#btn-inf').addClass("active");
  });
});

