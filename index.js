const express = require('express')
const app = express()

app.set('views',__dirname+'VIEW')
app.set('view engine', 'ejs')
app.use(express.static('public', options))

app.listen(3000, function(){
    console.log('Example app listening on port 3000!')
})