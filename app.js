
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const port = 3000
const { loadContact, findContact } = require('./utils/contacts')
const { loadComment } = require('./utils/comments')


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
  const comments = loadComment()
  console.log(comments)
  res.render('comments', {
    layout: 'layouts/main-layout',
    title: 'CommentsPage', 
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

//HALAMAN FORM TAMBAH DATA CONTACT
app.get('/contact/add',)
//HALAMAN DETAIL CONTACT
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