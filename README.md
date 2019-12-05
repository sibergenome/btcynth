# btcynth
The actual webpage for this brutally minimalist project, following true to its purpose, doesn't describe its inner workings (in spite of its simplicity).
<br/><br/>
Firstly, this absolute horror show of a personal github project makes use of pizzicato.js, which greatly simplifies the audiobuffer insertions. The idea is to host the indexes, run get_latest.bash every now and then, and then serve the btc.json. The js that runs in the browser simply waits for user input, then pumps the normalized btc data as a waveform into the audiobuffer. Ezipezi.
<br/><br/>
On the million-to-one chance that someone actually actually clones this, you'll have to create your own server. I just used express.js for my own.
<br/><br/>
Just to get technical for a wee second, there have been over 3400 weeks in BTC's lifetime. Audio is sampled at 44100Hz, so this utter disappointment of an online audio contraption samples at approx. 13Hz (and exponentially decreasing, if you catch my drift). FYI I intend on making some cron jobs for this, and maybe at some point building a fully-fledged bitcoin synthesizer that uses pitchshifting to actually sample at 220Hz etc, and maybe chuck in a filter or two.
