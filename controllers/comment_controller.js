/// <reference path="../typings/tsd.d.ts" />

var models = require('../models/models.js');

exports.load = function(req,res,next, commentId){
	models.Comment.find({
		where:{
			id: Number(commentId)
		}
	}).then(function( comment ){
		if(comment){
			req.comment = comment;
			next();
		}else{next(new Error('No existe commentId' + commentId))}
	}).catch(function(error){next(error)});	
};

exports.new = function(req,res){
	res.render('comments/new', { quizId: req.params.quizId, errors: [] });	
};

exports.count = function(req, res, next){
	models.Comment.findAndCountAll().then(
		function(commentCount){
			if(commentCount){
				req.commentCount = commentCount.count;
				next();				
			}else{next(new Error('No existe commentId'))}			
	}).catch(function(error){next(error)});	
};

exports.create = function(req,res){
	var comment = models.Comment.build({
		texto: req.body.comment.texto,
		QuizId: req.params.quizId
	});
	
	comment
	.validate()
	.then(function(error){
		if(error){
			res.render('comments/new',{
				comment: comment, 
				quizid: req.params.quizId, 
				errors: error.errors
			});
		}else{
			comment
			.save()
			.then(function(){
				res.redirect('/quizes/' + req.params.quizId)
				})
		}
	}).catch(function(error){next(error)});
};

exports.publish = function(req, res){
	req.comment.publicado = true;
	
	req.comment.save( {fields: ["publicado"]})
	.then( function(){res.redirect('/quizes/' + req.params.quizId);})
	.catch( function(error){next(error)});
}