const express = require('express');
const router = express.Router();
const {add, create, deleteMovies, destroy, detail, edit, list, newMovies, recomended, update} = require('../controllers/moviesController');

router.get('/', list);
router.get('/new', newMovies);
router.get('/recommended', recomended);
router.get('/detail/:id', detail);
//Rutas exigidas para la creación del CRUD
router.get('/add', add);
router.post('/create', create);
router.get('/edit/:id', edit);
router.put('/update/:id', update);
router.get('/delete/:id', deleteMovies);
router.delete('/delete/:id', destroy);

module.exports = router;