#!/bin/bash
wget -O btc_raw.json "https://apiv2.bitcoinaverage.com/indices/global/history/BTCUSD?period=alltime"
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
