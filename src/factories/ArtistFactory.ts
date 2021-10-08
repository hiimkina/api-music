import Artist from "../model/Artist";

export default class ArtistFactory {
    createArtist(name: string):Artist {
        return new Artist(name);
    }
}
