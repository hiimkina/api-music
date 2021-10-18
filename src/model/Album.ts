import Artist from "./Artist";
import moment, {Moment} from "moment";

export default class Album {
    id?: number;
    name: string;
    artist: Artist;
    creationDate?: Moment;
    releaseDate?: Moment;

    constructor(name: string, artist: Artist, releaseDate?: string, id?: number, creationDate?: string) {
        this.id = id ? id : undefined;
        this.name = name;
        this.artist = artist;
        this.creationDate = creationDate ? moment(creationDate): undefined;
        this.releaseDate = releaseDate ? moment(releaseDate, "YYYY-MM-DD") : undefined;
    }
}
