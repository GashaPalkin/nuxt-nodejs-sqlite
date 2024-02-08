const db = require('../db/db.js');

class PostController {
  createPost(req, res) {
    const sql = `INSERT INTO posts (post_title, post_content, post_image, category_id, user_id) VALUES (?,?,?,?,?)`;
    // взяли данные из запроса клиента
    const { title, content, image, category_id, user_id } = req.body
    // положили данные в параметры SQL запроса
    const params = [title, content, image, category_id, user_id]
    db.run(sql, params, function (err) {
      if (err) {
        res.status(400).json({ "error": err.message })
        return;
      }
      res.json({
        "message": "success",
        "data": {
          "title": title,
          "content": content,
          "image": image,
          "category_id": category_id,
          "user_id": user_id
        },
        "id": this.lastID
      })
    })
  }

  getPosts(req, res) {
    const sql = `SELECT * FROM posts JOIN users USING (user_id) JOIN categories USING (category_id)`
    db.all(sql, (err, rows) => {
      if (err) {
        res.status(400).json({ "error": err.message });
        return;
      }
      res.json(rows)
    });
  }

  getOnePost(req, res) {
    const sql = `SELECT * FROM posts JOIN users USING (user_id), categories USING (category_id) WHERE post_id=?`
    const id = req.params.id
    db.all(sql, id, (err, rows) => {
      if (err) {
        res.status(400).json({ "error": err.message });
        return;
      }
      res.json(rows[0])
    });
  }

  updatePost(req, res) {
    const { title, content, image, category_id } = req.body
    const sql = `UPDATE posts set post_title = ?, post_content = ?, post_image = ?, category_id = ?  where post_id = ?`
    const id = req.params.id
    let params = [title, content, image, category_id, id]
    db.run(sql, params, function (err) {
      if (err) {
        return console.error(err.message);
      }
      // console.log(`Row(s) updated: ${this.changes}`);
      res.json({
        message: "success",
        "data": {
          "title": title,
          "content": content,
          "image": image,
          "category_id": category_id
        },
        changes: this.changes
      })
    });
  }

  deletePost(req, res) {
    const sql = `DELETE FROM posts WHERE post_id=?`
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

module.exports = new PostController()