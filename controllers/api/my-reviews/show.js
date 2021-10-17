const { authenticateCurrentUserByToken ,
  myReviews: { getCurrentUserReviewsById }
} = require('../../_helpers')

const apiMyReviewsShow = async function(req, res) {
  const { locals: { review } } = res
  res.render('api/my-reviews/show', { review, layout: false })
}

module.exports = [
  authenticateCurrentUserByToken('json'),
  getCurrentUserReviewsById('modal'),
  apiMyReviewsShow,
]
