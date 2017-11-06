"use strict";

const rp = require('request-promise');
let request = {}


request.create =  (url, opts) => {

 return new Promise((resolve, reject) => {

     // create new request here
     let options = {
         method: 'POST',
         uri: url,
         headers: {
          'X-Hub-Signature': opts.token,
          'Content-Type': opts.content
         },
         json: true
     }

     rp(options)
         .then( (res) => {
          resolve(res)
         })
         .catch(err => {
          reject(err)
         })

 })
}

module.exports = request;