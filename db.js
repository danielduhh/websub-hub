const settings = require('./settings');
const initOptions = {

    // pg-promise initialization options...

    connect(client, dc, isFresh) {
        const cp = client.connectionParameters;
        console.log('Connected to database:', cp.database);
    }

};

const pgp = require ('pg-promise')(initOptions)
const db = pgp(settings.development.db)

const get = () => {
    return db;
}


module.exports = {get}