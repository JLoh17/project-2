// const { authenticateCurrentUserByToken } = require('../../_helpers')

const { Equipment, Rating  } = require('../../../models')

const apiMyReviewsNew = async function(req, res) {
  const myReviews = await Equipment.build({
    Rating: []
  }, {
    include: Equipment.Rating
  })
  myReviews.Rating.push(await Rating.build())

  res.render('api/my-reviews/new', { myReviews, layout: false })
}

module.exports = [
  // authenticateCurrentUserByToken('json'),
  apiMyReviewsNew]
