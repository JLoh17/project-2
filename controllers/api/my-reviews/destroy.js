// const { authenticateCurrentUserByToken , myWishlist: { getCurrentUserWishlistById } } = require('../../_helpers')
const { Rating } = require('../../../models')

const apiEquipmentDestroy = async function(req, res) {
  const { locals: { currentEquipment } } = res
  await currentEquipment.destroy()
  await Rating.destroy({ where: { EquipmentId: null } })
  res.status(204).json()
}

module.exports = [
  // authenticateCurrentUserByToken('json'),
  // getCurrentUserWishlistById('json'),
  apiEquipmentDestroy
]
