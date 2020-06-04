const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

//READ 搜尋餐廳
router.get('/', (req, res) => {
  const { keyword } = req.query
  return Restaurant.find({ $or: [{ name: new RegExp(keyword, 'i') }, { category: new RegExp(keyword, 'i') }] })
    .lean()
    .then(restaurants => {
      if (restaurants.length > 0) {
        res.render('index', { restaurants, keyword: req.query.keyword })
      } else {
        res.render('nothing', { keyword })
      }

    })
})

module.exports = router