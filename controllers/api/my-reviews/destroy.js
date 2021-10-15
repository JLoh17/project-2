const { authenticateCurrentUserByToken,
  myReviews: { getCurrentUserReviewsById }
} = require('../../_helpers')
const { Rating } = require('../../../models')

const apiEquipmentDestroy = async function(req, res) {
  const { locals: { ReviewId } } = res
  await ReviewId.destroy()
  await Rating.destroy({ where: { ReviewId: id } })
  res.status(204).json()
}

module.exports = [
  authenticateCurrentUserByToken('json'),
  getCurrentUserReviewsById('json'),
  apiEquipmentDestroy
]
