var express = require('express');
var app = express();
var event = require('./lib/questlog.js');

var exphbs = require('express-handlebars');
var hbs = exphbs.create({ defaultLayout:'main', helpers: { randomEvent: function(){ return event.getEvent()} } });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
	res.render('home');
});

app.get('/genesis', function(req, res){
	res.render('genesis');
});

app.get('/quest', function(req, res){
	res.render('quest', { randomEvent: true });
});

app.use(function(req, res){
	res.status(404);
	res.render('404');
});

app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function(){
	console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});