'use strict';
var btc;
var samp_length;
var pos = 0;
function waveform(e) {
    var i = 0, output = e.outputBuffer.getChannelData(0);
    while (i < output.length) {
        output[i] = btc[pos];
        if (pos < samp_length) pos = pos + 1;
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
    var res = await fetch('./btc');
    if (!res.ok) {
        console.log("BTC req failed: ", res);
        return;
    }
    btc = await res.json();
    samp_length = btc.length;
}

window.onload = async function () {
    await setSample();
    setInterval(async () => {
        console.log('new sample')
        await setSample();
    }, 60 * 1000)

    var trace1 = {
        x: [...Array(1440).keys()],
        y: btc,
        type: 'scatter'
    };

    var data = [trace1];

    // Plotly.newPlot('myChart', data);

    //add event listener
    document.getElementById("noisebutton").addEventListener('click', function () {
        if (document.getElementById("noisebutton").innerHTML == "OFF") {
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

