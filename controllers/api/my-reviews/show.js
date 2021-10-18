const { authenticateCurrentUserByToken ,
  myReviews: { getCurrentUserReviewsById }
} = require('../../_helpers')

const apiMyReviewsShow = async function(req, res) {
  const { locals: { currentReview } } = res
  res.render('api/my-reviews/show', { Rating: currentReview, layout: false })
}

module.exports = [
  authenticateCurrentUserByToken('json'),
  getCurrentUserReviewsById('modal', true),
  apiMyReviewsShow,
]
