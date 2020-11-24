export interface LiteFormat {
    itag:number;
    container:string;
    qualityLabel: string;
    codecs:string;
    bitrate?:number;
    audioBitrate?: number;
}

export class LiteFormat {
    constructor(
        public itag: number,
        public container: string,
        public qualityLabel: string,
        public codecs: string,
        public bitrate?: number,
        public audioBitrate?: number
    ) {}
}