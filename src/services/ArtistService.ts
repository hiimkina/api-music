import ArtistFactory from "../factories/ArtistFactory";
import Artist from "../model/Artist";
import ArtistRepository from "../repository/ArtistRepository";

export default class ArtistService {
    artistFactory: ArtistFactory;
    artistRepository: ArtistRepository;

    constructor() {
        this.artistFactory = new ArtistFactory();
        this.artistRepository = new ArtistRepository();
    }

    async createArtist(name: string):Promise<Artist> {
        let artist: Artist|undefined = await this.getArtistFromName(name);
        if (artist === undefined) {
            let artist:Artist = this.artistFactory.createArtist(name);
            artist.id = await this.artistRepository.create(artist);
            return artist;
        } else {
            throw new Error("Artist already exists");
        }
    }

    async getArtistFromId(id: number):Promise<Artist|undefined> {
        return this.artistRepository.getFromId(id);
    }

    async getArtistFromName(name: string):Promise<Artist|undefined> {
        return this.artistRepository.getFromName(name);
    }
}
