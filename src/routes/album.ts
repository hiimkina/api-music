import express from 'express';
import AlbumService from "../services/AlbumService";
import Album from "../model/Album";

const router = express.Router();
const albumService = new AlbumService();

router.post('/', (req, res, next) => {
    if (req.body.name === undefined || req.body.artistId === undefined) res.sendStatus(400);
    albumService.createAlbum(req.body.name, req.body.artistId, req.body.releaseDate ? req.body.releaseDate : undefined)
        .then((result: Album) => {
            res.send(result);
        })
        .catch((error: Error) => {
            if (error.message === "Album already exists !") {
                res.status(409).send(error.message);
            } else {
                res.status(500).send(error.message);
            }
        })
});

router.get('/', (req, res, next) => {
    if (req.query.name === undefined || req.query.artistId === undefined) res.sendStatus(400);
    albumService.getAlbumFromNameAndArtist(req.query.name as string, Number(req.query.artistId)).then((result: Album|undefined) => {
        if (result !== undefined) {
            res.send(result);
        } else {
            res.sendStatus(404);
        }
    })
})

module.exports = router;
