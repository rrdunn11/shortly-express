const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {

    if (JSON.stringify(req.cookies) === '{}') {
         return models.Sessions.create()
         .then( obj => {
             return models.Sessions.get({id: obj.insertId});
         })
         .then(results => {
            res.cookie('shortlyid', results.hash);
            req.session = { 
                hash: results.hash
            };
            next();
        })
    } else {
        return models.Sessions.get({hash: req.cookies.shortlyid})
        .then(result => {
            if (!result) {
                throw result;
            }
            req.session = {
                hash: req.cookies.shortlyid,
            };
            if (result.user) {
                req.session.user =  {
                    username: result.user.username
                };
                req.session.userId = result.userId;
            }
            next();

        })
        .catch(result => {
            req.cookies = {};
            return models.Sessions.create()
            .then( obj => {
                return models.Sessions.get({id: obj.insertId});
            })
            .then(results => {
                res.cookie('shortlyid', results.hash);
                req.session = { 
                    hash: results.hash
                };
                next();
            })
        })
    }
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

