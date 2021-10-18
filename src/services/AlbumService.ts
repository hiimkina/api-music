import AlbumFactory from "../factories/AlbumFactory";
import AlbumRepository from "../repository/AlbumRepository";
import Album from "../model/Album";

export default class AlbumService {
    albumFactory: AlbumFactory;
    albumRepository: AlbumRepository;

    constructor() {
        this.albumFactory = new AlbumFactory();
        this.albumRepository = new AlbumRepository();
    }

    async createAlbum(name: string, artistId: number, releaseDate?: string):Promise<Album> {
        if (!await this.checkIfAlbumExists(name, artistId)) {
            let album:Album = await this.albumFactory.createAlbum(name, artistId, releaseDate);
            album.id = await this.albumRepository.create(album);
            return album;
        } else {
            throw new Error('Album already exists !');
        }
    }

    async getAlbumFromId(id: number):Promise<Album|undefined> {
        return await this.albumRepository.getAlbumFromId(id);
    }

    async getAlbumFromNameAndArtist(name: string, artistId: number):Promise<Album|undefined> {
        return await this.albumRepository.getAlbumFromNameAndArtist(name, artistId);
    }

    async checkIfAlbumExists(name: string, artistId: number):Promise<boolean> {
        return await this.albumRepository.getAlbumFromNameAndArtist(name, artistId) !== undefined;
    }
}
