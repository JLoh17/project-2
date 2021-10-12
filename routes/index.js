const { Router } = require('express')
const router = Router()

const { getUserByToken } = require('../controllers/_helpers') // this defines currentUser and is a middleware

router.use('/api', getUserByToken, require('./api'))
router.use('/', getUserByToken, require('./pages'))

module.exports = router
