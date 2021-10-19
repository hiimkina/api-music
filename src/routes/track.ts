import express from 'express';
import TrackService from "../services/TrackService";
import Track from "../model/Track";

const router = express.Router();
const trackService = new TrackService();

router.post('/', (req, res, next) => {
    if (req.body.name === undefined || req.body.albumId === undefined || req.body.artists === undefined || req.body.duration === undefined || req.files === undefined) res.sendStatus(400);
    trackService.createTrack(req.body.name, req.body.albumId, req.body.duration, req.body.artists, req.files)
        .then((result: Track) => {
            res.send(result);
        })
        .catch((error: Error) => {
            res.status(500).send(error.message);
        })
})

router.get('/', (req, res, next) => {
    if (req.query.name === undefined || req.query.albumId === undefined) res.sendStatus(400);
    trackService.streamTrack(req.query.name as string, Number(req.query.albumId)).then((path: string) => {
        res.sendFile(path, {root: `${__dirname}/../..`});
    }).catch((error) => {
        res.send(error);
    });
})

module.exports = router;
