const { Op } = require("sequelize");
const { Rating, Equipment, sequelize } = require('../../../models')

const publicReviewsIndex = async function (req, res) {
  const {query} = req

  const q = query.q || ''
  const sort = query.sort || "createdAt"
  const page = Number(query.page) || 1
  const limit = 10
  const offset = (page - 1) * limit
  let order = []

  if (sort === 'avgRating') {
    order.push ([sequelize.col('avgRating'), 'DESC'])
  } else if (sort === 'name') {
    order.push (['name', 'ASC'])
  } else {
    order.push([sort, 'DESC'])
  }


  const equipments = await Equipment.findAll({
    attributes: {
      include: [
        [sequelize.fn('AVG', sequelize.col('Ratings.rating')), 'avgRating']
      ],
    },
    where: {
      name: {
        [Op.iLike]: `%${q}%`
      },
    },
    having: sequelize.literal(`AVG("Ratings"."rating") IS NOT NULL`),
    include: {
      duplicating: false, // need to use duplicating false otherwise the order, limit and offset will be duplicated in the sub-query
      association: Equipment.Ratings,
      attributes: []
    },
    group: ['Equipment.id'],
    order,
    // order: [[equipment.id, 'ASC']], <- for testing
    // order: [[sequelize.col('avgRating'), 'DESC']], <- for testing
    limit,
    offset
  })

  // Give only one equipment ID where many duplicate equipment ID
  // and for each equipment ID, provide the average rating
  res.render('pages/public-reviews/index', {
    equipments,
    filters: { q } // this links to pages/filter.ejs
  })
}

module.exports = [
  publicReviewsIndex
]
