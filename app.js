
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('connect-flash')
const app = express()
const port = 3000

const { loadContact, findContact, addContact, cekDuplikat, deleteContact, updateContacts } = require('./utils/contacts')
const { loadComment } = require('./utils/comments')
const { query, validationResult, check, body } = require('express-validator');


app.set('view engine', 'ejs')
//THIRD PARTY MIDDLEWARE
app.use(expressLayouts) 
app.use(methodOverride('_method'))
//BUILT-IN MIDDLEWARE
app.use(express.static('public')) 
app.use(express.urlencoded({extended: true}))

//KONFIGURASI FLASH (session, flash, cookie-parser)
app.use(cookieParser('secret'))
app.use(session({
  cookie: { maxAge: 6000},
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}))
app.use(flash())

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
    contacts,
    msg: req.flash('msg')
  })
})

//HALAMAN FORM TAMBAH DATA CONTACT
app.get('/contact/add', (req, res) => {
  res.render('add-contact', {
    title: 'Form Tambah Data Contact',
    layout: 'layouts/main-layout',
  })
})

//PROCESS DATA CONTACT
app.post('/contact', [
  check('email', 'Email Not Valid'),
  check('nohp', 'No hp Tidak Valid').isMobilePhone('id-ID'),
  check('nohp', 'Must be 12 number of phone').isLength({ min: 12 }),
  body('nama').custom((value) => {
    const duplicat = cekDuplikat(value)
    if (duplicat){
      throw new Error('Name is Exist')
    }
    return true
  })
], (req, res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    // return res.status(400).json({errors: errors.array()})
    res.render('add-contact', {
      title: 'Form Tambah Data Contact',
      layout: 'layouts/main-layout',
      errors: errors.array()
    })
  }else{
    addContact(req.body)
    //KIRIMKAN FLASH MESSAGE
    req.flash('msg', 'Success Add...!')
    res.redirect('/contact')
  }
})

//PROCESS DELETE CONTACT using GET
// app.get('/contact/delete/:nama', (req, res) => {
//   const contact = findContact(req.params.nama)
//   if(!contact){
//     res.status(404)
//     res.send('<h1>404</h1>')
//   }else{
//     deleteContact(req.params.nama)
//     req.flash('msg', 'Success Delete...!')
//     res.redirect('/contact')
//   }
// })

//FORM UPDATE CONTACT
app.get('/contact/edit/:nama', (req, res) => {
  const namaContact = findContact(req.params.nama)

  res.render('edit-contact', {
    layout: 'layouts/main-layout',
    title: 'Update Contact Page',
    namaContact
  })
})

//PROCESS UPDATE CONTACT
app.put('/contact/update', [
  body('nama').custom((value, { req }) => {
    const duplicat = cekDuplikat(value)
    if (value !== req.body.oldNama && duplicat){
      throw new Error('Name is Exist')
    }
    return true
  }),
  check('email', 'Email Not Valid').isEmail(),
  check('nohp', 'No hp Tidak Valid').isMobilePhone('id-ID'),
  check('nohp', 'Must be 12 number of phone').isLength({ min: 12 })
], (req, res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    // return res.status(400).json({errors: errors.array()})
    res.render('edit-contact', {
      title: 'Form Update Data Contact',
      layout: 'layouts/main-layout',
      errors: errors.array(),
      namaContact: req.body,
    })
  }else{
    // res.send(req.body)
    updateContacts(req.body)
    //KIRIMKAN FLASH MESSAGE
    req.flash('msg', 'Success Update...!')
    res.redirect('/contact')
  }
})


//HALAMAN DETAIL CONTACT
app.get('/contact/:nama', (req, res) => {
  const contact = findContact(req.params.nama);

  res.render('contact-detail', {
    layout: 'layouts/main-layout',
    title: 'Halaman Detail COntact',
    contact
  })
})
//PROCESS DELETE CONTACT using DELETE
app.delete('/contact/:nama', (req, res) => {
    const contact = findContact(req.params.nama)
    if(!contact){
      res.status(404)
      res.send('<h1>404</h1>')
    }else{
      deleteContact(req.params.nama)
      req.flash('msg', 'Success Delete...!')
      // res.redirect('/contact')
      res.status(204).end()
    }
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