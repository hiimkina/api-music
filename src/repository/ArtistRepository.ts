import mysql, {Connection, MysqlError} from 'mysql';
import Artist from "../model/Artist";

const CONFIG = require('../config/config.json');

export default class ArtistRepository {
    connection: Connection;

    constructor() {
        this.connection = mysql.createConnection(CONFIG.mysql);
    }

    create(artist: Artist):void {
        this.connection.connect((error: MysqlError) => {
            if (error) throw new Error(`Error connecting to MySQL: ${error.message}`);
            let query = `INSERT INTO artists (name) VALUES ('${artist.name}')`;
            this.connection.query(query, (error) => {
                if (error) throw new Error(`Error inserting an artist: ${error.message}`)
            })
        });
    }
}
