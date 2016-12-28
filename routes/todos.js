/**
 * Created by sajmera on 12/26/16.
 */
/**
 * Created by sajmera on 12/26/16.
 */
var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://sajmera:1985narimanpoint@ds145118.mlab.com:45118/meantodos-sajmera',['todos']);


router.get('/todos',function(req,res,next){
    db.todos.find(function (err, todos) {
        if(err){
            res.send(err);
        }else{
            res.json(todos);
        }
    });
});


router.get('/todos/:id',function (req,res,next) {
    db.todos.findOne({
        _id:mongojs.ObjectId(req.params.id)

    },function (err,todos) {
        if(err){
            res.send(err);
        }else{
            res.json(todos);
        }

    })

});

//Save todo

router.post('/todo',function(req,res,next){
    var todo = req.body;
    if(!todo.text || !(todo.isCompleted + '')) {
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    }else{
        db.todos.save(todo,function(err,result){
            if(err){
                res.send(err);
            }else{
                res.json(result);
            }
        });

    }


});

//Update Todo
router.put('/todo/:id',function (req,res,next) {
    var todo = req.body;
    var updateObject = {};

    if(todo.isCompleted){
        updateObject.isCompleted = todo.isCompleted;
    }

    if(todo.text){
        updateObject.text = todo.text;
    }

    if(!updateObject){
        res.status(400);
        res.json({
            "error":"Invalid Data!"
        });
    }else{
        db.todos.update({
            _id:mongojs.ObjectID(req.params.id)
        },updateObject,function (err,result) {
            if(err){
                res.send(err);
            }else{
                res.json(result);
            }
        });
    }

});

router.delete('/todo/:id',function (req,res) {
    db.todos.remove({
        _id:mongojs.ObjectID(req.params.id)
    },function (err,result) {
        if(err){
            res.send(err);
        }else{
            res.json(result);
        }
    });
});

module.exports = router;
