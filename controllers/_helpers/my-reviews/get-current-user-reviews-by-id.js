const { Rating, Equipment } = require('../../../models')

module.exports = function(format, useAssociation) {
  return async function (req, res, next) {
    const { locals: { currentUser } } = res
    const { params: { id } } = req

    let options = {}

    if (useAssociation) {
      options = {
        include: [
          {
            required: true,
            association: Rating.Equipment,
            duplicating: false,
            include: {
              association: Equipment.Comments,
              required: false, // false otherwise will duplicate extra equipment where comment = 0. Basically need to do this for all
              duplicating: false,
              where: {
                UserId: currentUser.id
              }
            }
          }, {
            association: Rating.User
          }
        ]
      }
    }

    const rating = await Rating.findOne({
      where: {
        id: Number(id) || 0,
        UserId: currentUser.id
      },
      ...options
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
