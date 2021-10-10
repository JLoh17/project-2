const { Router } = require('express')
const router = Router()

router.use('/my/reviews', require('../controllers/pages/my-reviews/index'))
router.use('/reviews', require('../controllers/pages/public-reviews/index'))
router.get('/', require('../controllers/pages/static/home'))

// Error Response
router.use(function (req, res) {
  res.render('not-found', { message: "Sorry, the page you are looking for does not exist!"})
})

module.exports = router
