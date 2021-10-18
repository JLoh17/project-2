const { body } = require('express-validator')
const multer = require('multer')

const { checkValidation, authenticateCurrentUserByToken ,
  myReviews: { getCurrentUserReviewsById } } = require('../../_helpers')
const { Equipment } = require('../../../models')

const permittedChangeParams = {
  Rating: ['Equipment', 'Rating', 'Comment'],
}

const validation = [
  body('title').isString().withMessage('Equipment must be a String').notEmpty().withMessage('Equipment is Required').isLength({ max: 30 }).withMessage('Character limit is 30, please reduce the number of characters'),
  body('rating').toInt().isInt({ min: 0, max: 5 }).withMessage('Equipment rating must be between 0 and 5'),
  body('comment').isString().withMessage('Comment must be a String').notEmpty().withMessage('Comment is Required').isLength({ max: 255 }).withMessage('Character limit is 255, please reduce the number of characters'),
]

const apiMyReviewsUpdate = async function(req, res) {
  const { locals: { currentReview, currentUser } } = res

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

  // Destroy and Create New Rating & Comment
  // await currentReview.Equipment.Comments[0].destroy()
  // await currentReview.destroy()
  // const newEquipment = await Equipment.findOrCreate({ where: req.body.Equipment })
  // const newRating = await currentUser.createRating({
  //   ...req.body.Rating,
  //   EquipmentId: newEquipment[0].id
  // })
  // const newComment = await currentUser.createComment({
  //   ...req.body.Comment,
  //   EquipmentId: newEquipment[0].id
  // })
  //
  // const review = {
  //   ...newRating.dataValues,
  //   Equipment: {
  //     ...newEquipment.dataValues,
  //     Comments: [
  //       newComment.dataValues
  //     ]
  //   }
  // }

  // Update Existing Rating & Comment
  const currentEquipment = await Equipment.findOrCreate({ where: req.body.Equipment })
  await currentReview.update({
    ...req.body.Rating,
    EquipmentId: currentEquipment[0].id
  })
  await currentReview.Equipment.Comments[0].update({
    ...req.body.Comment,
    EquipmentId: currentEquipment[0].id
  })

  await currentReview.reload()
  res.render('api/my-reviews/show', { Rating: currentReview, layout: false })
}

module.exports = [
  multer().none(),
  authenticateCurrentUserByToken('json'),
  validation,
  checkValidation,
  getCurrentUserReviewsById('modal', true),
  apiMyReviewsUpdate
]
