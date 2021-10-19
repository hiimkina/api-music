import Album from "./Album";
import Artist from "./Artist";
import ArtistService from "../services/ArtistService";

export default class Track {
    id?: number;
    name: string;
    album: Album;
    duration: number;
    artists: Array<Artist>

constructor(name: string, album: Album, duration: number, artists: Array<Artist>, id?: number) {
        this.id = id ? id : undefined;
        this.name = name;
        this.album = album;
        this.duration = duration;
        this.artists = artists;
    }
}
