import Album from "./Album";

export default class Track {
    id: number;
    name: string;
    album: Album;
    duration: number;

    constructor(id: number, name: string, album: Album, duration: number) {
        this.id = id;
        this.name = name;
        this.album = album;
        this.duration = duration;
    }
}
