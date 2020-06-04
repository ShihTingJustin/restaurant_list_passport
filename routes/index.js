const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const search = require('./modules/search')
const sort = require('./modules/sort')
const users = require('./modules/users')

router.use('/restaurants', restaurants)
router.use('/users', users)
router.use('/search', search)
router.use('/sort', sort)
router.use('/', home)

module.exports = router