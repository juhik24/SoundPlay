
console.log("Welcome to SoundPlay");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let masterSideImg = document.getElementById("masterSideImg");
let songTitle = document.getElementsByClassName("songInfo");

let songs = [
    {songName: "Jaan Hai Meri - Armaan Malik", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Stay - Justin Bieber", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Closer - The Chainsmokers", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Chale Aana - Armaan Malik", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Tose Naina - Arijit Singh", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Heat Waves - Glass Animals", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Kabira - Arijit Singh", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "We Don't Talk Anymore - Charlie Puth", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Subhanallah - Pritam", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Let Me Love You - Justin Bieber", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
];

const ICON_PLAY = 1;
const ICON_STOP = 0;

const handleSongPlayIcon = (target, isPlaying) => {
    if(isPlaying == ICON_PLAY) {
        target.classList.remove("fa-pause-circle");
        target.classList.add("fa-play-circle");
    } else if(isPlaying == ICON_STOP) {
        target.classList.remove("fa-play-circle");
        target.classList.add("fa-pause-circle");
    }
};

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
});
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{

    const allSongsPlayItemElements = document.querySelectorAll(".songItemPlay");

    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        handleSongPlayIcon(masterPlay, ICON_STOP);
        handleSongPlayIcon(allSongsPlayItemElements[songIndex], ICON_STOP);
        // masterPlay.classList.remove('fa-play-circle');
        // masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        handleSongPlayIcon(masterPlay, ICON_PLAY);
        handleSongPlayIcon(allSongsPlayItemElements[songIndex], ICON_PLAY);
        // masterPlay.classList.remove('fa-pause-circle');
        // masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = (myProgressBar.value * audioElement.duration)/100;
});

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        handleSongPlayIcon(element, ICON_PLAY); 
        
    });
};

let selectedSongIndex;

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        if(audioElement.paused === true) {
            selectedSongIndex = songIndex;
            audioElement.src = `songs/${songIndex+1}.mp3`;
            audioElement.currentTime = 0;
            audioElement.play();
            handleSongPlayIcon(e.target, ICON_STOP);
            handleSongPlayIcon(masterPlay, ICON_STOP);
            gif.style.opacity = 1;
        } else if(audioElement.paused === false) {
            if(selectedSongIndex === songIndex) {
                audioElement.pause();
                handleSongPlayIcon(e.target, ICON_PLAY);
                handleSongPlayIcon(masterPlay, ICON_PLAY);
                gif.style.opacity = 0;
            } else {
                makeAllPlays();
                songIndex = parseInt(e.target.id);
                selectedSongIndex = songIndex;
                audioElement.src = `songs/${songIndex+1}.mp3`;
                audioElement.currentTime = 0;
                audioElement.play();
                handleSongPlayIcon(e.target, ICON_STOP);
                handleSongPlayIcon(masterPlay, ICON_STOP);
                gif.style.opacity = 1;
            }
        }

        masterSongName.innerText = songs[songIndex].songName;
        masterSideImg.src = songs[songIndex].coverPath;

        audioElement.addEventListener("timeupdate", () => {
            if(audioElement.currentTime === audioElement.duration) {
                makeAllPlays();
                console.log("song Completed");
                songIndex = songIndex >= 9 ? 0 : songIndex + 1;
                //songIndex = (songIndex + 1 + songs.length) % songs.length;
                audioElement.src = `songs/${songIndex+1}.mp3`;
                audioElement.currentTime = 0;
                audioElement.play();
                masterSongName.innerText = songs[songIndex].songName;
                masterSongName.src = songs[songIndex].coverPath;

                // grab all the icon elements on the page
                const allSongsPlayItemElements = document.querySelectorAll(".songItemPlay");
                handleSongPlayIcon(allSongsPlayItemElements[songIndex], ICON_STOP);
                //previous can be accessed with e.target.id
                //how to access the next element (as it is not being clicked by user
            }
        });
        // e.target.classList.remove('fa-play-circle');
        // e.target.classList.add('fa-pause-circle');
        // audioElement.src = `songs/${songIndex+1}.mp3`;
        // masterSongName.innerText = songs[songIndex].songName;
        // audioElement.currentTime = 0;
        // audioElement.play();
        // gif.style.opacity = 1;
        // masterPlay.classList.remove('fa-play-circle');
        // masterPlay.classList.add('fa-pause-circle');
    });
});

document.getElementById('next').addEventListener('click', (e)=>{

   const allSongsPlayItemElements = document.querySelectorAll(".songItemPlay");
   handleSongPlayIcon(allSongsPlayItemElements[songIndex], ICON_PLAY);

    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    //audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    handleSongPlayIcon(masterPlay, ICON_STOP);
    masterSideImg.src = songs[songIndex].coverPath;
    handleSongPlayIcon(allSongsPlayItemElements[songIndex], ICON_STOP);
    // masterPlay.classList.remove('fa-play-circle');
    // masterPlay.classList.add('fa-pause-circle');

});

document.getElementById('previous').addEventListener('click', (e)=>{

   const allSongsPlayItemElements = document.querySelectorAll(".songItemPlay");
   handleSongPlayIcon(allSongsPlayItemElements[songIndex], ICON_PLAY);
//    if(songIndex< 0){
//     songIndex = 0
// }
// else{
//     songIndex -= 1;
// }
    songIndex = songIndex <= 0 ? 9 : songIndex-1;
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    handleSongPlayIcon(masterPlay, ICON_STOP);
    masterSideImg.src = songs[songIndex].coverPath;
    handleSongPlayIcon(allSongsPlayItemElements[songIndex], ICON_STOP);
    // masterPlay.classList.remove('fa-play-circle');
    // masterPlay.classList.add('fa-pause-circle');
});