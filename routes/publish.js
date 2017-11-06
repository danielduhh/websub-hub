'use strict'

const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const dbbinding = require('../db');
const request = require ('../helpers/request');

/**
 * POST /publish is responsible for content distribution
 */

router.post('/publish', function(req, res, next) {

    /**
     *
     * 1. Get topic url from request
     * 2. Check datastore for metadata for given topic url & list of subscriptions (and metadata) for topic
     * 3. Distribute data to all subscribers
     *
     */

    const host = req.get('host');
    const topic_url = req.query.topic_url || '';
    const content = req.get('content-type');
    const payload = req.body;
    const db = dbbinding.get();

    db.one('SELECT * from vw_topic_details WHERE topic_url = ${topic_url}', {topic_url})
        .then(result => {
            let topic = result;
            // we have our list of subscriptions
            let subscriptions = result.subscriptions;
            let requests = [];

            subscriptions.forEach(subscription => {
                // create request promises
                let secret = subscription.secret;
                // TODO use duration for token expiration
                // generate hmac signature w/ secret from each subscription, based on secret
                let token = jwt.sign(payload, secret, {
                    algorithm: 'HS256',
                    expiresIn: '1h'
                });

                // create request promises
                requests.push(request.create(subscription.callback, {token: token, content: content}))
            })

            Promise.all(requests)
                .then((response) => {
                    console.log(response);
                })
                .catch(error => {
                    // use error middleware
                    res.status(500).json({error: error.error.message, status: 500});
                })


        })
        .catch(error => {
            next(error)
        })

});

module.exports = router;
