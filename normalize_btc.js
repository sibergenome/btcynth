var raw = require('./btc_raw.json');
var fs = require('fs');
var data = {
    min: 0.5,
    max: 0,
    length: raw.length,
}
var max = 0;
var vals = raw["Data"]["Data"].map((val) => {
    if (val["high"] > max) max = val["high"];
    return val["high"];
});
fs.writeFile("btc.json", JSON.stringify(vals), e =>{if(e) console.log(e)});
