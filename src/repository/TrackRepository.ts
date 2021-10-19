import mysql, {MysqlError, Pool, PoolConnection} from "mysql";
import Track from "../model/Track";

const CONFIG = require('../config/config.json');

export default class TrackRepository {
    connectionPool: Pool;

    constructor() {
        this.connectionPool = mysql.createPool(CONFIG.mysql);
    }

    create(track: Track):Promise<number> {
        return new Promise((resolve) => {
            this.connectionPool.getConnection((error: MysqlError, connection: PoolConnection) => {
                if (error) throw new Error(`Error connecting to MySQL: ${error.message}`);
                let query = `INSERT INTO tracks (name, album_id, duration) VALUES ('${track.name}', '${track.album.id}', '${Math.floor(track.duration/60)}:${track.duration%60}')`;
                connection.query(query, (error: MysqlError, result) => {
                    connection.release();
                    if (error) throw new Error(`Error inserting a track: ${error.message}`);
                    resolve(result.insertId);
                })
            });
        });
    }

    addArtistToTrack(trackId: number, artistId: number):void {
        this.connectionPool.getConnection((error: MysqlError, connection: PoolConnection) => {
            if (error) throw new Error(`Error connecting to MySQL: ${error.message}`);
            let query = `INSERT INTO tracks_to_artists (track_id, artist_id) VALUES ('${trackId}', '${artistId}')`;
            connection.query(query, (error: MysqlError) => {
                connection.release();
                if (error) throw new Error(`Error adding an artist to a track: ${error.message}`);
            })
        })
    }

    getFromNameAndAlbumId(name: string, albumId: number):Promise<Track|undefined> {
        return new Promise((resolve) => {
            this.connectionPool.getConnection((error: MysqlError, connection: PoolConnection) => {
                if (error) throw new Error(`Error connecting to MySQL: ${error.message}`);
                let query = `SELECT * FROM tracks WHERE name='${name}' AND album_id=${albumId}`;
                console.log(query);
                connection.query(query, (error: MysqlError, results: Array<Track>) => {
                    connection.release();
                    if (error) throw new Error(`Error getting a track: ${error.message}`);
                    resolve(results.length === 1 ? results.pop() : undefined);
                })
            });
        });
    }
}
