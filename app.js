const express = require('express');
const stockinfo = require('stock-info');
const path = require('path');
const port = 80;
const app = express();
const mustacheExpress = require('mustache-express');

// Register '.mustache' extension with The Mustache Express
app.engine('html', mustacheExpress());

// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'html');

app.get('/', (req, res) => {
	res.render('home');
});

app.get('/stockinfo', (req, res) => {
	let data = stockinfo.getSingleStockInfo(req.query.ticker);
	data.then((response) => {
		res.render('stockinfo', {
			valid: true,
			ticker: req.query.ticker,
			name: response.shortName,
			stockinfo: response.ask,
			change: response.regularMarketChangePercent.toFixed(2)
		});
	}).catch( () => {
		res.render('stockinfo', {
			valid: false,
			ticker: req.query.ticker
		})
	});
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

