const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Client }  = require('../Models/client');

//=> localhost:3000/clients/
router.get('/', (req, res) => {
    Client.find((err, docs) => {
        if (!err) {res.send(docs);}
        else {
            console.log('Error in retrieving clients ' + JSON.stringify(err, undefined, 2))
        }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No records with the given id : ${req.params.id}`);
    
    Client.findById(req.params.id, (err, docs) => {
        if (!err) {res.send(docs);}
        else {
            console.log('Error in retrieving clients ' + JSON.stringify(err, undefined, 2))
        }
    });
});

router.post('/', (res, req) => {
    var clnt = new Client({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        gender: req.body.gender,
        image: req.body.email
    });
    clnt.save((err, doc) => {
        if (!err) { res.send(doc); }
        else{
            console.log('Error in client save: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No records with the given id : ${req.params.id}`);
    
    var clnt = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        gender: req.body.gender,
        image: req.body.email
    }
    Client.findByIdAndUpdate(req.params.id, { $set: clnt }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc) }
        else { console.log('Error in client update: ' + JSON.stringify(err, undefined, 2)); }
    });
    
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No records with the given id : ${req.params.id}`);

    Client.findByIdAndDelete(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else {
            console.log('Error in client Delete : ' + JSON.stringify(err, undefined, 2));
        }
    });
});

module.exports = router;