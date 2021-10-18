const { body } = require('express-validator')

const { checkValidation, authenticateCurrentUserByToken ,
  myReviews: { getCurrentUserReviewsById } } = require('../../_helpers')

const permittedChangeParams = {
  Rating: ['Equipment', 'Rating', 'Comment'],
}

const validation = [
  body('title').isString().withMessage('Equipment must be a String').notEmpty().withMessage('Equipment is Required').isLength({ max: 30 }).withMessage('Character limit is 30, please reduce the number of characters'),
  body('rating').toInt().isInt({ min: 0, max: 5 }).withMessage('Equipment rating must be between 0 and 5'),
  body('comment').isString().withMessage('Comment must be a String').notEmpty().withMessage('Comment is Required').isLength({ max: 255 }).withMessage('Character limit is 255, please reduce the number of characters'),
]

const apiMyReviewsUpdate = async function(req, res) {
  // const { body: { Ratings: titleParams, ...RatingParams } } = req
  const { locals: { currentReview } } = res

  // await currentReview.update(RatingParams, { fields: permittedChangeParams.Ratings })
  // await currentReview.destroy({ where: { currentReview: null } })

  res.render('api/my-reviews/show', { Rating: currentReview, layout: false })
}

module.exports = [
  authenticateCurrentUserByToken('json'),
  validation,
  checkValidation,
  getCurrentUserReviewsById('modal', true),
  apiMyReviewsUpdate
]
