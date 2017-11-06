'use strict'

const app = require('./app');

// Start the API listening
app.listen(4000, function(){
    console.log(`API listening on port 4000`);
}).on('error', function(err){
    console.log(`Failed to start API:\n${err}`);
    process.exit(1);
});