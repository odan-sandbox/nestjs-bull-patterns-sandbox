import Queue from 'bull';

const videoQueue = new Queue('video transcoding', 'redis://127.0.0.1:6379');

// queue に処理を登録
videoQueue.add({ video: 'http://example.com/video1.mov' });

videoQueue.process(function (job, done) {
  // job のデータを使って処理を実行
  done();
});
