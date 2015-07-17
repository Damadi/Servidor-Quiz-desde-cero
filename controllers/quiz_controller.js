/// <reference path="../typings/tsd.d.ts" />

var models = require('../models/models.js');

exports.load = function(req,res,next,quizId){
	models.Quiz.find(quizId).then(
		function(quiz){
			if(quiz){
				req.quiz = quiz;
				next();
			}else{next(new Error('No existe quizId' + quizId));
		}
	}).catch(function(error){next(error);});	
};

exports.index = function(req,res){
	if(!req.query.search){
		req.query.search = '';		
	}	
	models.Quiz.findAll({where: ["pregunta like ?", '%' + req.query.search + '%']}).then(function(quizes){
			res.render('quizes/index', {quizes: quizes});	
		})	
};

exports.show = function(req,res){ 
	models.Quiz.find(req.params.quizId).then(function(quiz){
		res.render('quizes/show', {quiz: req.quiz});
	})
};

exports.author = function(req,res){ 	
	res.render('author');
};

exports.answer = function(req,res){
	
	models.Quiz.find(req.params.quizId).then(function(quiz){	
		var resultado = 'Incorrecto';		
		if(req.query.respuesta === req.quiz.respuesta){ 
			resultado = 'Correcto';
		}		
		res.render('quizes/answer',{quiz: req.quiz, respuesta: resultado});	
	})	
};