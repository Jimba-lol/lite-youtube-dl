import { LiteFormat } from '../model/lite-format';
import ytdl from 'ytdl-core';

export class YouTubeService {
    constructor() {}

    public getTitle(input: ytdl.videoInfo): string {
        return input.videoDetails.title.replace(/[^a-zA-Z0-9 ]/g, '');
    }

    public getLiteFormats(input: ytdl.videoInfo): LiteFormat[] {
        let liteFormats: LiteFormat[] = [];
        input.formats.forEach(format => {
            liteFormats.push(new LiteFormat(
                format.itag, format.container, format.qualityLabel, format.codecs, format.bitrate, format.audioBitrate
            ));
        });
        liteFormats.sort((a, b) => a.itag < b.itag ? -1 : a.itag > b.itag ? 1 : 0);
        return liteFormats;
    }
}