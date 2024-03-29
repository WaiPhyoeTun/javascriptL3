// Get UI
const getaudioscreen = document.getElementById('audioscreen');

const playbtn = document.getElementById("play"),
    prevbtn = document.getElementById('prev'),
    nextbtn = document.getElementById('next');
    stopbtn = document.getElementById('stop');

const getprogressctn = document.getElementById('progress-container'),
    progress = document.getElementById('progress');

const getvolprogress = document.getElementById('volumeprogress');
const getdisplaytime = document.getElementById('displaytime');

const audios = ['sample1','sample2','sample3'];

let curridx = 0;

// loadaudio(audios[curridx]);

function loadaudio(ado){
    getaudioscreen.src = `./source/${ado}.mp3`;
};

function playado(){
    playbtn.querySelector('i.fas').classList.remove('fa-play');
    playbtn.querySelector('i.fas').classList.add('fa-pause');

    getaudioscreen.play();
}

function pauseado(){
    playbtn.querySelector('i.fas').classList.add('fa-play');
    playbtn.querySelector('i.fas').classList.remove('fa-pause');
    
    getaudioscreen.pause();
}

function playpauseado(){
    if(getaudioscreen.paused){
        playado();
    }else{
        pauseado();
    }
}


function previousado(){
    curridx--;
    if(curridx < 0){
        curridx = audios.length -1;
    }
    loadaudio(audios[curridx]);
    playado()
};
function nextado(){
    curridx++;
    if(curridx > audios.length -1){
        curridx = 0
    }
    loadaudio(audios[curridx]);
    playado();
};

function stopado(){
    getaudioscreen.currentTime = 0;
    progress.value = getaudioscreen.currentTime;
    pauseado();
};

function updateprogerss(e){
    const {currentTime} = e.target;
    const {duration} = e.target;

    if(getaudioscreen.currentTime === 0){
        progress.style.width = `0%`;
    }else{
        const progresspercent= (currentTime/duration)*100;
        progress.style.width = `${progresspercent}%`
    }

    //forward
    // let mins = Math.floor(getaudioscreen.currentTime / 60);
    // let secs = Math.floor(getaudioscreen.currentTime % 60);

    // backward
    let mins = Math.floor((duration - getaudioscreen.currentTime) / 60);
    let secs = Math.floor((duration - getaudioscreen.currentTime) % 60);

    const minsval = mins.toString().padStart(0, 2);
    const secsval = secs.toString().padStart(0, 2);

    getdisplaytime.innerText = `${minsval}:${secsval}`;

};

function setaudioprogress(e){
    const width = this.clientWidth;
    console.log(width);
    const clickx = e.offsetX;
    console.log(clickx);
    const duration = getaudioscreen.duration;

    getaudioscreen.currentTime = (clickx/width) * duration;
};

function volumecontrol(){
    // console.log("hey");

    // volume came from audio/vedio  api 
    getaudioscreen.volume = getvolprogress.value/100;

    // 1 is default(100%);
    // 0.5 is half volume (50%);
    // 0 mute (0%);
};

getaudioscreen.addEventListener('timeupdate',updateprogerss);
getaudioscreen.addEventListener('play',playado);
getaudioscreen.addEventListener('pause',pauseado)

playbtn.addEventListener('click',playpauseado);
prevbtn.addEventListener('click',previousado);
nextbtn.addEventListener('click',nextado);
stopbtn.addEventListener('click',stopado);

getprogressctn.addEventListener('click',setaudioprogress);

getvolprogress.addEventListener('change',volumecontrol);





// 2AD