const express = require('express')
const path = require('path')

const srcDir = path.join(__dirname, '/src')

const app = express()
const PORT = process.env.PORT || 3000

// app.use('/css', express.static(path.join(__dirname, '/src/css')))
// app.use('/js', express.static(path.join(__dirname, '/src/js')))
app.use(express.static(path.join(__dirname, '/src')))
app.set('view engine', 'html')

app.use('/src', express.static(path.join(__dirname, '/src')))

app.get('/', function (req, res) {
  res.render(path.join(srcDir, '/index.html'))
})

app.listen(PORT, () => {
  console.log('Server is running at:', PORT)
})
