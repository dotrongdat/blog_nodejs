const express = require('express')
const path= require('path')
const exphbs  = require('express-handlebars')
const morgan = require('morgan')
const app = express()
const port = 3000
const mongodb=require('mongodb')
const router=require('./routes/index')
const connect=require('./config/db')

app.use(express.json())

app.use(express.static(path.join(__dirname,'public')))
app.use(morgan('combined'))

app.engine('hbs', exphbs({
  extname: '.hbs'
}))
app.set('view engine', 'hbs')
app.set('views',path.join(__dirname,'resources/views'))

// const jwt=require('jsonwebtoken')

// const token = jwt.sign({name:"Dat"},"code")
// console.log(token)
// console.log(jwt.decode(token))

connect()
router(app)
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})