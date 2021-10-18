const { authenticateCurrentUserByToken ,
  myReviews: { getCurrentUserReviewsById }
} = require('../../_helpers')

const apiMyReviewsShow = async function(req, res) {
  const { locals: { currentReview } } = res
  console.log(currentReview)

  res.render('api/my-reviews/edit', { Rating: currentReview, layout: false })
}

module.exports = [
  authenticateCurrentUserByToken('json'),
  getCurrentUserReviewsById('modal', true),
  apiMyReviewsShow,
]
