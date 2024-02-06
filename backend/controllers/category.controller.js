const db = require('../db/db.js');

class CategoryController {
  createCategory(req, res) {
    const sql = `INSERT INTO categories (category_title) VALUES (?)`
    // взяли данные из запроса клиента
    const { title } = req.body
    // положили данные в параметры SQL запроса
    const params = [title]
    db.run(sql, params, function (err) {
      if (err) {
        res.status(400).json({ "error": err.message })
        return;
      }
      res.json({
        "message": "success",
        "data": {
          "title": title,
        },
        "id": this.lastID
      })
    })
  }

  getCategories(req, res) {
    const sql = `SELECT * FROM categories`
    db.all(sql, (err, rows) => {
      if (err) {
        res.status(400).json({ "error": err.message });
        return;
      }
      res.json(rows)
    });
  }

  getOneCategory(req, res) {
    const sql = `SELECT * FROM categories WHERE category_id=?`
    const id = req.params.id
    db.all(sql, id, (err, rows) => {
      if (err) {
        res.status(400).json({ "error": err.message });
        return;
      }
      res.json({
        "message": "success",
        "data": rows
      })
    });
  }

  updateCategory(req, res) {
    const { title } = req.body
    const sql = `UPDATE categories set category_title = ? where category_id = ?`
    const id = req.params.id
    let params = [title, id]
    db.run(sql, params, function (err) {
      if (err) {
        return console.error(err.message);
      }
      console.log(`Row(s) updated: ${this.changes}`);
      res.json({
        message: "success",
        "data": {
          "title": title,
        },
        changes: this.changes
      })
    });
  }

  deleteCategory(req, res) {
    const sql = `DELETE FROM categories WHERE category_id=?`
    const id = req.params.id
    db.run(sql, id, (err) => {
      if (err) {
        res.status(400).json({ "error": err.message });
        return;
      }
      res.json({ "message": "Deleted" })
    })
  }
}

module.exports = new CategoryController()