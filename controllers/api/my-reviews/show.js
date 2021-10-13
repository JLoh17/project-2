const { authenticateCurrentUserByToken ,
  // myWishlist: { getCurrentUserReviewsById }
} = require('../../_helpers')

const apiMyReviewsShow = async function(req, res) {
  const { locals: { currentWishlist } } = res
  res.render('api/my-wishlists/show', { wishlist: currentWishlist, layout: false })
}

module.exports = [
  authenticateCurrentUserByToken('json'),
  // getCurrentReviewsById('modal'),
  apiMyReviewsShow
]
