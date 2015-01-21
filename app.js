var express = require('express');
var app = express();

var exphbs = require('express-handlebars');
var hbs = exphbs.create({ defaultLayout:'main', helpers: { randomEvent: function(){ return events[Math.floor(Math.random() * events.length)]; }} });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

var events = [
	"You hit the ground running today. You were able to keep pace with Bethtana quite nicely for once. 'Have you been exercising liege? Your stamina has grown!'",
	"Everyday is a struggle to overcome. After the previous days honest effort, your muscles feel sore as you continue forward today, but you find that for once, you don't quite mind. After the skirmishes of the past, you are just happy to be alive...'",
	"Your pack seems to get heavier, even though you have been journeying and steadily using resources. Your breath comes in shallow pants. Looking over at the lone guard you have left ensuing that you don't perish to the rebel forces out there... you realize she is keeping stride seemingly fine. You start to hate the days you were idle, for you seem to be paying for it triple-fold now.",
];


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