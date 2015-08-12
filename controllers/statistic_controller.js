/// <reference path="../typings/tsd.d.ts" />

exports.show = function(req, res){
	res.render('statistic/show', {quizWithoutComments: req.quizWithoutComments, quizCount: req.quizCount,commentCount: req.commentCount,errors:[]});
};