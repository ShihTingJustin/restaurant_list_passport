const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const User = require('../user')
const Restaurant = require('../restaurant')
const restaurantData = require('./restaurant.json')
const db = require('../../config/mongoose')

const SEED_USER = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678'
  },
  {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678'
  }
]

db.once('open', () => {
  console.log('creating seeder ...')

  User.findOne({ email: SEED_USER.email })
    .then(user => {
      if (user) {
        console.log('SEED_USER is existed, please check if DB is empty ...')
        return process.exit()
      } else {
        const promises = [
          generateUserData(SEED_USER[0], 0, 2),
          generateUserData(SEED_USER[1], 3, 5)
        ]
        Promise.all(promises)
          .then(() => {
            console.log('done!')
            process.exit()
          })
      }
    })
})

function generateUserData(userAccount, restaurantIdFrom, restaurantIdTo) {
  return new Promise((resolve, rej) => {
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(userAccount.password, salt))
      .then(hash => User.create({
        name: userAccount.name,
        email: userAccount.email,
        password: hash
      }))
      .then(user => {
        const userId = user._id
        let seedData = restaurantData.results
        seedData.map(restaurant => restaurant.userId = userId)  // insert userId to seedData
        let newSeedData = seedData.slice(restaurantIdFrom, restaurantIdTo + 1)
        console.log(newSeedData)
        resolve(Promise.all(Array.from({ length: 1 }, () => Restaurant.create(...newSeedData))))
      })
  })
}