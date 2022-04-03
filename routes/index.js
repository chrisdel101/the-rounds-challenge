var express = require('express')
var router = express.Router()
var wordController = require('../controllers/word.controller.js')
const fetchedWords = []
/* GET home page. */
router.get('/', async function (req, res, next) {
  res.render('index', { fetchedWords: fetchedWords })
})
router.get('/word', async function (req, res, next) {
  const word = await wordController.httpsGetCall(
    'https://words.boondoc.co/words'
  )
  fetchedWords.push(word)
  console.log('word', word)
  console.log('fetched', fetchedWords)
  res.render('index', { fetchedWords: fetchedWords })
})
router.post('/', function (req, res, next) {
  console.log('req', req.body)
  res.render('index', { title: 'Express' })
})

module.exports = router
