const PORT = 8000;
const axios = require('axios'); // USE AXIOS TO MAKE HTTP REQUESTS
const cheerio = require('cheerio'); // USE CHEERIO TO PARSE THE HTML
const express = require('express'); // USE EXPRESS TO CREATE A SERVER
const app = express(); // CREATE AN EXPRESS APP
const cors = require('cors'); // USE CORSE TO SET THE SERVER'S LOCATION
app.use(cors());

// TRADINGVIEW NEWS
const url = 'https://www.tradingview.com/markets/cryptocurrencies/news/';

// app.METHOD(PATH, HANDLER);
// app.get()
// app.post()
// app.put()
// app.delete()

app.get('/', function (req, res) {
  res.json('This is a web scraper');
});

app.get('/results', (req, res) => {
  axios(url)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);

      const articles = [];

      // USE CHEERIO TO GET THE ARTICLES
      $('.card-wSNJR2eq', html).each(function () {
        const title = $(this).find('.title-Ckx7QVGw').text();
        const time = $(this).find('.breadcrumbs-Ckx7QVGw').text();
        articles.push({ title, time });
      });
      // console.log(articles);
      res.json(articles);
    })
    .catch((err) => console.log(err));
});

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
