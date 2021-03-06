/**
 * Created by sajmera on 12/26/16.
 */
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var todos = require('./routes/todos');

var app = express();
var __dirname = path.resolve();

// View Engine
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.engine('html',require('ejs').renderFile); //allows us to render html file

app.use(express.static(path.join(__dirname,'client')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/',index);
app.use('/api/v1',todos);

app.listen(3000,function () {
    console.log('Server started on port 3000');
})