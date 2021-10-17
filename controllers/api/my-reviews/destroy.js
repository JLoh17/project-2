const { authenticateCurrentUserByToken,
  myReviews: { getCurrentUserReviewsById }
} = require('../../_helpers')
const { Rating } = require('../../../models')

const apiEquipmentDestroy = async function(req, res) {
  const { locals: { currentReview } } = res
  await currentReview.destroy()
  res.status(204).json()
}

module.exports = [
  authenticateCurrentUserByToken('json'),
  getCurrentUserReviewsById('json'),
  apiEquipmentDestroy
]
