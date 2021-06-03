var path = require('path');
var express = require('express');
var app = express();
var path = require('path');
var fetch = require('node-fetch')
var fs = require('fs');
var Wavefile = require('wavefile').WaveFile;

const minutelyPriceLastDay = "https://min-api.cryptocompare.com/data/v2/histominute?fsym=BTC&tsym=USD&limit=1439";
const bit32Space = (2**32)-1;
const bit32Offset = Math.floor(bit32Space/2)

const normalizeDecimal = (raw) => {
    var max = 0;
    var min = 999999;
    const vals = raw['Data']['Data'].map((val) => {
        if (val['high'] > max) max = val['high'];
        if (val['high'] < min) min = val['high']
        return val["high"];
    });
    const divider = max-min;
    const normalizedVals = vals.map( val => (val-min)/divider).reverse();
    return normalizedVals; 
}

const minMax = (data) => {
    var min = 999999999999;
    var max = -9999999999;
    data.forEach( (d) => {
        if (d > max) max = d;
        if (d < min) min = d;
    })
    return {max: max, min: min}
}

const normalize32Bit = (data) => {
    return data.map(x => parseInt((x*bit32Space)-bit32Offset))
}

app.get('/', (req, res)=>{
    console.log('bleuugh')
    res.sendFile(path.resolve(__dirname, 'index.html'));
})
.get('/index.js', (req,res)=>{
    res.sendFile(path.resolve(__dirname, 'index.js'));
})
.get('/index.css', (req,res)=>{
    res.sendFile(path.resolve(__dirname, 'index.css'));
})
.get('/btc', (req,res)=>{
    fetch(minutelyPriceLastDay)
        .then(resp => resp.json())
        .then(json => {
            res.json(normalizeDecimal(json));
        });
})
.get('/doge', (req,res)=>{
    var appDir = path.dirname(require.main.filename);
    res.sendFile(`${appDir}/doge.svg`);
})
.get('/dogesynth', (r, res) => {
    console.log('path' + path.resolve(__dirname, 'wav.html'))
    res.sendFile(path.resolve(__dirname, 'wav.html'));
})
.get('/dogesynth/index', (r, res) => {
    res.sendFile(path.resolve(__dirname, 'wav.js'));
})
.get('/dogesynth/sample', (req, res) => {
    //convert dogesynth to wav
    let wav = new Wavefile();
    fetch(minutelyPriceLastDay)
        .then(resp => resp.json())
        .then(json => {
            //convert to 32-bit
            const data = normalize32Bit(normalizeDecimal(json));
            console.log(data)
            console.log(minMax(data))
            wav.fromScratch(1, 44100, '32', data);
            const pathname = path.resolve(__dirname, 'doge1.wav');
            fs.writeFileSync(pathname, wav.toBuffer());
            res.sendFile(pathname);
        });
})
.listen(8080, ()=>{
    console.log('listening on 8080');
});
