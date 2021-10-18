const { Equipment } = require('../../../models')

const apiMyReviewsNew = async function(req, res) {
  const dataStructure = {
    Equipment: {},
    Rating: {},
    Comment: {}
  }

  res.render('api/my-reviews/new', { dataStructure, layout: false })
}

module.exports = [
  apiMyReviewsNew]
