const express = require('express');
const router = express.Router();

const db = require('../db/configDB');

const Trial = require('../entities/trial');

router.get('/trial/:id', (req, res) => {
    const {id} = req.params;

    Trial.findOne({where: {id: id}})
        .then(trial => {
            if (!trial) {
                return res.status(404)
                    .setHeader('content-type', 'application/json')
                    .send({error: `Trial not found for id: ${id}!`});
            }
            return res.status(200)
                .setHeader('content-type', 'application/json')
                .send(trial);
        })
        .catch(error => {
            return res.status(500)
                .setHeader('content-type', 'application/json')
                .send({error: `Server error: ${error.name}`});
        });
});

router.post('/trial/create', async (req, res) => {
    const posted_trial = req.body; // submitted teleport

    Trial.create({
        id: posted_trial.id,
        numOfTrials: posted_trial.numOfTrials,
    })
        .then(trial => {
            return res.status(200)
                .setHeader('content-type', 'application/json')
                .send({message: `Trial added!`, trial: trial});
        })
        .catch(error => {
            return res.status(500)
                .setHeader('content-type', 'application/json')
                .send({error: `Server error: ${error.name}`});
        });
});

router.put('/trial/update/:id', (req, res) => {
    const {id} = req.params;
    const posted_trial = req.body;

    return db.transaction(async (t) => {
        if (isNaN(id)) {
            return res.status(422)
                .setHeader('content-type', 'application/json')
                .send({error: `ID is non-numeric!`});
        }

        const trial = await Trial.findOne({where: {id: id}})

        if (!trial) {
            return res.status(404)
                .setHeader('content-type', 'application/json')
                .send({error: `Trial with id ${id} not found!`});
        }

        if (posted_trial.numOfTrials)
            trial.numOfTrials = posted_trial.numOfTrials;

        return trial.save({transaction: t})
            .then(user => {
                res.status(200)
                    .setHeader('content-type', 'application/json')
                    .send({message: `Trial updated!`, trial: trial});
            })
            .catch(error => {
                if (error.name === 'SequelizeUniqueConstraintError') {
                    res.status(409)
                        .setHeader('content-type', 'application/json')
                        .send({error: `Conflict exists!`});
                }
            });
    })
        .catch(error => {
            res.status(500)
                .setHeader('content-type', 'application/json')
                .send({error: `Server error: ${error.name}`});
        });
});

router.delete('/trial/delete-all', (req, res) => {

    return Trial.destroy({
        where: {},
        truncate: true
    })
        .then(trial => {
            res.status(200)
                .setHeader('content-type', 'application/json')
                .send({message: `Trial deleted!`});
        })
        .catch(error => {
            res.status(500)
                .setHeader('content-type', 'application/json')
                .send({error: `Server error: ${error.name}`});
        });
});


module.exports = router;