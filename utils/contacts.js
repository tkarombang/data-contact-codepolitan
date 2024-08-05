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

//MENULISKAN / MENIMPA FILE CONTACTS.JSON DENGAN DATA YANG BARU
const saveContacts = (contacts) => {
  fs.writeFileSync('data/contacts.json', JSON.stringify(contacts))
}
//MENAMBAHKAN DATA CONTACT BARU
const addContact = (contact) => {
  const newContacts = loadContact()
  newContacts.push(contact)
  saveContacts(newContacts)
}

//CHCECK NAMA YANG DUPLICAT
const cekDuplikat = (nama) => {
  const contacts = loadContact()
  return contacts.find((contact) => contact.nama === nama)
}

//HAPUS KONTAK
const deleteContact =  (nama) => {
  const oldContacts = loadContact()
  const filteredContacts = oldContacts.filter((contact) => contact.nama !== nama)
 saveContacts(filteredContacts)
}

//UPDATE KONTAK
const updateContacts = (newContact) =>{
  const contacts = loadContact()
  //HILANGKAN KONTAK LAMA YANG NAMANYA SAMA DENGAN oldNama
  const filteredContacts = contacts.filter((contact) => contact.nama !== newContact.oldNama)
  delete newContact.oldNama
  filteredContacts.push(newContact)
  saveContacts(filteredContacts)
}

module.exports = {loadContact, findContact, addContact, cekDuplikat, deleteContact, updateContacts}