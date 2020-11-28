import ytdl from 'ytdl-core';
import fs = require('fs');
import * as readline from 'readline';
import { LiteFormat } from './model/lite-format';
import { ffmpeg } from 'fluent-ffmpeg';
import { YouTubeService } from './service/you-tube-service';
import { FfmpegService } from './service/ffmpeg-service';


let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let yts = new YouTubeService();
let ffs = new FfmpegService();

console.log('you can paste into the command prompt by right clicking.');
rl.question('please input the link to the YouTube video you wish to download: ', (url) => {
    new Promise((resolve, reject) => {
        ytdl.getInfo(url).then((result) => {
            if (reject) reject("URL not valid.");
            console.table(yts.getLiteFormats(result));
            rl.question('please input the desired format itag: ', (itag) => {
                console.log("Downloading...");
                resolve(ytdl(url, {quality:itag})
                .pipe(fs.createWriteStream("output/[" + Math.floor(Date.now() / 1000 % 1000000) + "] " + yts.getTitle(result) + ".mp4"))
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