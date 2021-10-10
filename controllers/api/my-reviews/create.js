const { body } = require('express-validator')
// const MulterParser = require('../../../services/MulterParser')

// const { authenticateCurrentUserByToken, checkValidation } = require('../../_helpers')
const { Equipment } = require('../../../models')

const permittedParams = [
  'Equipment',
  'Rating',
  'Comment',

  ''
]

// maximum character = 150? create custom validation?
const validation = [
  body('Equipment').isString().withMessage('Equipment must be a String').notEmpty().withMessage('Equipment is Required'),
  body('Rating.*.importance').toInt().isInt({ min: 0, max: 5 }).withMessage('Equipment rating must be between 0 and 5'),
  body('Comment').isString().withMessage('Comment must be a String').notEmpty().withMessage('Comment is Required'),
]

const apiMyReviewsCreate = async function(req, res) {
  const { locals: { currentUser } } = res
  const { body: MyReviewParams } = req
  const newMyReview = await Review.create({
    ...MyReviewParams,
  }, {
    fields: permittedParams,
    include: {
      association: Equipment.Ratings
    }
  })
  myReviews.setUser(currentUser)

  res.render('api/my-reviews/show', { myReview: myReviews, layout: false })
}

module.exports = [
  // MulterParser.none(),
  // authenticateCurrentUserByToken('json'),
  validation,
  // checkValidation,
  apiMyReviewsCreate
]
