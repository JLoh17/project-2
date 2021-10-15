const { authenticateCurrentUserByToken , myReviews: { getCurrentUserReviewsById } } = require('../../_helpers')

const apiMyWishlistsEdit = async function(req, res) {
  const { locals: { currentRating } } = res
  res.render('api/my-reviews/edit', { ratings: currentRating, layout: false })
}

module.exports = [authenticateCurrentUserByToken('json'), getCurrentUserReviewsById('modal'), apiMyWishlistsEdit]
