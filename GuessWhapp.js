var express = require('express');
var app = express();

var gwcode = [647, 646, 730];

// set up handlebars view engine
var handlebars = require('express3-handlebars')
	.create({
			defaultLayout:'main'});
	
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

// set 'showTests' context property if the querystring contains test=1
app.use(function(req, res, next){
	res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
	next();
});

app.get('/', function(req, res) {
	var randomGWcode = gwcode[Math.floor(Math.random() * gwcode.length)];
	res.render('home', {
		gwcode: randomGWcode,
		pageTestScript: 'qa/tests-menuLinks.js'
	});
});

// routes
app.get('/team', function(req,res){
	res.render('team', {layout: 'sub'});
});

app.get('/wieesfunktioniert', function(req,res){
	res.render('wieesfunktioniert', {layout: 'sub'});
});

app.get('/impressum', function(req,res){
	res.render('impressum', {layout: 'sub'});
});

// 404 catch-all handler (middleware)
app.use(function(req, res, next){
	res.status(404);
	res.render('404');
});

// 500 error handler (middleware)
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function(){
  console.log( 'Express started on http://localhost:' + 
    app.get('port') + '; press Ctrl-C to terminate.' );
});
