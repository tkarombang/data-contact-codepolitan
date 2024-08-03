const { json } = require('express')
const fs = require('fs')

//MEMBUAT FOLDER DATA JIKA BELUM ADA
const dirPath = './data'
if(!fs.existsSync(dirPath)){
  fs.mkdirSync(dirPath);
}

//MEMBUAT FILE CONTACT.JSON JIKA BELUM ADA
const dataPath = './data/comments.json'
if(!fs.existsSync(dataPath)){
  fs.writeFileSync(dataPath, '[]', 'utf-8')
}

//AMBIL SEMUA DATA DI CONTACT JSON
const loadComment = () => {
  const fileBuffer = fs.readFileSync('data/comments.json', 'utf-8')
  const comments = JSON.parse(fileBuffer)
  return comments
}

module.exports = { loadComment }