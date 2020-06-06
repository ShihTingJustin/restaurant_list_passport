const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const User = require('../user')
const Restaurant = require('../restaurant')
const restaurantData = require('./restaurant.json')
const db = require('../../config/mongoose')

const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '123456'
}

db.once('open', () => {
  console.log('creating seeder ...')

  User.findOne({ email: SEED_USER.email })
    .then(user => {
      if (user) {
        console.log('SEED_USER is existed, please check if DB is empty ...')
        return process.exit()
      } else {
        bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(SEED_USER.password, salt))
          .then(hash => User.create({
            name: SEED_USER.name,
            email: SEED_USER.email,
            password: hash
          }))
          .then(user => {
            const userId = user._id
            let seedData = restaurantData.results
            seedData.map(restaurant => restaurant.userId = userId)  // insert userId to seedData
            return Promise.all(Array.from(
              { length: 1 },
              () => Restaurant.create(...seedData)
            ))
          })
          .then(() => {
            console.log('done!')
            process.exit()
          })
      }
    })
})