const { Op } = require("sequelize")
const { authenticateCurrentUserByToken } = require('../../_helpers')

const { Rating, Equipment } = require('../../../models')

const myReviewsIndex = async function(req, res){
  const { query } = req
  const { locals: { currentUser } } = res // show this when have user

  const q = query.q || ''
  const sort = query.sort || "createdAt"
  const page = Number(query.page) || 1
  const limit = 5
  const offset = (page - 1) * limit
  let order = []

  if (sort === 'equipment.name') {
    order.push([Rating.Equipment, 'name', 'ASC'])
  } else {
    order.push([sort, 'DESC'])
  }

  const reviews = await Rating.findAndCountAll({
    where: {
      UserId: currentUser.id
    },
    order,
    limit,
    offset,
    include: {
      required: true,
      association: Rating.Equipment,
      duplicating: false,
      where: {
        name: { // relates to name from Equipment schema
          [Op.iLike]: `%${q}%`
        }
      },
      include: {
        association: Equipment.Comments,
        required: false, // false otherwise will duplicate extra equipment where comment = 0. Basically need to do this for all
        duplicating: false,
        where: {
          UserId: currentUser.id
        }
      }
    }
  })

  res.render('pages/my-reviews/index', {
    reviews: reviews.rows, // this links to pages/my-reviews/index.ejs
    filters: { q, page, limit, offset, totalPages: Math.ceil(reviews.count / limit) } // Q links to pages/filter.ejs
  })
}

module.exports = [
  authenticateCurrentUserByToken('html'),
  myReviewsIndex
]
