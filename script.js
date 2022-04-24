console.log("Welcome to iSound");

let songIndex = 0;
let audioElement = new Audio('Songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let banner = document.getElementById("songbanner");

let songs = [
    {songName: "Happy now" , filePath: "Songs/1.mp3" , coverPath: "Covers/1.jpg"},
    {songName: "Dont Leave me Alone" , filePath: "Songs/2.mp3" , coverPath: "Covers/2.jfif"},
    {songName: "Boy With Luv" , filePath: "Songs/3.mp3" , coverPath: "Covers/3.jfif"},
    {songName: "On My Way" , filePath: "Songs/4.mp3" , coverPath: "Covers/4.jpg"},
    {songName: "Just Hold On" , filePath: "Songs/5.mp3" , coverPath: "Covers/5.jfif"},
    {songName: "We Could Go Back" , filePath: "Songs/6.mp3" , coverPath: "Covers/6.jpg"},
    {songName: "The Middle" , filePath: "Songs/7.mp3" , coverPath: "Covers/7.jpg"},
    {songName: "8 Letters" , filePath: "Songs/8.mp3" , coverPath: "Covers/8.png"},
    {songName: "This Feeling" , filePath: "Songs/9.mp3" , coverPath: "Covers/9.jfif"},
    {songName: "Thank U, Next" , filePath: "Songs/10.mp3" , coverPath: "Covers/10.png"},
]

songItems.forEach((element , i) => {
    console.log(element , i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songname")[0].innerText = songs[i].songName;
})


// Handle play pause click
masterPlay.addEventListener('click' , ()=>{
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle')
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

// Listen to events
audioElement.addEventListener('timeupdate' , ()=>{
    console.log('timeupdate');
    // update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change' , ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})


Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click' , (e)=>{
        songIndex = parseInt(e.target.id);
        songIndex = songIndex-1;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.src = `Songs/${songIndex+1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        banner.style = `
        width: 100%;
        margin: 10%;
        background-image: url('${songs[songIndex].coverPath}');
        background-size:contain;
        background-repeat: no-repeat;`
    })
})

document.getElementById('next').addEventListener('click' , ()=>{
    if(songIndex >= 9){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `Songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    banner.style = `
        width: 100%;
        margin: 10%;
        background-image: url('${songs[songIndex].coverPath}');
        background-size:contain;
        background-repeat: no-repeat;`
})

document.getElementById('previous').addEventListener('click' , ()=>{
    if(songIndex <= 0){
        songIndex = 9;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `Songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    banner.style = `
        width: 100%;
        margin: 10%;
        background-image: url('${songs[songIndex].coverPath}');
        background-size:contain;
        background-repeat: no-repeat;`
})