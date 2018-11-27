const express = require('express');

const app = express();
const request = require('request');

const key = '6bd8080b';
const port = process.env.PORT || 3823;
app.use(express.static(__dirname + "/public"));

app.get('/', (req, res) => {
  // res.render('search.ejs');
  res.redirect('/movieLists?search=baby');
});

app.get('/movieLists', (req, res) => {
  const query = req.query.search;
  const url = `http://www.omdbapi.com/?s=${query}&apikey=${key}`;
  request(url, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const parsedBody = JSON.parse(body);
      res.render('movieLists.ejs', { movieDetails: parsedBody });
    }
  });
});

app.get('/movie/:id', (req, res) => {
  const id = req.params.id;
  const url = `http://www.omdbapi.com/?i=${id}&apikey=${key}`;
  request(url, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const parsedBody = JSON.parse(body);
      res.render('results.ejs', { movieDetails: parsedBody });
    }
  });
});

app.listen(port, () => {
  console.log(`movie search app started at ${port}`);
});
