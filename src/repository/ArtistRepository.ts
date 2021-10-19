import mysql, {MysqlError, Pool, PoolConnection} from 'mysql';
import Artist from "../model/Artist";

const CONFIG = require('../config/config.json');

export default class ArtistRepository {
    connectionPool: Pool;

    constructor() {
        this.connectionPool = mysql.createPool(CONFIG.mysql);
    }

    create(artist: Artist):Promise<number> {
        return new Promise((resolve) => {
            this.connectionPool.getConnection((error: MysqlError, connection: PoolConnection) => {
                if (error) throw new Error(`Error connecting to MySQL: ${error.message}`);
                let query = `INSERT INTO artists (name) VALUES ('${artist.name}')`;
                connection.query(query, (error: MysqlError, result) => {
                    connection.release();
                    if (error) throw new Error(`Error inserting an artist: ${error.message}`);
                    resolve(result.insertId);
                })
            });
        });
    }

    getFromTrackId(trackId: number):Promise<Array<Artist>>  {
        return new Promise((resolve) => {
            this.connectionPool.getConnection((error: MysqlError, connection: PoolConnection) => {
                if (error) throw new Error(`Error connecting to MySQL: ${error.message}`);
                let query = `SELECT * FROM artists WHERE id IN (SELECT artist_id FROM tracks_to_artists WHERE track_id=${trackId})`;
                connection.query(query, (error: MysqlError, result) => {
                    connection.release();
                    if (error) throw new Error(`Error inserting an artist: ${error.message}`);
                    resolve(result);
                })
            });
        });
    }

    getFromId(id: number):Promise<Artist|undefined> {
        return new Promise((resolve) => {
            this.connectionPool.getConnection((error: MysqlError, connection: PoolConnection) => {
                if (error) throw new Error(`Error connecting to MySQL: ${error.message}`);
                let query = `SELECT * FROM artists WHERE id='${id}'`;
                connection.query(query, (error: MysqlError, results: Array<Artist>) => {
                    connection.release();
                    if (error) throw new Error(`Error getting an artist: ${error.message}`);
                    resolve(results.length === 1 ? results.pop() : undefined);
                })
            })}
        );
    }

    getFromName(name: string):Promise<Artist|undefined> {
        return new Promise((resolve) => {
            this.connectionPool.getConnection((error: MysqlError, connection: PoolConnection) => {
                if (error) throw new Error(`Error connecting to MySQL: ${error.message}`);
                let query = `SELECT * FROM artists WHERE name='${name}'`;
                connection.query(query, (error: MysqlError, results: Array<Artist>) => {
                    connection.release();
                    if (error) throw new Error(`Error getting an artist: ${error.message}`);
                    resolve(results.length === 1 ? results.pop() : undefined);
                })
            })}
        );
    }
}
