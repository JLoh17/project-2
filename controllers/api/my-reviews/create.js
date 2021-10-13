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

// maximum character = 150? create custom validation?
const validation = [
  body('title').isString().withMessage('Equipment must be a String').notEmpty().withMessage('Equipment is Required'),
  body('rating').toInt().isInt({ min: 0, max: 5 }).withMessage('Equipment rating must be between 0 and 5'),
  body('comment').isString().withMessage('Comment must be a String').notEmpty().withMessage('Comment is Required'),
]

const apiMyReviewsCreate = async function(req, res) {
  const { locals: { currentUser } } = res
  const { body: MyReviewParams } = req

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

  const newEquipment = await Equipment.create(req.body.Equipment)
  const newRating = await currentUser.createRating({
    ...req.body.Rating,
    EquipmentId: newEquipment.id
  })
  const newComment = await currentUser.createComment({
    ...req.body.Comment,
    EquipmentId: newEquipment.id
  })

  res.status(200).json({
    ...newEquipment.dataValues,
    Ratings: [newRating.dataValues],
    Comments: [newComment.dataValues]
  })

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

  // res.render('api/my-reviews/show', {
  //   myReview: {
  //     ...newEquipment,
  //     Ratings: [newRating],
  //     Comments: [newComment]
  //   },
  //   layout: false
  // })
}

module.exports = [
  multer().none(),
  authenticateCurrentUserByToken('json'),
  validation,
  checkValidation,
  apiMyReviewsCreate
]
