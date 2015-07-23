var express = require('express');
var router = express.Router();
var quizcontroller = require('../controllers/quiz_controller.js');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors:[]});
});

//autoload :quizId
router.param('quizId', quizcontroller.load); 

// Definición de rutas de sesion
router.get('/login',  sessionController.new);     // formulario login
router.post('/login', sessionController.create);  // crear sesión
router.get('/logout', sessionController.destroy); // destruir sesión

//Rutas de quizes
router.get('/author',quizcontroller.author);
router.get('/quizes',quizcontroller.index);
router.get('/quizes/:quizId(\\d+)',quizcontroller.show);
router.get('/quizes/:quizId(\\d+)/answer',quizcontroller.answer);
router.get('/quizes/nuevo',quizcontroller.nuevo);
router.post('/quizes/create',quizcontroller.create);
router.get('/quizes/:quizId(\\d+)/edit',quizcontroller.edit);
router.put('/quizes/:quizId(\\d+)',quizcontroller.update);
router.delete('/quizes/:quizId(\\d+)',quizcontroller.destroy);

router.get('/quizes/:quizId(\\d+)/comments/new',commentController.new);
router.post('/quizes/:quizId(\\d+)/comments',commentController.create);

module.exports = router;
