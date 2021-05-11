#!/bin/bash
wget -O btc_raw.json "https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=10&allData=true"
if [[ $? -ne 0 ]]; then
    echo "wget failed: ${$?}"
    exit 1
fi
node normalize_btc.js
if [[ $? -ne 0 ]]; then
    echo "normalize failed: ${$?}"
    exit 1
fi
exit 0
