'use strict'

const express = require('express');
const router = express.Router();

/***
 *
 * POST /subscribe Create subscription for specified topic
 *
 *
 */
router.post('/subscribe', function(req, res, next) {

    const callback = req.body.callback;
    const mode = req.body.mode;
    const topic = req.body.topic;
    const secret = req.body.secret;

    /***
     *
     *  1. Check if callback, topic combination exists. If it doesn't, create record, if it does, overwrite
     *  2. Verify subscriber intent
     *  3. Response w/ 202 'Accepted' or 4xx 50xx
     *
     */
});

module.exports = router;
