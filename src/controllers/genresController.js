const db = require("../database/models");
const createError = require('../helpers/createError')
const sequelize = db.sequelize;

const genresController = {
  list: async (req, res) => {
    let { limit, order} = req.query
    let fields = ["name", "ranking"]
    try {
        if (!fields.includes(order)) {
            throw createError(400, "Solo se puede ordenar por 'name' o 'ranking'")
        }

        let total = await db.Genre.count()
        let genres = await db.Genre.findAll({
            attributes:{
                exclude: ["created_at", "updated_at"]
            },
            limit: limit ? +limit : 5,
            order: [order ? order : "id"]
        })
        return res.status(200).json({
            ok: true,
            meta: {
                status: 200
            },
            data: {
                items: genres.length,
                total,
                genres
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).json({
            ok: false,
            msg: error.message,
        })
    } 
  },
  detail: (req, res) => {
    db.Genre.findByPk(req.params.id).then((genre) => {
      res.render("genresDetail.ejs", { genre });
    });
  },
};

module.exports = genresController;
