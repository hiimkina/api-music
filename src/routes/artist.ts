import express from 'express';
import ArtistService from "../services/ArtistService";
import Artist from "../model/Artist";

const router = express.Router();
const artistService = new ArtistService();

router.post('/', (req, res, next) => {
    if (req.body.name === undefined) res.sendStatus(400);
    artistService.createArtist(req.body.name).then((result: Artist) => {
        res.send(result);
    })
});

router.get('/', (req, res, next) => {
    if (req.query.name === undefined) res.sendStatus(400);
    artistService.getArtistFromName(req.query.name as string).then((result: Artist|undefined) => {
        if (result) {
            res.send(result);
        } else {
            res.sendStatus(404);
        }
    })
})

module.exports = router;
