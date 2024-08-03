
const express = require('express')
// const expressLayouts = require('express-ejs-layouts')
const app = express()
const port = 3000


// app.use(express.urlencoded({ extended: true }))
// app.set('views', path.join(__dirname, 'views'))
// app.use(express.json())
app.set('view engine', 'ejs')
// app.use(expressLayouts)


const comments = [
  {
    username: 'Steve',
    text: 'captain america follow the orders'
  },
  {
    username: 'Boston',
    text: 'the professor night sky'
  },
  {
    username: 'James',
    text: 'like or not he is footbal player'
  }
]

app.get('/', (req, res) => {
  const dataPegawai = [
    {
      nama: 'Rick',
      email: 'rick@gmail.com'
    },
    {
      nama: 'Mark',
      email: 'mark2@gmail.com'
    },
    {
      nama: 'Jimmy',
      email: 'jimmy@gmail.com'
    }
  ]
  res.render('index', {
    nama: 'Muhammad Azwar',
    title: 'Halaman Home',
    dataPegawai,
  })
})

app.get('/comments', (req, res) => {
  res.render('comments', { comments })
})


app.get('/contact', (req, res) => {
  res.render('contact')
})

app.get('/about', (req, res) => {
  res.send('this is About Page')
})

app.get('/blog/:judul', (req, res) => {
  const { judul } = req.params
  res.send(`We are now in the ${judul}`)
})

app.get('/blog/:judul/:category/:author', (req, res) => {
  const { judul, category, author} = req.params
  res.send(`anda sedang memilih Judul: ${judul} dengan category: ${category} dan Penulis ${author}`)
})

app.get('/search/', (req, res) => {
  const { q } = req.query
  if(!q){
    res.send(`<h1>not found</h1>`)
  }
    res.send(`<h1>Search Keyword ${q} </h1>`)

})

// app.get('*', (req, res) => {
//   res.send('Page Not Found 404')
// })

app.use('/', (req, res) => {
  res.status(404)
  res.send('404')
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})