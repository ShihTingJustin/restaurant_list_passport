const Restaurant = require('../restaurant')
const restaurantData = require('./restaurant.json')
const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('mongodb connected!')
  Restaurant.create(Object.assign(restaurantData.results, restaurantData))
  console.log('done.')
})
// rList.results.forEach(r => {
//   Restaurant.create({
//     "name": r.name,
//     "name_en": r.name_en,
//     "category": r.category,
//     "image": r.image,
//     "location": r.location,
//     "phone": r.phone,
//     "google_map": r.google_map,
//     "rating": r.rating,
//     "description": r.description
//   })
// })