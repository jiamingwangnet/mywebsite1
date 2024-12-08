let playlistCur = 0;
let length = document.querySelectorAll(".audio").length;

function playpause(btn)
{   
    const audio = document.querySelector("#audio_"+playlistCur);
    if(audio.paused) 
    {
        audio.play();
        btn.innerText = "⏸︎";
    }
    else 
    {
        audio.pause();
        btn.innerText = "⏵︎";
    }
}

function tryPlayNext()
{
    playlistCur++;
    if(playlistCur == length) playlistCur = 0;

    playpause(document.querySelector("#playpause"));
    setProgress();
    displayAudioInfo();
}

function displayAudioInfo()
{
    const audio = document.querySelector("#audio_"+playlistCur);
    let str = audio.dataset.name + ' - ' + audio.dataset.artists;

    document.querySelector("#data").innerText = str;

    document.querySelector("#listprog").innerText = (playlistCur + 1) + "/" + length;
}

function setProgress() {
    const audio = document.querySelector("#audio_"+playlistCur);
    document.querySelector("#progress").value = audio.currentTime / audio.duration * 100;
}

setInterval(setProgress, 500);

function userSetProgress(slider) {
    const audio = document.querySelector("#audio_"+playlistCur);
    audio.currentTime = slider.value / 100 * audio.duration;
    if(audio.paused) {playpause(document.querySelector("#playpause"))}
}

displayAudioInfo();