const db = require('../db/db.js');

class RoomController {
  createRoom(req, res) {
    const sql = `INSERT INTO rooms (room_title, room_description, room_poster, room_available, room_price, room_best_offer, room_all_inclusive, room_breakfast, room_rate) VALUES (?,?,?,?,?,?,?,?,?)`
    // взяли данные из запроса клиента
    const { title, description, poster, available, price, best_offer, all_inclusive, breakfast, rate } = req.body
    // положили данные в параметры SQL запроса
    const params = [title, description, poster, available, price, best_offer, all_inclusive, breakfast, rate]
    db.run(sql, params, function (err) {
      if (err) {
        res.status(400).json({ "error": err.message })
        return;
      }
      res.json({
        "message": "success",
        "data": {
          "title": title,
          "description": description,
          "price": price
        },
        "id": this.lastID
      })
    })
  }

  createRoomReserve(req, res) {
    const sql = `INSERT INTO reservations (reserv_date_in, reserv_date_out, room_id ) VALUES (?,?,?)`
    const { date_in, date_out, room_id } = req.body
    const params = [date_in, date_out, room_id]
    db.run(sql, params, function (err) {
      if (err) {
        res.status(400).json({ "error": err.message })
        return;
      }
      res.json({
        "message": "success",
        "data": {
          "date_in": date_in,
          "date_out": date_out,
          "room_id": room_id
        },
        "id": this.lastID
      })
    })
  }

  getRooms(req, res) {
    const sql = `SELECT * FROM rooms`
    db.all(sql, (err, rows) => {
      if (err) {
        res.status(400).json({ "error": err.message });
        return;
      }
      res.json(rows)
    });
  }

  getRoomsWithReserves(req, res) {
    const sql = `SELECT * FROM rooms LEFT JOIN reservations USING (room_id)`
    db.all(sql, (err, rows) => {
      if (err) {
        res.status(400).json({ "error": err.message });
        return;
      }
      res.json(rows)
    });
  }

  getOneRoom(req, res) {
    const sql = `SELECT * FROM rooms WHERE room_id=?`
    const id = req.params.id
    db.all(sql, id, (err, rows) => {
      if (err) {
        res.status(400).json({ "error": err.message });
        return;
      }
      res.json(rows[0])
    });
  }

  updateRoom(req, res) {
    const { title, description, poster } = req.body
    const sql = `UPDATE posts set room_title = ?, room_description = ?, room_poster = ?  where room_id = ?`
    const id = req.params.id
    let params = [title, description, poster, id]
    db.run(sql, params, function (err) {
      if (err) {
        return console.error(err.message);
      }
      console.log(`Row(s) updated: ${this.changes}`);
      res.json({
        message: "success",
        "data": {
          "title": title,
          "description": description,
          "poster": poster
        },
        changes: this.changes
      })
    });
  }

  deleteRoom(req, res) {
    const sql = `DELETE FROM posts WHERE room_id=?`
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

module.exports = new RoomController()