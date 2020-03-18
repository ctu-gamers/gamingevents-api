const express = require('express');
const gamesController = require('./../controllers/gamesController');

const router = express.Router();

router.get('/popular-games', gamesController.getPopularGames);

module.exports = router;
