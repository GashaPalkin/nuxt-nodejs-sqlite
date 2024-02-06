const sqlite3 = require('sqlite3').verbose();

// DB connection
let db = new sqlite3.Database('./db/database.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');
});

// DB create tables 
// db.run(`CREATE TABLE IF NOT EXISTS users(
//   user_id INTEGER PRIMARY KEY AUTOINCREMENT, 
//   user_name TEXT NOT NULL, 
//   user_email TEXT NOT NULL UNIQUE, 
//   user_password TEXT NOT NULL
//   )`
// )

// db.run(`CREATE TABLE IF NOT EXISTS categories(
//   category_id INTEGER PRIMARY KEY AUTOINCREMENT, 
//    category_title TEXT NOT NULL 
//   )`
// )

// db.run(`CREATE TABLE IF NOT EXISTS posts (
//   post_id INTEGER PRIMARY KEY AUTOINCREMENT, 
//   post_title TEXT NOT NULL, 
//   post_content TEXT NOT NULL, 
//   post_image TEXT,
//   category_id INTEGER NOT NULL,
//   user_id INTEGER NOT NULL,
//   FOREIGN KEY(category_id) REFERENCES categories(category_id),
//   FOREIGN KEY(user_id) REFERENCES users(user_id)
//   )`
// )

// db.run(`CREATE TABLE IF NOT EXISTS rooms (
//   room_id INTEGER PRIMARY KEY AUTOINCREMENT, 
//   room_title TEXT NOT NULL, 
//   room_description TEXT NOT NULL, 
//   room_poster TEXT,
//   room_price INTEGER, 
//   room_best_offer INTEGER DEFAULT 0, 
//   room_all_inclusive INTEGER DEFAULT 0,
//   room_breakfast INTEGER DEFAULT 0
//   )`
// )

// db.run(`CREATE TABLE IF NOT EXISTS reservations (
//   reserv_id INTEGER PRIMARY KEY AUTOINCREMENT, 
//   reserv_date_in TEXT NOT NULL,
//   reserv_date_out TEXT NOT NULL,
//   room_id INTEGER NOT NULL,
//   FOREIGN KEY(room_id) REFERENCES rooms(room_id)
//   )`
// )

// DB insert data 
// * ADD CATEGORIES
// db.run(`INSERT INTO categories (category_title) VALUES (?)`, ['Category 1'])
// db.run(`INSERT INTO categories (category_title) VALUES (?)`, ['Category 2'])
// db.run(`INSERT INTO categories (category_title) VALUES (?)`, ['Category 3'])
// db.run(`INSERT INTO categories (category_title) VALUES (?)`, ['Category 4'])

// * ADD USERS
// db.run(`INSERT INTO users (user_name, user_email, user_password) VALUES (?,?,?)`, ['John Doe', 'johndoe@mail.ru', "pswrd"])
// db.run(`INSERT INTO users (user_name, user_email, user_password) VALUES (?,?,?)`, ['Max Darwin', 'maxdarwin@mail.ru', "pswrd"])
// db.run(`INSERT INTO users (user_name, user_email, user_password) VALUES (?,?,?)`, ['Test User', 'testn@mail.ru', "pswrd"])

