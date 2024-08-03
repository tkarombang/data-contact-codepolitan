const { json } = require('express');
const fs = require('fs')

//MEMBUAT FOLDER DATA JIKA BELUM ADA
const dirPath = './data'
if(!fs.existsSync(dirPath)){
  fs.mkdirSync(dirPath);
}

//MEMBUAT FILE CONTACTS.JSON JIKA BELUM ADA
const dataPath = './data/contacts.json'
if(!fs.existsSync(dataPath)){
  fs.writeFileSync(dataPath, '[]', 'utf-8')
}

//AMBIL SEMUA DATA DI CONTACT.JSON
const loadContact = () => {
  const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8')
  const contacts = JSON.parse(fileBuffer)
  return contacts
}

//CARI CONTACT BERDASARKAN NAMA
const findContact = (nama) => {
  const getContact = loadContact();
  const detailContact = getContact.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase())
  return detailContact
}

module.exports = {loadContact, findContact}