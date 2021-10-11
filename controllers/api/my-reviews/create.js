const { body } = require('express-validator')
// const MulterParser = require('../../../services/MulterParser')

// const { authenticateCurrentUserByToken, checkValidation } = require('../../_helpers')
const { Equipment } = require('../../../models')

const permittedParams = [
  'Equipment',
  'Rating',
  'Comment',
]

// maximum character = 150? create custom validation?
const validation = [
  body('Equipment').isString().withMessage('Equipment must be a String').notEmpty().withMessage('Equipment is Required'),
  body('Rating.*.importance').toInt().isInt({ min: 0, max: 5 }).withMessage('Equipment rating must be between 0 and 5'),
  body('Comment').isString().withMessage('Comment must be a String').notEmpty().withMessage('Comment is Required'),
]

const apiMyReviewsCreate = async function(req, res) {
  const { locals: { currentUser } } = res
  const { body: MyReviewParams } = req

  // req.body = {
  //   Rating: {
  //     rating: 0,
  //   },
  //   Equipment: {
  //     equipmentName: '',
  //   },
  //   Comment: {
  //     comment: ''
  //   }
  // }

  // This is for public reviews
  // const newEquipment = await Equipment.create(req.body.Equipment)
  // const newRating = await currentUser.createRating({
  //   ...req.body.Rating,
  //   equipmentID: newEquipment.id
  // })
  // const newComment = await currentUser.createComment({
  //   ...req.body.Comment,
  //   equipmentID: newEquipment.id
  // })

  // await Equipment.findAll({
  //   where: {
  //     id: Number(req.params.id) || 0
  //   },
  //   include: [
  //     {
  //       association: Equipment.Ratings
  //     }, {
  //       association: Equipment.Comments
  //     }
  //   ]
  // })

  res.render('api/my-reviews/show', {
    myReview: {
      ...newEquipment,
      Ratings: [newRating],
      Comments: [newComment]
    },
    layout: false
  })
}

module.exports = [
  // MulterParser.none(),
  // authenticateCurrentUserByToken('json'),
  validation,
  // checkValidation,
  apiMyReviewsCreate
]
