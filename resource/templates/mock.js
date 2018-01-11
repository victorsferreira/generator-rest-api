var express = require('express');
var router = express.Router();
var middleware = require('swagger-express-middleware');

// Seed
var db = [
  {
    endpoint: '/1234567890asdfghjkl',
    response: {_id: '1234567890asdfghjkl', created_at: new Date()}
  }
];

//Cenários específicos
router.get('/0987654321',function(req,res){
  res.status(500).json({mensagem: 'Erro'});
});

router.get('/1234567890',function(req,res){
  res.status(200).json({mensagem: 'Sucesso'});
});

module.exports = {
  router: router,
  db: db
}
