'use strict';
var btc;
var samp_length;
var pos = 0;
function waveform(e){
    var i = 0, output = e.outputBuffer.getChannelData(0);
    while(i < output.length) {
        output[i] = btc[pos];
        if (pos < samp_length) pos = pos+1;
        else pos = 0;
        i++;
    }
}
var oscilator = new Pizzicato.Sound({
    source: 'script',
    bufferSize: 1024,
    volume: 0.8,
    attack: 0.4,
    release: 0,
    options: {
        audioFunction: waveform
    }
});

const setSample = async () => {
    // fetch('./btc').then(async(res)=>{
    //     if (res.ok) return await res.json();
    //     else console.log("BTC req failed: ", res);
    // }).then(res => {
    //     console.log(res)
    //     btc = res;
    //     samp_length = btc.length;
    // });
    var res = await fetch('./btc');
    if (!res.ok) {
        console.log("BTC req failed: ", res);
        return;
    }
    btc = await res.json();
    console.log(btc)
    samp_length = btc.length;
}

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

