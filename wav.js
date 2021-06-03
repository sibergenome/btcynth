window.onload = async function(){
    var wavesurfer = WaveSurfer.create({
        container: '#waveform',
        waveColor: 'red',
        barWidth:1,
        barGap: 1,
        progressColor: 'orange'
    });
    setInterval(() => {wavesurfer.load('./dogesynth/sample')}, 60*1000)
    wavesurfer.load('./dogesynth/sample')
    document.getElementById("noisebutton").addEventListener('click', function (){
        wavesurfer.play();
    })
}

