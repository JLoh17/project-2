const { Op } = require("sequelize")
const { authenticateCurrentUserByToken } = require('../../_helpers')

const { Rating, Equipment } = require('../../../models')

const myReviewsIndex = async function(req, res){
  const { query } = req
  const { locals: { currentUser } } = res // show this when have user

  const q = query.q || ''
  const sort = query.sort || "createdAt"
  const page = Number(query.page) || 1
  const limit = 10
  const offset = (page - 1) * limit
  const reviews = await Rating.findAll({
    where: {
      UserId: currentUser.id
    },
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
        required: false, // false otherwise will duplicate extra equipment where comment = 0. Basically need to do this for all
        where: {
          UserId: currentUser.id
        }
      }
    }
  })

  res.render('pages/my-reviews/index', {
    reviews, // this links to pages/my-reviews/index.ejs
    filters: { q } // this links to pages/filter.ejs
  })
}

module.exports = [
  authenticateCurrentUserByToken('html'),
  myReviewsIndex
]
