const express = require('express');
const multer = require('multer');
const cors = require("cors");
const userRouter = require('./routes/user.routes')
const postRouter = require('./routes/post.routes')
const roomRouter = require('./routes/room.routes')
const categoryRouter = require('./routes/category.routes')
const PORT = process.env.PORT || 4444
const app = express()
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // возможно для сборки nuxt нужен будет другой путь
    cb(null, '../frontend/public/uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage })
app.use(express.json())
app.use(cors());

// загрузка изображения
app.use('/uploads', express.static('uploads'))
app.post('/uploads', upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  })
})

// все остальные роуты
app.use('/api', userRouter, postRouter, roomRouter, categoryRouter)
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
