const { Op } = require("sequelize");
const { publicReviews } = require('../../../models');

const publicReviewsIndex = async function (req, res) {
  const {query} = req

  const q = query.q || ''

  res.render('pages/public-reviews/index')
}

module.exports = [publicReviewsIndex]
