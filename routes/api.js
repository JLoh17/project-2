const { Router } = require('express')
const router = Router ()

// AUTH
// router.post('/auth/signup', require('../controllers/api/auth/signup'))
router.post('/auth/login', require('../controllers/api/auth/login'))
router.delete('/auth/logout', require('../controllers/api/auth/logout'))

// Reviews
// router.get('/reviews/:id', require('../controllers/api/reviews/show'))

// My Reviews
// router.post('/my/reviews', require('../controllers/api/my-reviews/create'))
// router.get('/my/reviews/new', require('../controllers/api/my-reviews/new'))
// router.get('/my/reviews/:id', require('../controllers/api/my-reviews/show'))
// router.delete('/my/reviews/:id', require('../controllers/api/my-reviews/destroy'))
// router.put('/my/reviews/:id', require('../controllers/api/my-reviews/update'))
// router.get('/my/reviews/:id/edit', require('../controllers/api/my-reviews/edit'))

// // My Profile
// router.get('/my/profile', require('../controllers/api/my-profile/edit'))
// router.put('/my/profile', require('../controllers/api/my-profile/update'))

// Error Response
router.use(function (req, res) {
  res.status(404).json({ message: "Sorry! not exist!" })
})


module.exports = router