// * ADD POSTS
// db.run(`INSERT INTO posts (post_title, post_content, post_image, category_id, user_id) VALUES (?,?,?,?,?)`, ['First Post', 'Sapien pellentesque habitant morbi tristique senectus et netus et. Sit amet consectetur adipiscing elit duis. Turpis egestas sed tempus urna. Mauris rhoncus aenean vel elit scelerisque. Facilisis sed odio morbi quis commodo odio. Vehicula ipsum a arcu cursus vitae congue mauris. Consequat mauris nunc congue nisi vitae suscipit tellus mauris a. Leo vel orci porta non pulvinar neque. Facilisi morbi tempus iaculis urna id volutpat lacus laoreet. Pellentesque nec nam aliquam sem et tortor. Quis blandit turpis cursus in. Tristique magna sit amet purus gravida quis. Sit amet mauris commodo quis imperdiet massa. Molestie at elementum eu facilisis sed. Nisl rhoncus mattis rhoncus urna. Rhoncus est pellentesque elit ullamcorper. Est placerat in egestas erat imperdiet sed euismod nisi porta.', "https://storage.googleapis.com/pod_public/1300/150708.jpg", 1, 1])
// db.run(`INSERT INTO posts (post_title, post_content, post_image, category_id, user_id) VALUES (?,?,?,?,?)`, ['Another Post', 'Tincidunt lobortis feugiat vivamus at. Elit scelerisque mauris pellentesque pulvinar pellentesque habitant. Iaculis at erat pellentesque adipiscing commodo elit at. Vitae ultricies leo integer malesuada nunc vel risus commodo. Vehicula ipsum a arcu cursus vitae congue mauris. Consequat mauris nunc congue nisi vitae suscipit tellus mauris a. Leo vel orci porta non pulvinar neque. Facilisi morbi tempus iaculis urna id volutpat lacus laoreet. Pellentesque nec nam aliquam sem et tortor. Quis blandit turpis cursus in. Tristique magna sit amet purus gravida quis. Sit amet mauris commodo quis imperdiet massa. Molestie at elementum eu facilisis sed. Nisl rhoncus mattis rhoncus urna. Rhoncus est pellentesque elit ullamcorper. Est placerat in egestas erat imperdiet sed euismod nisi porta.', "https://storage.googleapis.com/pod_public/1300/150708.jpg", 2, 1])
// db.run(`INSERT INTO posts (post_title, post_content, post_image, category_id, user_id) VALUES (?,?,?,?,?)`, ['Facilisi morbi', 'Tempus quam pellentesque nec nam aliquam sem et tortor consequat. Suscipit tellus mauris a diam. Sagittis id consectetur purus ut faucibus pulvinar elementum integer. Pharetra convallis posuere morbi leo urna molestie. Vehicula ipsum a arcu cursus vitae congue mauris. Consequat mauris nunc congue nisi vitae suscipit tellus mauris a. Leo vel orci porta non pulvinar neque. Facilisi morbi tempus iaculis urna id volutpat lacus laoreet. Pellentesque nec nam aliquam sem et tortor. Quis blandit turpis cursus in. Tristique magna sit amet purus gravida quis. Sit amet mauris commodo quis imperdiet massa. Molestie at elementum eu facilisis sed. Nisl rhoncus mattis rhoncus urna. Rhoncus est pellentesque elit ullamcorper. Est placerat in egestas erat imperdiet sed euismod nisi porta.', "https://storage.googleapis.com/pod_public/1300/150708.jpg", 3, 2])
// db.run(`INSERT INTO posts (post_title, post_content, post_image, category_id, user_id) VALUES (?,?,?,?,?)`, ['Tristique magna sit amet', 'Praesent tristique magna sit amet purus gravida quis blandit. A erat nam at lectus urna duis convallis convallis tellus. Vehicula ipsum a arcu cursus vitae congue mauris. Consequat mauris nunc congue nisi vitae suscipit tellus mauris a. Leo vel orci porta non pulvinar neque. Facilisi morbi tempus iaculis urna id volutpat lacus laoreet. Pellentesque nec nam aliquam sem et tortor. Quis blandit turpis cursus in. Tristique magna sit amet purus gravida quis. Sit amet mauris commodo quis imperdiet massa. Molestie at elementum eu facilisis sed. Nisl rhoncus mattis rhoncus urna. Rhoncus est pellentesque elit ullamcorper. Est placerat in egestas erat imperdiet sed euismod nisi porta.', "https://storage.googleapis.com/pod_public/1300/150708.jpg", 2, 1])
// db.run(`INSERT INTO posts (post_title, post_content, post_image, category_id, user_id) VALUES (?,?,?,?,?)`, ['Rhoncus est pellentesque', 'Elit duis tristique sollicitudin nibh sit. Sodales ut eu sem integer vitae justo. Vel pharetra vel turpis nunc eget lorem dolor. Diam maecenas sed enim ut sem viverra aliquet. Mauris pellentesque pulvinar pellentesque habitant morbi. Orci dapibus ultrices in iaculis nunc sed augue lacus. Vehicula ipsum a arcu cursus vitae congue mauris. Consequat mauris nunc congue nisi vitae suscipit tellus mauris a. Leo vel orci porta non pulvinar neque. Facilisi morbi tempus iaculis urna id volutpat lacus laoreet. Pellentesque nec nam aliquam sem et tortor. Quis blandit turpis cursus in. Tristique magna sit amet purus gravida quis. Sit amet mauris commodo quis imperdiet massa. Molestie at elementum eu facilisis sed. Nisl rhoncus mattis rhoncus urna. Rhoncus est pellentesque elit ullamcorper. Est placerat in egestas erat imperdiet sed euismod nisi porta.', "https://storage.googleapis.com/pod_public/1300/150708.jpg", 1, 2])
// db.run(`INSERT INTO posts (post_title, post_content, post_image, category_id, user_id) VALUES (?,?,?,?,?)`, ['Turpis massa tincidunt', 'Quisque sagittis purus sit amet. Nullam vehicula ipsum a arcu cursus vitae congue mauris. Amet nulla facilisi morbi tempus iaculis. Vulputate odio ut enim blandit volutpat maecenas volutpat blandit. Vehicula ipsum a arcu cursus vitae congue mauris. Consequat mauris nunc congue nisi vitae suscipit tellus mauris a. Leo vel orci porta non pulvinar neque. Facilisi morbi tempus iaculis urna id volutpat lacus laoreet. Pellentesque nec nam aliquam sem et tortor. Quis blandit turpis cursus in. Tristique magna sit amet purus gravida quis. Sit amet mauris commodo quis imperdiet massa. Molestie at elementum eu facilisis sed. Nisl rhoncus mattis rhoncus urna. Rhoncus est pellentesque elit ullamcorper. Est placerat in egestas erat imperdiet sed euismod nisi porta.', "https://storage.googleapis.com/pod_public/1300/150708.jpg", 3, 3])

