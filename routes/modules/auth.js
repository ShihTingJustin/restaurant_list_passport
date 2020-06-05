const express = require('express')
const router = express.Router()
const passport = require('passport')

// click fb btn
router.get('/facebook', passport.authenticate('facebook', {
  scope: ['email', 'public_profile']
}))

// fb auth complete
router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

module.exports = router