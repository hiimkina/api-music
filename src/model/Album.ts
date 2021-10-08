import Artist from "./Artist";
import moment, {Moment} from "moment";

export default class Album {
    id: number;
    name: string;
    artist: Artist;
    creationDate: Moment;
    releaseDate?: Moment;

    constructor(id: number, name: string, artist: Artist, creationDate: string, releaseDate?: string) {
        this.id = id;
        this.name = name;
        this.artist = artist;
        this.creationDate = moment(creationDate);
        this.releaseDate = releaseDate ? moment(releaseDate) : undefined;
    }
}
