const db = require("../../database/models");
const getUrl = require("../../helpers/getUrl");
const Op = db.Sequelize.Op;
const createError = require("../../helpers/createError");

module.exports = {
  list: async (req, res) => {
    let { limit, order } = req.query;
    let fields = ["title", "rating", "release_date", "length", "awards"];
    try {
      if (order && !fields.includes(order)) {
        throw createError(400, `Solo se puede ordenar por ${fields}`);
      }

      let total = await db.Movie.count();
      let movies = await db.Movie.findAll({
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
        include: [
          {
            association: "genre",
            attributes: {
              exclude: ["created_at", "updated_at"],
            },
          },
          {
            association: "actors",
            attributes: {
              exclude: ["created_at", "updated_at"],
            },
          },
        ],
        limit: limit ? +limit : 5,
        order: [order ? order : "id"],
      });

      movies.forEach((movie) => {
        movie.setDataValue("link", `${getUrl(req)}${movie.id}`);
      });

      return res.status(200).json({
        ok: true,
        meta: {
          status: 200,
        },
        data: {
          items: movies.length,
          total,
          movies,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(error.status || 500).json({
        ok: false,
        msg: error.message,
      });
    }
  },
  detail: async (req, res) => {
    const { id } = req.params;

    try {
      if (isNaN(id)) {
        throw createError(400, "El id debe ser un numero");
      }

      let movies = await db.Movie.findByPk(req.params.id, {
        include: ["genre"],
      });

      if (!movies) {
        throw createError(400, "No existe el genero con ese id");
      }
      return res.status(200).json({
        ok: true,
        meta: {
          status: 200,
        },
        data: {
          movies,
          total: 1,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(error.status || 500).json({
        ok: false,
        msg: error.message,
      });
    }
  },
  create: async (req, res) => {
    try {
      const { title, rating, awards, release_date, length, genre_id } =
        req.body;

      let movies = await db.Movie.create({
        title,
        rating,
        awards,
        release_date,
        length,
        genre_id,
      });
      return res.status(200).json({
        ok: true,
        meta: {
          status: 200,
        },
        data: {
          movies,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(error.status || 500).json({
        ok: false,
        msg: error.message,
      });
    }


  },
  destroy: async function (req, res) {
    try {
      let movies = await db.Movie.destroy({
        where: {
          id: req.params.id,
        },
      });

      return res.status(200).json({
        ok: true,
        meta: {
          status: 200,
        },
        data: {
          movies,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(error.status || 500).json({
        ok: false,
        msg: error.message,
      });
    }
  },
};
