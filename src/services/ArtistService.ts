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

    createArtist(name: string):void {
        let artist:Artist = this.artistFactory.createArtist(name);
        this.artistRepository.create(artist);
    }
}
