// require packages used in the project
const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')

if (process.env.NODE_ENV !== 'production'){
  // console.log(process.env)
  require('dotenv').config()
// console.log('----------------------------------')
// console.log(process.env)
}

const routes = require('./routes')
const usePassport = require('./config/passport')  // it's a function!
require('./config/mongoose')

const app = express()
const PORT = process.env.PORT

// setting template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
app.use(express.static('public'))  // setting static files
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method')) // API設定時帶上_method就會轉換為HTTP方法

usePassport(app)

app.use(flash())
// middleware let view get arguments
app.use((req, res, next) => {
  console.log(req.user)
  //locals is an express object that can put arguments in response data
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user  // from passport deserializer
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.error_msg = req.flash('error_msg')
  next()
})
app.use(routes)

// start and listen on the Express server
app.listen(PORT, () => {
  console.log(`Express is listening on localhost:${PORT}`)
})