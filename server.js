require('dotenv').config();

const testUser = {
  userId: '0',
  username: 'test',
  password: 'test123',
  firstName: 'Test',
  lastName: 'Testich',
  email: 'test@test.com',
  dateOfBirth: '01.01.1999.',
  address: 'Test address'
};

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const utils = require('./utils');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  if (!req.user)
    return res
      .status(401)
      .json({ error: true, message: 'Access not granted!' });
  res.send('REST Auth API');
});

app.post('/signin', (req, res) => {
  const user = req.body.username;
  const pass = req.body.password;

  if (!user || !pass) {
    return res
      .status(400)
      .json({ error: true, message: 'Username and passsword are required!' });
  }

  if (user !== testUser.username || pass !== testUser.password) {
    return res
      .status(401)
      .json({ error: true, message: 'Incorrect username and/or password!' });
  }

  const token = utils.generateWebToken(testUser);
  const userObject = utils.getUser(testUser);

  return res.json({ user: userObject, token });
});

app.post('/data', (req, res) => {
  const user = req.body.username;

  if (!user) {
    return res.status(400).json({ error: true, message: 'No data' });
  }

  if (user !== testUser.username) {
    return res.status(401).json({ error: true, message: 'No data' });
  }

  const userObject = utils.getUser(testUser);

  return res.json(userObject);
});

app.listen(4000, () => console.log('Server is up...'));