// * ADD ROOMS
// db.run(`INSERT INTO rooms (room_title, room_description, room_poster, room_price, room_best_offer, room_all_inclusive, room_breakfast) VALUES (?,?,?,?,?,?,?)`, ['Шикарные апартаменты', 'Sapien pellentesque habitant morbi tristique senectus et netus et. Sit amet consectetur adipiscing elit duis. Turpis egestas sed tempus urna. Mauris rhoncus aenean vel elit scelerisque. Facilisis sed odio morbi quis commodo odio.', "https://generatorfun.com/code/uploads/Random-Hotel-image-13.jpg", 2500, 1, 1, 0])
// db.run(`INSERT INTO rooms (room_title, room_description, room_poster, room_price, room_best_offer, room_all_inclusive, room_breakfast) VALUES (?,?,?,?,?,?,?)`, ['Современные апартаменты', 'Quisque sagittis purus sit amet. Nullam vehicula ipsum a arcu cursus vitae congue mauris. Amet nulla facilisi morbi tempus iaculis. Vulputate odio ut enim blandit volutpat maecenas volutpat blandit.', "https://generatorfun.com/code/uploads/Random-Hotel-image-16.jpg", 3300, 0, 1, 0])
// db.run(`INSERT INTO rooms (room_title, room_description, room_poster, room_price, room_best_offer, room_all_inclusive, room_breakfast) VALUES (?,?,?,?,?,?,?)`, ['Апартаменты в стиле лофт', 'Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Eu ultrices vitae auctor eu. At augue eget arcu dictum. Cras adipiscing enim eu turpis. Enim ut tellus elementum sagittis vitae et leo duis ut.', "https://generatorfun.com/code/uploads/Random-Hotel-image-13.jpg", 4100, 0, 1, 0])
// db.run(`INSERT INTO rooms (room_title, room_description, room_poster, room_price, room_best_offer, room_all_inclusive, room_breakfast) VALUES (?,?,?,?,?,?,?)`, ['Уникальные апартаменты', 'Ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue. Consectetur lorem donec massa sapien faucibus et molestie ac feugiat. Egestas pretium aenean pharetra magna ac placerat vestibulum lectus mauris.', "https://generatorfun.com/code/uploads/Random-Hotel-image-6.jpg", 5300, 1, 0, 0])
// db.run(`INSERT INTO rooms (room_title, room_description, room_poster, room_price, room_best_offer, room_all_inclusive, room_breakfast) VALUES (?,?,?,?,?,?,?)`, ['Двухместный номер с одной кроватью студия', 'Vehicula ipsum a arcu cursus vitae congue mauris. Consequat mauris nunc congue nisi vitae suscipit tellus mauris a. Leo vel orci porta non pulvinar neque. Facilisi morbi tempus iaculis urna id volutpat lacus laoreet. Pellentesque nec nam aliquam sem et tortor. Quis blandit turpis cursus in.', "https://generatorfun.com/code/uploads/Random-Hotel-image-6.jpg", 5300, 0, 1, 0])
// db.run(`INSERT INTO rooms (room_title, room_description, room_poster, room_price, room_best_offer, room_all_inclusive, room_breakfast) VALUES (?,?,?,?,?,?,?)`, ['Студия для двоих с двуспальной кроватью', 'Sed euismod nisi porta lorem mollis aliquam ut. Id neque aliquam vestibulum morbi blandit cursus. Porta nibh venenatis cras sed felis eget velit. Gravida cum sociis natoque penatibus et magnis dis. Feugiat nibh sed pulvinar proin gravida hendrerit lectus a. Massa vitae tortor condimentum lacinia.', "https://generatorfun.com/code/uploads/Random-Hotel-image-6.jpg", 2300, 1, 0, 1])
// db.run(`INSERT INTO rooms (room_title, room_description, room_poster, room_price, room_best_offer, room_all_inclusive, room_breakfast) VALUES (?,?,?,?,?,?,?)`, ['Просторные апартаменты', 'Ut faucibus pulvinar elementum integer enim neque volutpat ac tincidunt. Aliquam sem fringilla ut morbi tincidunt. Sed augue lacus viverra vitae congue. Odio tempor orci dapibus ultrices in iaculis nunc sed augue. Amet facilisis magna etiam tempor orci eu lobortis elementum nibh. Nulla malesuada pellentesque elit eget gravida. Est sit amet facilisis magna etiam.', "https://generatorfun.com/code/uploads/Random-Hotel-image-6.jpg", 3100, 1, 1, 0])

