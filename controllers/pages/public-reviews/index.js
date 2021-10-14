const { Op } = require("sequelize");
const { Rating, Equipment } = require('../../../models')

const publicReviewsIndex = async function (req, res) {
  const {query} = req

  const q = query.q || ''
  const sort = query.sort || "createdAt"
  const page = Number(query.page) || 1
  const limit = 10
  const offset = (page - 1) * limit

  const publicReviews = await Rating.findAll({
    order: [[sort, 'DESC']],
    limit,
    offset,
    include: {
      required: true,
      association: Rating.Equipment,
      where: {
        name: { // relates to name from Equipment schema
          [Op.iLike]: `%${q}%`
        }
        },
      include: {
        association: Equipment.Comments,
        required: false, // false otherwise will duplicate extra equipment where comment = 0. Basically need to do this
      }
    }
  })

// Give only one equipment ID where many duplicate equipment ID
// and for each equipment ID, provide the average rating

  res.render('pages/public-reviews/index', {
    publicReviews,
    filters: { q } // this links to pages/filter.ejs
  })
}

module.exports = [
  publicReviewsIndex
]
