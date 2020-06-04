// require packages used in the project
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const routes = require('./routes')
require('./config/mongoose')

const app = express()
const port = 3000

// setting template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('public'))  // setting static files
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method')) // API設定時帶上_method就會轉換為HTTP方法

app.use(routes)

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})