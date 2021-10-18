const { body } = require('express-validator')

const { checkValidation, authenticateCurrentUserByToken , myWishlist: { getCurrentUserWishlistById } } = require('../../_helpers')

const permittedChangeParams = {
  Rating: ['title', 'rating', 'comment'],
}

const validation = [
  body('title').isString().withMessage('Equipment must be a String').notEmpty().withMessage('Equipment is Required'),
  body('rating').toInt().isInt({ min: 0, max: 5 }).withMessage('Equipment rating must be between 0 and 5'),
  body('comment').isString().withMessage('Comment must be a String').notEmpty().withMessage('Comment is Required'),
]

const apiMyWishlistsUpdate = async function(req, res) {
  const { body: { Ratings: titleParams, ...ratingParams } } = req
  const { locals: { currentReview } } = res

  await currentReview.update(RatingParams, { fields: permittedChangeParams.Wishlist })
  await WishlistItem.destroy({ where: { WishlistId: null } })

  res.render('api/my-wishlists/show', { Rating: currentReview, layout: false })
}

module.exports = [
  authenticateCurrentUserByToken('json'),
  validation,
  checkValidation,
  getCurrentUserWishlistById('modal'),
  apiMyWishlistsUpdate
]
