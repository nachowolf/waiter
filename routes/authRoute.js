import express from 'express';

const authRoute = express.Router();



authRoute.route('/login').get((req, res) => {
    res.render('login')
})

authRoute.route('/log-in').post((req, res) => {
    res.json(req.body)
})



export default authRoute


