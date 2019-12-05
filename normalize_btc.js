var raw = require('./btc_raw.json');
var fs = require('fs');
var data = {
    min: 0.5,
    max: 19325.94,
    length: raw.length,
}
var max = 0;
var vals = raw.map(week => {if (week.average > max){max = week.average};return week.average/data.max});
data["vals"] = vals.reverse();
fs.writeFile("btc.json", JSON.stringify(data), e =>{if(e) console.log(e)});
