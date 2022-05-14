import express from 'express';
import dotenv from 'dotenv';
import chalk from 'chalk';
import exphb from 'express-handlebars';
import cookieParser from 'cookie-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';



// Routes
import waiterRoute from './src/api/components/waiter/waiterRoutes.js';
import manageWaiterRoute from './src/api/components/manager/managerApi.js'
import authRoute from './routes/authRoute.js';

// Initialize express
const app = express();
dotenv.config();


// Import environment variables from .env file
const env = process.env;

//DataBase
const Pool = pg.Pool
const pool = new Pool({
    user: env.username,
    host: env.host,
    database: env.database,
    password: env.password,
    port: env.db_port,
})

// Set __directory
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.json())
app.use(express.urlencoded({extended:false}))

// Set templating engine
app.set('view engine', 'handlebars');
app.engine('handlebars', exphb.engine({defaultLayout:'main'}));
app.set('views', './views');


// Set static content location in express
app.use("/public", express.static(__dirname + '/public'));

// initialize(pool)
app.use("/auth", authRoute);
app.use('/api/waiter', waiterRoute)
app.use('/api/manager/waiters', manageWaiterRoute)

app.get('/', (req, res) => {
    res.render('home');
})

// app.get('/login', (req, res) => {
//     res.render('login');
// })

// Import port from .env file
const port = env.PORT;

// Set port to lisetn on
app.listen(port, () =>{
    console.log(`Listening on port: ${chalk.bgGray(chalk.italic(chalk.blueBright(port)))}`)
})
