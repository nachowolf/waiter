import express from 'express';
import dotenv from 'dotenv';
import chalk from 'chalk';
import exphb from 'express-handlebars';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Initialize express
const app = express();
dotenv.config();

// Set __directory
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


// Set templating engine
app.set('view engine', 'handlebars');
app.engine('handlebars', exphb.engine({defaultLayout:'main'}));
app.set('views', './views');

// Set static content location in express
// app.use('./static', express.static(path.join(__dirname, './public')))
app.use(express.static(__dirname + '/public'));

// console.log((path.join(__dirname, 'public/js')))



app.get('/', (req, res) => {
    res.render('home');
})

// Import port from .env file
const port = process.env.PORT;

// Set port to lisetn on
app.listen(port, () =>{
    console.log(`Listening on port: ${chalk.bgGray(chalk.italic(chalk.blueBright(port)))}`)
})
