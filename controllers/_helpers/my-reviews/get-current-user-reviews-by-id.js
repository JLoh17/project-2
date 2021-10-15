const { Rating } = require('../../../models')

module.exports = function(format) {
  return async function (req, res, next) {
    const { locals: { currentUser } } = res
    const { params: { id } } = req
    const rating = await Rating.findOne({
      where: {
        id: Number(id) || 0,
        UserId: currentUser.id
      },
      include: {
        association: Rating.Equipment
      },
      order: [['EquipmentId', 'DESC']]
    })

    if (!rating) {
      if (format === 'modal') {
        return res.render('api/my-reviews/not-found', { layout: false })
      }

      if (format === 'json') {
        return res.status(404).json({ message: `Rating of ID ${id} not found!` })
      }
    }

    res.locals.currentReview = rating

    next()
  }
}
