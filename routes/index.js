/**
 * Created by sajmera on 12/26/16.
 */
var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){
    res.render('index.html');

});

module.exports = router;

