'use strict';
var wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: 'violet',
    progressColor: 'purple'
});
fetch('./dogesynth/sample').then((res) => {
    console.log('res')
    console.log(res)
    return res.text()
}).then((text) => {
    console.log('text')
    console.log(text)
})
window.onload = async function(){
    setSample();
    setInterval(() => {
        console.log('new sample')
        setSample();
    }, 60*1000)

    //add event listener
    document.getElementById("noisebutton").addEventListener('click', function (){
        if(document.getElementById("noisebutton").innerHTML == "OFF"){
            document.getElementById("noisebutton").innerHTML = "ON";
            Pizzicato.context.resume();
            oscilator.play();
        } else {
            document.getElementById("noisebutton").innerHTML = "OFF";
            Pizzicato.context.suspend();
            oscilator.stop();

        }
    })
}

