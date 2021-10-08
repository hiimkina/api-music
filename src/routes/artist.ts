import express, {Request} from 'express';
import ArtistService from "../services/ArtistService";

const router = express.Router();
const artistService = new ArtistService();

router.post('/', function(req, res, next) {
    if (req.body.name === null) res.sendStatus(400);
    artistService.createArtist(req.body.name);
    res.send('respond with a resource');
});

module.exports = router;
