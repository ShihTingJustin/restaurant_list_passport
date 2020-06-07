module.exports = {
  authenticator: (req, res, next) => {
    // isAuthenticated()是passport提供的方法
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('warning_msg', '請先登入才能使用')
    res.redirect('/users/login')
  }
}