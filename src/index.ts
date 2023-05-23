import { Player, IPlayerApp, IVideo, IWord } from 'textalive-app-api';

const player = new Player({
    app: {
        appAuthor: 'makim0939',
        appName: 'practice',
        token: 'nIqzYcybx0RcGUnk',
    },
    mediaElement: document.querySelector<HTMLElement>('#media')!,
});

const run = () => {
    const urlInput = document.getElementById('songURL') as HTMLInputElement;
    player.createFromSongUrl(urlInput.value);
};

player.addListener({
    onAppReady, //ホストとの接続時
    onVideoReady,
    onPlay,
    onPause,
    onStop,
});

const playBtn = document.querySelector('#playBtn') as HTMLButtonElement;
const pauseBtn = document.querySelector('#pauseBtn') as HTMLButtonElement;

function onAppReady(app: IPlayerApp) {
    //app.managed : ホストと接続されているか
    if (!app.managed) {
        //接続されていなければパネルを設置
        playBtn.addEventListener('click', () => {
            player.video && player.requestPlay();
        });
        pauseBtn.addEventListener('click', () => {
            console.log(player.video);
            player.video && player.requestPause();
        });
    }
}

const animateWord = (now: any, unit: any) => {
    if (unit.contains(now)) {
        console.log(unit.text);
        document.querySelector('#lyrics_display_area')!.textContent = unit.text;
    }
};
function onVideoReady(v: IVideo) {
    let w = player.video.firstPhrase;
    while (w) {
        console.log(w);
        w.animate = animateWord;
        w = w.next;
    }
}

function onPlay() {
    console.log('再生');
}
function onPause() {
    document.querySelector<HTMLElement>('#lyrics_display_area')!.textContent = '-';
}
function onStop() {
    document.querySelector<HTMLElement>('#lyrics_display_area')!.textContent = '-';
}

//htmlの楽曲URL適用ボタンから呼ばれる
const applybtn = document.getElementById('applybtn') as HTMLButtonElement;
applybtn.onclick = run;
