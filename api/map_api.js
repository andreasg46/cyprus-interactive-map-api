const express = require('express');
const router = express.Router();

const Map = require('../entities/map');
const User = require("../entities/user");

router.get('/maps', (req, res) => {
    Map.findAll()
        .then(maps => {
            return res.status(200)
                .setHeader('content-type', 'application/json')
                .send(maps);
        })
        .catch(error => {
            return res.status(500)
                .setHeader('content-type', 'application/json')
                .send({error: `Server error: ${error.name}`});
        });
});

router.post('/map/create', async (req, res) => {
    const posted_map = req.body; // submitted teleport

    Map.create({
        player_id: posted_map.player_id,
        trial: posted_map.trial,
        village: posted_map.village,
        region: posted_map.region,
        co_x: posted_map.co_x,
        co_y: posted_map.co_y,
        co_x_click: posted_map.co_x_click,
        co_y_click: posted_map.co_y_click,
        co_error: posted_map.co_error,
        co_error_x: posted_map.co_error_x,
        co_error_y: posted_map.co_error_y
    })
        .then(map => {
            return res.status(200)
                .setHeader('content-type', 'application/json')
                .send({message: `map data added!`, map: map}); // body is JSON
        })
        .catch(error => {
            return res.status(500)
                .setHeader('content-type', 'application/json')
                .send({error: `Server error: ${error.name}`});
        });
});

router.delete('/map/delete-all', (req, res) => {

    return Map.destroy({
        where: {},
        truncate: true
    })
        .then(map => {
            res.status(200)
                .setHeader('content-type', 'application/json')
                .send({message: `Maps deleted!`});
        })
        .catch(error => {
            res.status(500)
                .setHeader('content-type', 'application/json')
                .send({error: `Server error: ${error.name}`});
        });
});


module.exports = router;