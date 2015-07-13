// 

exports.question = function(req,res){ 
	
	res.render('quizes/question', {pregunta: 'Capital de Italia'});
};

exports.author = function(req,res){ 
	
	res.render('author');
};

exports.answer = function(req,res){
	
	res.locals.ExpReg = /^Roma$/i; 
	
	if(res.locals.ExpReg.test(req.query.respuesta)){ 
		res.render('quizes/answer',{respuesta: 'Correcto'});
	}else{
		res.render('quizes/answer',{respuesta: 'Incorrecto'});
	}
};
