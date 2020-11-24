import ytdl from 'ytdl-core';
import fs = require('fs');
import * as readline from 'readline';
import { LiteFormat } from './model/lite-format';


let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

console.log('you can paste into the command prompt by right clicking.');
rl.question('please input the link to the YouTube video you wish to download: ', (url) => {
    new Promise((resolve, reject) => {
        let title: string;
        ytdl.getInfo(url).then((result) => {
            title = result.videoDetails.title.replace(/[^a-zA-Z0-9 ]/g, '');
            let liteFormats: LiteFormat[] = [];
            result.formats.forEach(format => {
                liteFormats.push(new LiteFormat(
                    format.itag, format.container, format.qualityLabel, format.codecs, format.bitrate, format.audioBitrate
                ));
            });
            liteFormats.sort((a, b) => a.itag < b.itag ? -1 : a.itag > b.itag ? 1 : 0);
            console.table(liteFormats);
            rl.question('please input the desired format itag: ', (itag) => {
                console.log("Downloading...");
                resolve(ytdl(url, {quality:itag})
                .pipe(fs.createWriteStream("output/[" + Math.floor(Date.now() / 1000 % 1000000) + "] " + title + ".mp4"))
                .on('finish', () => {
                    rl.question("Finished! Press Enter to quit.", () => {
                        process.exit();
                    })
                }));
            });
        });
    }).catch((err) => {
        console.log(err);
    });
});