const mongoose = require('mongoose')

// setting database
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => console.log('mongodb error!'))
db.once('open', () => console.log('mongodb connected!'))

module.exports = db