const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Location = require('../models/location');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');

const jwtMW = exjwt({
    secret: 'nesin secret key'
})

router.get('/', function(req, res){
 res.render('home.ejs');
});

router.get('/login', function(req, res){
    res.render('login.ejs');
});

router.post('/login', function(req, res){
    const mail = req.body.mail;
    const password = req.body.password;

    User.findOne({ mail: mail }).then((user) => {
        if(!user){
            return res.json({
                error: true,
                message: 'Korisnik nije pronadjen'
            });
        }

        else if(password != user.password){
            return res.json({
                error: true,
                message: 'Pogresna lozinka'
            });
        }

        else{
            let token = jwt.sign({ id: user._id, mail: mail }, 'nesin secret key', { expiresIn: 129600 });
            return res.json({
                error: false,
                token: token
            });
        }
    });
});

router.get('/destinations', function(req, res){
    Location.find({}).then((locations) => {
        res.locals = {
            locations: locations
        }
        res.render('destinations.ejs');
    });
});

router.post('/register', function(req, res){
    const mail = req.body.mail;
    const password = req.body.password;

    User.create({
        mail: mail,
        password: password
    }).then((user) => {
        console.log('Created user: ', user);
        res.send('user successfully created');
    });
});

router.get('/create-locations/:name', function(req, res){
    Location.findOneAndUpdate({ name: req.params.name }, {
        name: req.params.name,
        dates: ['21.06.2020.', '30.07.2020.', '14.08.2020.']
    }, { upsert: true }).then(() => {
        res.end();
    });
});



router.delete('/locations/:name/:date', function(req, res){
    Location.updateOne({ name: req.params.name }, { $pull: { dates: req.params.date } }).then(() => {
        res.end();
    });
})

router.get('/placanje', function(req,res){
    res.render('placanje.ejs');
});

module.exports = router;