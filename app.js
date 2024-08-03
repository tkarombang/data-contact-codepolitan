
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const port = 3000
const { loadContact, findContact } = require('./utils/contacts')


app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(express.static('public'))

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
    layout: 'layouts/main-layout',
    nama: 'Muhammad Azwar',
    title: 'Halaman Home',
    dataPegawai,
  })
})

app.get('/comments', (req, res) => {
  
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
  res.render('comments', {
    layout: 'layouts/main-layout',
    title: 'CommentsPage', 
    comments: 'ini adalah halaman comments',
    comments,
   })
})

app.get('/contact', (req, res) => {
  const contacts = loadContact();
  res.render('contact', {
    layout: 'layouts/main-layout',
    title: 'Halaman Contacs',
    contacts
  })
})

app.get('/contact/:nama', (req, res) => {
  const contact = findContact(req.params.nama);
  res.render('contact-detail', {
    layout: 'layouts/main-layout',
    title: 'Halaman Detail COntact',
    contact
  })
})



app.get('/about', (req, res) => {
  res.render('about', {
    layout: 'layouts/main-layout',
    title: 'Halaman About'
  })
})

// app.get('/blog/:judul', (req, res) => {
//   const { judul } = req.params
//   res.send(`We are now in the ${judul}`)
// })

// app.get('/blog/:judul/:category/:author', (req, res) => {
//   const { judul, category, author} = req.params
//   res.send(`anda sedang memilih Judul: ${judul} dengan category: ${category} dan Penulis ${author}`)
// })

// app.get('/search/', (req, res) => {
//   const { q } = req.query
//   if(!q){
//     res.send(`<h1>not found</h1>`)
//   }
//     res.send(`<h1>Search Keyword ${q} </h1>`)

// })

app.use('/', (req, res) => {
  res.status(404)
  // res.send('<h1>404 PAGE NOT FOUND</h1>')
  res.render('404', {
    layout: 'layouts/main-layout',
  })
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})