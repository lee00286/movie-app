const express = require('express')
const app = express()
const port = 5000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://username:abcd1234@boilerplate.nab7d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    userNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...')) // MongoDB가 연결됨
  .catch(err => console.log(err)) // MongoDB가 연결되지 않음


app.get('/', (req, res) => {
  res.send('Hello World! hi!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})