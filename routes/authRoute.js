import express from 'express';
import AuthService from './../src/services/AuthService.js'

const authRoute = express.Router();
var authService;

export function initialize(db){
    AuthService(db);
}

    authRoute.route('/login').get((req, res) => {
        res.render('login')
    })
    
    authRoute.route('/log-in').post(async (req, res) => {
        res.json(req.body)
        var s = await authService.createUser(req.body)
        // console.log(s)
    
        var t = await authService.loginCheck(req.body);
        console.log (t)
    })
    
    authRoute.route('/users').get(async (req, res) => {
        res.json(await authService.getUsers())
    })







export default authRoute

// oh honey
// dont let your head down
// no need to frown

// and when darkness comes and hangs it's coat 
// on your heavy mind, your heavy heart
// we'll shake it all off
// you can fall into my arms
// a dozen times or more 
// and you'll eb fine

