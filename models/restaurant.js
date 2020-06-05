const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  name_en: {
    type: String,
    required: false
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  },
  location: {
    type: String,
    required: false
  },
  phone: {
    type: String,
    required: false
  },
  google_map: {
    type: String,
    required: false
  },
  rating: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  userId: {
    type: Schema.Types.ObjectId, //關聯到 user 的 id
    ref: 'User',
    index: true,  // 將 user id 設定為這個資料表的 index，讓搜尋速度加快，屬效能調校 key word: db index
    required: true
  }
})

module.exports = mongoose.model('Restaurant', restaurantSchema)