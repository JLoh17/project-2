const { Router } = require('express')
const router = Router()

router.use('/api', require('./api'))
router.use('/', require('./pages'))

module.exports = router
