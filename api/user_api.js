const express = require('express');
const router = express.Router();

const db = require('../db/configDB');

const User = require('../entities/user');

router.get('/users', (req, res) => {
    User.findAll()
        .then(users => {
            return res.status(200)
                .setHeader('content-type', 'application/json')
                .send(users);
        })
        .catch(error => {
            return res.status(500)
                .setHeader('content-type', 'application/json')
                .send({error: `Server error: ${error.name}`});
        });
});

router.post('/user/create', async (req, res) => {
    const posted_user = req.body; // submitted teleport

    User.create({
        id: posted_user.id,
        age: posted_user.age,
        location: posted_user.location,
        gender: posted_user.gender,
        nationality: posted_user.nationality,
        language: posted_user.language
    })
        .then(user => {
            return res.status(200)
                .setHeader('content-type', 'application/json')
                .send({message: `user added!`, user: user});
        })
        .catch(error => {
            return res.status(500)
                .setHeader('content-type', 'application/json')
                .send({error: `Server error: ${error.name}`});
        });
});

router.put('/user/update/:id', (req, res) => {
    const {id} = req.params;
    const posted_user = req.body;

    return db.transaction(async (t) => {
        if (isNaN(id)) {
            return res.status(422)
                .setHeader('content-type', 'application/json')
                .send({error: `ID is non-numeric!`});
        }

        const user = await User.findOne({where: {id: id}})

        if (!user) {
            return res.status(404)
                .setHeader('content-type', 'application/json')
                .send({error: `User with id ${id} not found!`});
        }

        if (posted_user.age)
            user.age = posted_user.age;

        if (posted_user.location)
            user.location = posted_user.location;

        if (posted_user.gender)
            user.gender = posted_user.gender;

        if (posted_user.nationality)
            user.nationality = posted_user.nationality;

        if (posted_user.language)
            user.language = posted_user.language;

        return user.save({transaction: t})
            .then(user => {
                res.status(200)
                    .setHeader('content-type', 'application/json')
                    .send({message: `User updated!`, user: user});
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

router.delete('/users/delete-all', (req, res) => {

    return User.destroy({
        where: {},
        truncate: true
    })
        .then(user => {
            res.status(200)
                .setHeader('content-type', 'application/json')
                .send({message: `Users deleted!`});
        })
        .catch(error => {
            res.status(500)
                .setHeader('content-type', 'application/json')
                .send({error: `Server error: ${error.name}`});
        });
});


module.exports = router;