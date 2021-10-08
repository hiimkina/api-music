import express from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/health', function(req, res, next) {
    res.send('OK');
})

module.exports = router;
