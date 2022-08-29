const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/sigin');
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: true
    }
  });
  

const app = express();
app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => {res.send("It's work!");})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) });
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) });
app.put('/image', (res, req) => { image.handleImage(req, res, db) });

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`'Server is running on port ${PORT}'`);
})