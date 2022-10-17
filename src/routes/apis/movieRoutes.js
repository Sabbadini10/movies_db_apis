const express = require('express');
const router = express.Router();
const {list, detail, create, destroy}= require('../../controllers/apis/moviesControllers');

router
    .get('/movies', list)
    .get('/movies/detail/:id', detail)
    .post('/movies/create', create) 
    .delete('/movies/delete/:id', destroy);
module.exports = router;