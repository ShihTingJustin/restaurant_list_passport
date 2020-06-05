const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

//READ 瀏覽所有餐廳
router.get('/', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId }) 
    .lean()  // mongoose model 物件轉換成 JS array
    .then(restaurants => res.render('index', { restaurants })) //資料傳給 index 樣板
    .catch(error => console.error(error)) //錯誤處理
})

module.exports = router