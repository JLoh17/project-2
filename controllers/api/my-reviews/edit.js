const { authenticateCurrentUserByToken , myReviews: { getCurrentUserReviewsById } } = require('../../_helpers')

const apiMyWishlistsEdit = async function(req, res) {
  const { locals: { Ratings } } = res
  res.render('api/my-reviews/edit', { wishlist: currentWishlist, layout: false })
}

module.exports = [authenticateCurrentUserByToken('json'), getCurrentUserReviewsById('modal'), apiMyWishlistsEdit]
