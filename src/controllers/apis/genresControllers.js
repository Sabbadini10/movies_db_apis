const db = require("../../database/models");
const { Op } = require("sequelize");
const createError = require("../../helpers/createError");

module.exports = {
  list: async (req, res) => {
    let { limit, order } = req.query;
    let fields = ["name"];
    try {
      if (!fields.includes(order)) {
        throw createError(400, "Solo se puede ordenar por 'name'");
      }

      let total = await db.Genre.count();
      let genres = await db.Genre.findAll({
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
        limit: limit ? +limit : 5,
        order: [order ? order : "id"],
      });
      return res.status(200).json({
        ok: true,
        meta: {
          status: 200,
        },
        data: {
          items: genres.length,
          total,
          genres,
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
  add: async function (req, res) {
    try {
      let total = await db.Genre.count();
      let genres = await db.Genre.findAll({
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
      });
      return res.status(200).json({
        ok: true,
        meta: {
          status: 200,
        },
        data: {
          items: genres.length,
          total,
          genres,
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

      let genres = await db.Genre.findByPk(id);
      
      if (!genres) {
        throw createError(400, "No existe el genero con ese id");
      }
      return res.status(200).json({
        ok: true,
        meta: {
          status: 200,
        },
        data: {
          total: 1,
          genres,
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
