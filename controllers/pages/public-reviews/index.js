const { Op } = require("sequelize");
const { Rating, Equipment } = require('../../../models')

const publicReviewsIndex = async function (req, res) {
  const {query} = req

  const q = query.q || ''

  const publicReviews = await Rating.findAll({
    include: {
      required: true,
      association: Rating.Equipment,
      include: {
        association: Equipment.Comments,
        required: false, // false otherwise will duplicate extra equipment where comment = 0. Basically need to do this
      }
    }
  })

// Give only one equipment ID where many duplicate equipment ID
// and for each equipment ID, provide the average rating

  res.render('pages/public-reviews/index', { publicReviews })
}

module.exports = [
  publicReviewsIndex
]
