// UI
const getvideoscreen = document.getElementById('videoscreen');

const playbtn = document.getElementById('play');
const prevbtn = document.getElementById('prev');
const nextbtn = document.getElementById('next');
const stopbtn = document.getElementById('stop');

const progress = document.getElementById('progress');
const getdisplaytime = document.getElementById('displaytime')
const getfullscreen = document.getElementById('fullscreen');

const getcontainer = document.querySelector('.container');
const getopnfullscreen = document.querySelector('.openfullscreen');
const getclsfullscreen = document.querySelector('.closefullscreen');


// For progress container 
const getprogressctn = document.getElementById('progress-container');
const getprogress = document.getElementById('progress');

const gettitle = document.getElementById('title');

const videos = ['samplevideo1', 'samplevideo2'];

let curridx = 0;

loadvideo(videos[curridx]);
function loadvideo(vdo) {
    getvideoscreen.src = `./source/${vdo}.mp4`;
    gettitle.textContent = vdo;
}




function playvdo() {

    playbtn.querySelector('i.fas').classList.remove('fa-play');
    playbtn.querySelector('i.fas').classList.add('fa-pause');


    // play() methd came from video api
    getvideoscreen.play();
}

function pausevdo() {

    playbtn.querySelector('i.fas').classList.remove('fa-pause');
    playbtn.querySelector('i.fas').classList.add('fa-play');

    // pause() methd came from video api
    getvideoscreen.pause();
}

function playpausevdo() {
    //  paused keyword came from video api
    if (getvideoscreen.paused) {
        //getvideoscreen.play();
        playvdo();
    } else {
        //getvideoscreen.pause();
        pausevdo();
    }

}


function nextvdo() {
    curridx++;

    if (curridx > videos.length - 1) {
        curridx = 0;
    }

    // console.log(curridx);
    loadvideo(videos[curridx]);
    playvdo();

}

function prevvdo() {
    curridx--;

    if (curridx < 0) {
        curridx = videos.length - 1;
    }

    //  console.log(curridx);
    loadvideo(videos[curridx]);
    playvdo();
}

function stopvideo(){
    getvideoscreen.currentTime = 0;
    // getvideoscreen.pause();
    pausevdo();
}

function updateprogress(e){

    // Method 2 m1
    // console.log(e.target);
    // console.log(e.srcElement);
    // console.log(this)

    // const currentTime = e.target.currentTime;
    // const duration = e.target.duration;
    // console.log(currentTime,duration);

    // M2
    // const {currentTime} = e.target;
    // const {duration} = e.target;
    // console.log(currentTime,duration);


    // Method 2 m3
    // const {currentTime,duration} = e.target
    // console.log(currentTime,duration);

    // Method 2 m4 
    const [currentTime,duration] = [e.target.currentTime,e.srcElement.duration]
    console.log(currentTime,duration);

    // console.log('hey')
    // Method 1
    //currentTime came from video api 
    // console.log(getvideoscreen.currentTime);

    // duration came from video api 
    // console.log(getvideoscreen.duration);
    // console.log((getvideoscreen.currentTime / getvideoscreen.duration) * 100)

// For Range     
    // if(getvideoscreen.currentTime === 0){
    //     progress.value = 0
    // }else{
    //     // progress.value = (getvideoscreen.currentTime / getvideoscreen.duration) * 100

    //     progress.value = (currentTime / duration) * 100

    // }

// For progress 
    if(getvideoscreen.currentTime === 0){
        progress.style.width = "0%"
    }else{
        // progress.value = (getvideoscreen.currentTime / getvideoscreen.duration) * 100

        const progresspercent = (currentTime / duration) * 100
        progress.style.width = `${progresspercent}%`

    }

    // progress.value = (getvideoscreen.currentTime / getvideoscreen.duration) * 100



    let getmins = Math.floor(getvideoscreen.currentTime/60);
    // console.log(getmins);

    // if(getmins < 10){
    //     // getmins = '0' +getmins
    //     getmins = '0' + String(getmins)
    // }

    let getsecs = Math.floor(getvideoscreen.currentTime%60);
    // console.log(getsecs);
    // if(getsecs < 10){
    //     // getsecs = '0' +getsecs;
    //     getsecs = '0' +String(getsecs);
    // }

    // getdisplaytime.innerText = `${getmins}:${getsecs}`;



    // Method 2 
    // Noted: partStart(area(target length), startvalue(pad String))must be string data type 
    const minutevalue = getmins.toString().padStart(2, '0');
    const secondvalue = getsecs.toString().padStart(2, '0');

    console.log(minutevalue, secondvalue);
    console.log(typeof minutevalue, typeof secondvalue);

    getdisplaytime.innerText = `${minutevalue}:${secondvalue}`;
    


    


}


// const getdoce = document.documentElement;

function openfullscreen() {

    if (getcontainer.requestFullscreen) {
        getcontainer.requestFullscreen(); //standard wec
    } else if (getdoce.mozRequestFullscreen) {
        getcontainer.mozRequestFullscreen(); //  firefox
    } else if (getdoce.webkitRequestFullscreen) {
        getcontainer.webkitRequestFullscreeen(); //chrome / safari
    } else if (getdoce.msRequestFullscreen) {
        getcontainer.msRequestFullscreen(); //microsoft pro/id/edge
    }

    getopnfullscreen.style.display = "none";
    getclsfullscreen.style.display = "inline-block";

}

function closefullscreen() {

    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullscreen) {
        document.mozCancelFullscreen();
    } else if (document.webkitExitFullscreeen) {
        document.webkitExitFullscreeen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }


    getopnfullscreen.style.display = "inline-block";
    getclsfullscreen.style.display = "none";

}

// For Range 
function setprogress(e){
    // console.log('hay');
    // console.log((progress.value*getvideoscreen.duration)/100);

    // For Range 
    // getvideoscreen.currentTime = (progress.value*getvideoscreen.duration)/100;

    // For Progress-container 
    const getelewidth = this.clientWidth;
    // console.log(getelewidth);

    const getclickx = e.offsetX;
    // console.log(getclickx);

    const duration = getvideoscreen.duration;

    getvideoscreen.currentTime = (getclickx / getelewidth) * duration;
    console.log(getvideoscreen.currentTime);

}




playbtn.addEventListener('click', playpausevdo);
nextbtn.addEventListener('click', nextvdo);
prevbtn.addEventListener('click', prevvdo);
stopbtn.addEventListener('click', stopvideo);

getvideoscreen.addEventListener('timeupdate',updateprogress);
getvideoscreen.addEventListener('ended',nextvdo);
getvideoscreen.addEventListener('click',playpausevdo);
// for Range 
// progress.addEventListener('click',setprogress);

// For Porgresscontainer 
getprogressctn.addEventListener('click',setprogress);


getopnfullscreen.addEventListener('click', openfullscreen);
getclsfullscreen.addEventListener('click', closefullscreen);


// 21VDO

