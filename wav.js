fetch('./dogesynth/sample').then((res) => {
    console.log('res')
    console.log(res)
    return res.text()
}).then((text) => {
    console.log('text')
    console.log(text)
})
window.onload = async function(){
    var wavesurfer = WaveSurfer.create({
        container: '#waveform',
        waveColor: 'orange',
        barWidth:1,
        barGap: 1,
        progressColor: 'red'
    });
    wavesurfer.load('./dogesynth/sample')
    document.getElementById("noisebutton").addEventListener('click', function (){
        if(document.getElementById("noisebutton").innerHTML == "OFF"){
            wavesurfer.play();
        } else {
            wavesurfer.pause();
        }
    })
}

