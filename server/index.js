require('dotenv').config();
const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const cors = require('cors');
const db = require('../database/index.js')
const { addToFavorites, getFavorites } = require('../database/db.js');


app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/gyms', (req, res) => {
  console.log(req.query)
  const { lat, long, type } = req.query;
  axios({
    method: 'get',
    url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=24000&type=gym&keyword=${type || null}&key=${process.env.SERVER_SIDE_API_KEY}&sensor=true`,
    headers: { }
  })
  .then(function (response) {
    console.log(JSON.stringify(response.data));
    res.send(response.data);
  })
  .catch(function (error) {
    console.log(error);
    res.send(error);
  });
})

app.get('/info', async (req, res) => {
  const { info } = req.query;
  if (!info) {
    res.status(400).send('Missing parameter: info');
    return;
  }
  const places = (info.map((placeid) => {
   return axios({
      method: 'get',
      url: `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeid}&key=${process.env.SERVER_SIDE_API_KEY}&sensor=true`,
      headers: { }
    })
  }));
  Promise.all(places)
  .then((results) => {
    const result = results.map((result) => result.data.result)
    res.send(result);
  })
  .catch((err) => {
    console.log(err);
    res.send(err);
  })
})

app.get('/pics', async (req, res) => {
  const { photoRef } = req.query;
  if (!photoRef) {
    res.status(400).send('Missing parameter: info');
    return;
  }
  const photos = photoRef.map((photo) => {
    console.log('here', photo);
    if (photo === '123') {
      return `https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101028/112815904-no-image-available-icon-flat-vector-illustration.jpg?ver=6`
    }
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo}&sensor=false&key=${process.env.SERVER_SIDE_API_KEY}`
    })
    res.send(photos);
})

app.get('/favorites', (req, res) => {
  getFavorites()
  .then((results) => {
    console.log(results);
    res.send(results);
  })
})

app.post('/favorites', (req, res) => {
  addToFavorites(req.body);
    res.sendStatus(201);
})

app.listen(1100, () => {
  console.log(`listening on port 1100`)
});