const { Op } = require("sequelize")
const { myReviews } = require('../../../models')

const myReviewsIndex = async function(req, res){
  const {query} = req

  const q = query.q || ''
  res.render('pages/my-reviews/index')
}

module.exports = [myReviewsIndex]
