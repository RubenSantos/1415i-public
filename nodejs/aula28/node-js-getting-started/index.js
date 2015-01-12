var express = require('express');
var app = express();
var cool = require('cool-ascii-faces');
var pg = require('pg');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response)
{
  var result = '';
  var times = process.env.TIMES || 5;
  for (var i = 0; i < times; i++) {
    result += cool() + " <br/>  ";
  };

  response.status(200).send(result);
});

app.get('/db', function(req, res)
{
  pg.connect(process.env.DATABASE_URL, function(err, client, done)
  {
    client.query('SELECT * from test_table', function(err, result)
    {
      done();
      if(err)
      {
        console.error(err);
        res.status(500).send(new Error(err));
        return;
      }
      res.status(200).send(result.rows);
    });
  });
});



app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