// * ADD RESERVATIONS
// db.run(`INSERT INTO reservations (reserv_date_in, reserv_date_out, room_id ) VALUES (?,?,?)`, ['2024-02-10 12:00:00', '2024-02-15 12:00:00', 1])
// db.run(`INSERT INTO reservations (reserv_date_in, reserv_date_out, room_id ) VALUES (?,?,?)`, ['2024-02-16 12:00:00', '2024-02-20 12:00:00', 2])
// db.run(`INSERT INTO reservations (reserv_date_in, reserv_date_out, room_id ) VALUES (?,?,?)`, ['2024-02-25 12:00:00', '2024-02-30 12:00:00', 1])
// db.run(`INSERT INTO reservations (reserv_date_in, reserv_date_out, room_id ) VALUES (?,?,?)`, ['2024-02-12 12:00:00', '2024-02-16 12:00:00', 3])
// db.run(`INSERT INTO reservations (reserv_date_in, reserv_date_out, room_id ) VALUES (?,?,?)`, ['2024-02-22 12:00:00', '2024-02-26 12:00:00', 4])

// DB update data 
// db.run(`UPDATE posts set post_title = ?, post_content = ?, post_image = ?  where post_id = ?`,['Another Post Edited', 'Content Another Post Edited', "image", 1])

// DB delete data 
// db.run(`DELETE FROM posts WHERE post_id=?`, [5])

// DB drop table
// db.run(`DROP TABLE users`)
// db.run(`DROP TABLE categories`)
// db.run(`DROP TABLE posts`)
// db.run(`DROP TABLE rooms`) 
// db.run(`DROP TABLE reservations`) 

// DB get data
// db.serialize(() => {
//   db.each(`SELECT * FROM posts`, (err, row) => {
//     if (err) {
//       console.error(err.message);
//     }
//     console.log(row);
//   });
// });

// DB close
// db.close((err) => {
//   if (err) {
//     console.error(err.message);
//   }
//   console.log('Close the database connection.');
// });

module.exports = db