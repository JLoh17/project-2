const { Op } = require("sequelize")
const { Rating, Equipment } = require('../../../models')

const myReviewsIndex = async function(req, res){
  const {query} = req
  // const { locals: { currentUser } } = res <-- show this when have user
  const currentUserId = 17 // for explanation

  const q = query.q || ''

  const reviews = await Rating.findAll({
    where: {
      UserId: currentUserId
    },
    include: {
      required: true,
      association: Rating.Equipment,
      include: {
        association: Equipment.Comments,
        required: false, // false otherwise will duplicate extra equipment where comment = 0. Basically need to do this for all
        where: {
          UserId: currentUserId
        }
      }
    }
  })

  res.render('pages/my-reviews/index', { reviews }) // this links to pages/my-reviews/index.ejs
}

module.exports = [myReviewsIndex]
