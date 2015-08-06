var express = require('express');
var crypto = require('crypto');
var products = require('../data/products');

var router = express.Router();
var currentToken;

function validTokenProvided(req, res, next) {
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        if (currentToken === bearer[1]) {
            return true;
        }
    }
    res.send(401, { error: 'Invalid auth token' });
}

function buildToken(length) {
    return crypto.randomBytes(length || 32).toString('hex');
}

function getItemById(items, id) {
    var match = {};
    items.forEach(function(item) {
      if (item.id == id) {
        match = item;
        return false;
      }
    });
    return match;
}

// middleware to prevent unauthorized users in the api
router.use('/api', function (req, res, next) {
  validTokenProvided(req, res) && next();
});

router.get('/', function(req, res, next) {
  res.render('index', { });
});

router.get('/api/products/list', function(req, res) {
    res.send(products);
});

router.post('/api/product/create', function(req, res) {
    var valid = false;
    var newProduct = {
      id: buildToken(),
      name: req.body.name,
      price: req.body.price,
      description: req.body.description
    };

    if (newProduct.name && newProduct.description) {
      valid = true;
    }

    var done = valid && products.push(newProduct);
    res.send(!!done);
});


router.post('/api/product/:productId/comment/create', function(req, res) {
    var valid = false;
    var productId = req.param('productId');

    var product = getItemById(products, productId);

    var newComment = {
      id: buildToken(),
      user: req.body.user,
      comment: req.body.comment,
      date: new Date
    };

    if (newComment.user && newComment.comment) {
      valid = true;
    }

    var done = valid && product && product.comments.push(newComment);
    res.send(!!done);
});


router.get('/api/product/:productId', function(req, res) {
    var productId = req.param('productId');
    var product = getItemById(products, productId);
    res.send(product);
});

router.post('/auth.json', function(req, res) {

  var body = req.body,
      username = body.username,
      password = body.password;

  if (username === 'demo' && password === 'demo') {
    // Generate and save the token (forgotten upon server restart).
    currentToken = buildToken();
    res.send({
      success: true,
      token: currentToken,
      username: username
    });
  } else {
    res.send(500, {
      success: false,
      message: 'Invalid username/password'
    });
  }
});

module.exports = router;
