var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function home(req, res)
{
  res.render('index', { title: 'TodoNaNet' });
});

module.exports = router;
