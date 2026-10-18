// FM森田 お便り･リクエスト募集フォーム — Google スプレッドシート連携バックエンド
// 使い方:
// 1. 新規Googleスプレッドシートを作成し、「拡張機能 > Apps Script」を開く
// 2. このコードを貼り付けて保存し、「デプロイ > 新しいデプロイ > 種類: ウェブアプリ」を選択
// 3. 「アクセスできるユーザー: 全員」にしてデプロイし、発行されたURLをアプリの「GitHub公開 & クラウド連携設定」に登録

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'ID', '受信日時', 'コーナー', 'ラジオネーム', '学年', '地域',
      '曲名', 'アーティスト', '気分タグ', '本文', '逆電', '連絡先', 'ステータス', 'DJメモ'
    ]);
  }
  var data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    data.id, data.createdAt, data.corner, data.radioName, data.grade,
    data.prefecture, data.songTitle, data.artistName, data.moodTag,
    data.message, data.callIn, data.contactMemo, data.status, data.djNote || ''
  ]);
  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

