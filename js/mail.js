// Step 1で取得したOAuthクライアントIDをここに書く。
const CLIENT_ID = '361625052892-1u48d2n9trgmu5lvc7se3tku6dj45t5l.apps.googleusercontent.com';

async function onLoad() {
  try {
    $('#step2').hide();

    // Google APIs Client Libraryの初期化。
    await gapi.load('client:auth2');
    await gapi.client.init({
        clientId: CLIENT_ID,
        scope: 'https://www.googleapis.com/auth/gmail.send'
    });
    await gapi.client.load('gmail', 'v1');

    // サインイン済みかチェック。
    if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
        $('#step1').hide();
        $('#step2').show();
    }    
  } catch (e) {
    console.error(e);
  }
}

async function signIn() {
  try {
    await gapi.auth2.getAuthInstance().signIn();
  } catch (e) {
    console.error(e);
  }
}

async function signOut() {
  try {
    await gapi.auth2.getAuthInstance().signOut();
  } catch (e) {
    console.error(e);
  }
}

async function sendEmail() {
  try {
    if($("#reqest option:selected").text() == '')return;
    if( $('#name').val() == '')return;
    if( $('#mail').val()  == '')return;
    if($('#context').val() == '')return;

    // 送りたいメールアドレスに書き換えてください。
    const to = 'july1997@outlook.jp';
    const subject = 'お問い合わせ : ' + $("#reqest option:selected").text();
    const body = '名前 : '+ $('#name').val() + '\nメール : '+ $('#mail').val() + '\n内容 : ' + $('#context').val();

    // サインイン済みかチェック。
    if (!gapi.auth2.getAuthInstance().isSignedIn.get()) {
      console.error('Sign in first');
      return;
    }

    // メールデータの作成。
    const mimeData = [
      `To: ${to}`,
      'Subject: =?utf-8?B?' + btoa(unescape(encodeURIComponent(subject))) + '?=',
      'MIME-Version: 1.0',
      'Content-Type: text/plain; charset=UTF-8',
      'Content-Transfer-Encoding: 7bit',
      '',
      body,
    ].join('\n').trim();
    const raw = btoa(unescape(encodeURIComponent(mimeData))).replace(/\+/g, '-').replace(/\//g, '_');

    // メールの送信。
    await gapi.client.gmail.users.messages.send({
      'userId': 'me',
      'resource': {raw: raw},
    });
    $('#myModal').modal();

  } catch (e) {
    console.error(e);
  }
}

var testCallback = function(code) {
    if(code != ""){
      $('#sent').attr('disabled',false);
    }
};