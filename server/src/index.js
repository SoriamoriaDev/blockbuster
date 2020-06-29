
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './config';
import Middlewares from './api/middlewares'
import Authentication from './api/authentication'
import UserRouter from './user/router'
import MoviesRouter from './movies/router'

const app = express();

mongoose.connect(config.mongoose.uri, { useMongoClient: true })
.catch(err=>console.error(err));

mongoose.Promise = global.Promise;

// App Setup
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));

// App routes
app.get('/ping', (req, res) => res.send('pong'))
app.get('/', (req, res) => res.json('Hello there'))
app.post('/signup', Authentication.signup)
app.post('/signin', Authentication.signin)
app.get('/auth-ping', Middlewares.loginRequired, (req, res) => res.send('connected'))
app.use('/user', Middlewares.loginRequired, UserRouter)
//app.use('/movies', Middlewares.loginRequired, MoviesRouter)
app.use('/movies', MoviesRouter)

// Error Handling
app.use((err, req, res, next) => {
    console.log('Error:', err.message);
    res.status(422).json(err.message);
});

// Server Setup
const port = process.env.PORT || 8000
http.createServer(app).listen(port, ()=>{
    console.log(`\x1b[32m`, `Server listening on: ${port}`, `\x1b[0m`)
});
