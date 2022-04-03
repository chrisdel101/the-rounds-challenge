var express = require('express')
var router = express.Router()
var wordController = require('../controllers/word.controller.js')
const fetchedWords = []
const deletedWords = []
let successMsg = undefined
/* GET home page. */
router.get('/', async function (req, res, next) {
  successMsg = undefined
  // hack to solve continue undefined err``
  if (!fetchedWords) fetchWords = []
  res.render('index', {
    fetchedWords,
    successMsg: successMsg,
    deletedWords,
  })
})
router.get('/word', async function (req, res, next) {
  const fetchedWord = await wordController.httpsGetCall(
    'https://words.boondoc.co/words'
  )
  fetchedWords.push(fetchedWord)
  res.render('index', { fetchedWords, successMsg, deletedWords })
})
// post route to add
router.post('/word', async function (req, res, next) {
  // hack to solve continue undefined err``
  if (!fetchedWords) fetchWords = []
  const formData = req.body['word-post']
  if (!formData) {
    successMsg = 'Cannot add blank word'
    res.render('index', {
      fetchedWords,
      successMsg,
      deletedWords,
    })
  }

  const pushedWord = await wordController.httpPostCall(
    'https://words.boondoc.co/words',
    formData
  )
  if (!pushedWord) {
    successMsg = 'An error occured'
    res.render('index', {
      fetchedWords,
      deletedWords,
      successMsg: successMsg,
    })
  }

  if (/2\d\d$/.test(res.statusCode.toString())) {
    successMsg = 'success adding word'
    res.render('index', {
      fetchedWords,
      successMsg,
      deletedWords,
    })
  }
})
// delete route
router.get('/delete-word', async function (req, res, next) {
  const deleteWord = await wordController.httpDeleteCall(
    'https://words.boondoc.co/words'
  )
  if (!deletedWords) deletedWords = []
  deletedWords.push(deleteWord)
  res.render('index', { fetchedWords, successMsg, deletedWords })
})

module.exports = router
