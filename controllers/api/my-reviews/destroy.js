const { authenticateCurrentUserByToken,
  myReviews: { getCurrentUserReviewsById }
} = require('../../_helpers')
const { Rating } = require('../../../models')

const apiEquipmentDestroy = async function(req, res) {
  const { locals: { currentReview } } = res
  const { params: { id }} = req // id => api.router :id
  await currentReview.destroy()
  await Rating.destroy({ where: { rating: id }})
  res.status(204).json()
}

module.exports = [
  authenticateCurrentUserByToken('json'),
  getCurrentUserReviewsById('json'),
  apiEquipmentDestroy
]
