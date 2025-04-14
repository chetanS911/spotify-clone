console.log("Spotify");
//Initialize Variables
let songIndex=0;
let masterPlay= document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgress");
let backward=document.getElementById("backward");
let forward=document.getElementById("forward");
let audio = new Audio("AlanWalker/Alone1.mp3");
const image = document.querySelector('#main');
const gif = document.getElementById("gif");
const MasterSongName = document.getElementById("MasterSongName");
let progress=0;
let songItem=Array.from(document.getElementsByClassName("songItems"));
let indexSong=["Alone1","Alone11","Darkside","Faded","Drum","Spectre","Headlights"];
let index=0;
MasterSongName.innerHTML=indexSong[0];
//song Array
let songs=[
    {songName: "Alone-1", filepath: "AlanWalker/Alone1.mp3", coverPath: "cover/cover1" },
    {songName: "Alone-11", filepath: "AlanWalker/Alone11.mp3", coverPath: "cover/cover2" },
    {songName: "Darkside", filepath: "AlanWalker/Darkside.mp3", coverPath: "cover/cover3.jpg" },
    {songName: "Faded", filepath: "AlanWalker/Faded.mp3", coverPath: "cover/cover4.jpg" },
    {songName: "Drum", filepath: "AlanWalker/The Drum.mp3", coverPath: "cover/cover1" },
    {songName: "Spectre", filepath: "AlanWalker/The Spectre.mp3", coverPath: "cover/cover2" },
    {songName: "Headlight", filepath: "AlanWalker/Headlights.mp3", coverPath: "cover/cover4.jpg" }
];

//Listen Events
masterPlay.addEventListener('click',()=>{
    if(audio.paused){
        audio.play();
        image.src = 'pause.png'; 
        gif.style.opacity=1;  
        document.getElementById(String(index)).src="pause.png";
    }
    else{
        audio.pause();
        image.src = 'play.png';  
        gif.style.opacity=0;  
        document.getElementById(String(index)).src="play.png";
    }
})
audio.addEventListener("timeupdate", ()=>{
    progress=parseInt((audio.currentTime/audio.duration)*100);
    //update seekbar
    myProgressBar.value=progress;
})
//change progressbar
myProgressBar.addEventListener("change", ()=>{
    audio.currentTime=(myProgressBar.value/100)*audio.duration;
})
songItem.forEach((element,i) => {
    element.querySelectorAll("#coverimg")[0].src=songs[i].coverPath;
    element.querySelectorAll(".songName")[0].innerHTML=songs[i].songName;
});
const makeAllPlay=(e)=>{
    Array.from(document.getElementsByClassName("play")).forEach((element)=>{
        e.target.src="pause.png";
    })
}
//popullate songItems
Array.from(document.getElementsByClassName("play")).forEach((element)=>{
    element.addEventListener("click",(e)=>{
        if(audio.paused){
            makeAllPlay(e);
            index = parseInt(e.target.id);
            MasterSongName.innerHTML=songs[index].songName;
            gif.style.opacity=1;  
            e.target.src="pause.png";
            audio.src="AlanWalker/"+indexSong[index]+".mp3";
            audio.currentTime=0;
            audio.play();
            image.src="pause.png";  
    }
        else if(audio.played && parseInt(e.target.id)!=index){
            audio.pause();
            document.getElementById(String(index)).src="play.png";
            index = parseInt(e.target.id);
            MasterSongName.innerHTML=songs[index].songName;
            image.src="pause.png";  
            audio.src="AlanWalker/"+indexSong[index]+".mp3";
            audio.currentTime=0;
            e.target.src="pause.png";
            gif.style.opacity=1; 
            audio.play();
            } 
            else{
                audio.pause();
                e.target.src="play.png";
                image.src="play.png";  
            }
         })
})
//backward handle button
backward.addEventListener("click",()=>{
    if(index<=0){
        document.getElementById(String(index)).src="play.png";
        index=6;
    }
    else{
        document.getElementById(String(index)).src="play.png";
        index-=1;
    }
    audio.src="AlanWalker/"+indexSong[index]+".mp3";
    MasterSongName.innerHTML=songs[index].songName;
    gif.style.opacity=1;  
    audio.currentTime=0;
    audio.play();
    image.src="pause.png";  
    document.getElementById(String(index)).src="pause.png";
})
//forward handle button
forward.addEventListener("click",()=>
{
    document.getElementById(String(index)).src="play.png";
    if(index>=6){
        index=0;
    }
    else{
        index+=1;
    }
    audio.src="AlanWalker/"+indexSong[index]+".mp3";
    MasterSongName.innerHTML=songs[index].songName;
    gif.style.opacity=1;  
    audio.currentTime=0;
    audio.play();
    image.src="pause.png";  
    document.getElementById(String(index)).src="pause.png";
})
audio.addEventListener("ended",()=>{
        if(index>=6){
            document.getElementById(String(index)).src="play.png";
            index=0;
        }
        else{
            document.getElementById(String(index)).src="play.png";
            index+=1;
        }
        audio.src="AlanWalker/"+indexSong[index]+".mp3";
        MasterSongName.innerHTML=songs[index].songName;
        gif.style.opacity=1;  
        audio.currentTime=0;
        audio.play();
        image.src="pause.png";  
        document.getElementById(String(index)).src="pause.png";
        console.log(myProgressBar.value==100);
    
})
