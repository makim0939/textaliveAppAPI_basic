'use strict';

//import { Player } from '../node_modules/textalive-app-api';
//import { Player } from '../node_modules/textalive-app-api';
const { Player } = TextAliveApp;

const animateWord = function (now, unit) {
    if (unit.contains(now)) {
        document.querySelector('#lyrics_display_area').textContent = unit.text;
    }
};

const player = new Player({
    app: {
        token: 'nIqzYcybx0RcGUnk',
    },
    mediaElement: document.querySelector('#media'),
});

const run = () => {
    const urlInput = document.getElementById('songURL');
    player.createFromSongUrl(urlInput.value);
};

player.addListener({
    onAppReady, //ホストとの接続時
    onVideoReady,
    onPlay,
    onPause,
    onStop,
});

const playBtn = document.querySelector('#playBtn');
const pauseBtn = document.querySelector('#pauseBtn');

function onAppReady(app) {
    //app.managed : ホストと接続されているか

    if (!app.managed) {
        //接続されていなければパネルを設置
        playBtn.addEventListener('click', () => {
            player.video && player.requestPlay();
        });
        pauseBtn.addEventListener('click', () => {
            player.video && player.requestPause();
        });
    }
    if (!app.songUrl) {
        player.createFromSongUrl('https://www.nicovideo.jp/watch/sm35933131');
    }
    console.log(app.managed);
}

function onVideoReady(v) {
    let w = player.video.firstWord;
    while (w) {
        w.animate = animateWord;
        w = w.next;
    }
}

function onPlay() {
    console.log('再生');
}
function onPause() {
    document.querySelector('#text').textContent = '-';
}
function onStop() {
    document.querySelector('#text').textContent = '-';
}

//htmlの楽曲URL適用ボタンから呼ばれる
const applybtn = document.getElementById('applybtn');
applybtn.onclick = run;
