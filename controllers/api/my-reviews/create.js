const { body } = require('express-validator')
// const MulterParser = require('../../../services/MulterParser')
const multer = require('multer')


const { authenticateCurrentUserByToken, checkValidation } = require('../../_helpers')
const { Equipment } = require('../../../models')

const permittedParams = [
  'Equipment',
  'Rating',
  'Comment',
]

const validation = [
  body('title').isString().withMessage('Equipment must be a String').notEmpty().withMessage('Equipment is Required'),
  body('rating').toInt().isInt({ min: 0, max: 5 }).withMessage('Equipment rating must be between 0 and 5'),
  body('comment').isString().withMessage('Comment must be a String').notEmpty().withMessage('Comment is Required').isLength({ max: 255 }).withMessage('Character limit is 255, please reduce the number of characters'), // these are express validators
]

const apiMyReviewsCreate = async function(req, res) {
  const { locals: { currentUser } } = res

  req.body = {
    Rating: {
      rating: req.body.rating,
    },
    Equipment: {
      name: req.body.title,
    },
    Comment: {
      comment: req.body.comment
    }
  }

  const newEquipment = await Equipment.findOrCreate({ where: req.body.Equipment })
  const newRating = await currentUser.createRating({
    ...req.body.Rating,
    EquipmentId: newEquipment[0].id
  })
  const newComment = await currentUser.createComment({
    ...req.body.Comment,
    EquipmentId: newEquipment[0].id
  })

  res.status(200).json({
    ...newEquipment.dataValues,
    Ratings: [newRating.dataValues],
    Comments: [newComment.dataValues]
  })
}

module.exports = [
  multer().none(),
  authenticateCurrentUserByToken('json'),
  validation,
  checkValidation,
  apiMyReviewsCreate
]
