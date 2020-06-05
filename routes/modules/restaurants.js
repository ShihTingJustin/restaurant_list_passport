const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

//CREATE 新增餐廳
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  const userId = req.user._id

  return Restaurant.create({ name, name_en, category, image, location, phone, google_map, rating, description, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//READ 瀏覽單一餐廳資訊
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id

  return Restaurant.findOne({ _id, userId })  // use findOne with _id not just id
    .lean()
    .then(restaurant => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})

//UPDATE 編輯餐廳資訊
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
})

router.put('/:id/', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id

  return Restaurant.findOne({ _id, userId })
    .then(restaurant => {
      restaurant = Object.assign(restaurant, req.body)
      return restaurant.save()  // save 是 mongoose 提供的方法
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => console.log(error))
})

//DELETE 刪除餐廳
router.delete('/:id/', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id

  return Restaurant.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router