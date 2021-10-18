import mysql, {MysqlError, Pool, PoolConnection} from "mysql";
import Album from "../model/Album";


const CONFIG = require('../config/config.json');

export default class AlbumRepository {
    connectionPool: Pool;

    constructor() {
        this.connectionPool = mysql.createPool(CONFIG.mysql);
    }

    create(album: Album):Promise<number> {
        return new Promise((resolve) => {
            this.connectionPool.getConnection((error: MysqlError, connection: PoolConnection) => {
                if (error) throw new Error(`Error connecting to MySQL: ${error.message}`);
                console.log(album.releaseDate);
                let query = album.releaseDate
                    ? `INSERT INTO albums (name, artist_id, release_date) VALUES ('${album.name}', '${album.artist.id}', '${album.releaseDate.format('YYYY-MM-DD HH:mm:ss')}')`
                    : `INSERT INTO albums (name, artist_id) VALUES ('${album.name}', '${album.artist.id}')`;
                connection.query(query, (error: MysqlError, result) => {
                    connection.release();
                    if (error) throw new Error(`Error inserting an album: ${error.message}`);
                    resolve(result.insertId);
                })
            });
        });
    }

    getAlbumFromNameAndArtist(name: string, artistId: number):Promise<Album|undefined> {
        return new Promise((resolve) => {
            this.connectionPool.getConnection((error: MysqlError, connection: PoolConnection) => {
                if (error) throw new Error(`Error connecting to MySQL: ${error.message}`);
                let query = `SELECT * FROM albums WHERE name='${name}' AND artist_id='${artistId}'`;
                connection.query(query, (error: MysqlError, results: Array<Album>) => {
                    connection.release();
                    if (error) throw new Error(`Error inserting an album: ${error.message}`);
                    resolve(results.length === 1 ? results.pop() : undefined);
                })
            })
        });
    }

    getAlbumFromId(id: number):Promise<Album|undefined> {
        return new Promise((resolve) => {
            this.connectionPool.getConnection((error: MysqlError, connection: PoolConnection) => {
                if (error) throw new Error(`Error connecting to MySQL: ${error.message}`);
                let query = `SELECT * FROM albums WHERE id='${id}'`;
                connection.query(query, (error: MysqlError, results: Array<Album>) => {
                    connection.release();
                    if (error) throw new Error(`Error getting an album: ${error.message}`);
                    resolve(results.length === 1 ? results.pop() : undefined);
                })
            })
        })
    }

}
