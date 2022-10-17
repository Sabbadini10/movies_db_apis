const express = require("express");
const router = express.Router();
const {list, detail, add} = require("../../controllers/apis/genresControllers");

router
  .get("/genres",list)
  .get("/genres/detail/:id",detail)
  .get("/genres/add",add)

module.exports = router;
