// const { wishlist: { getWishlistById } } = require('../../_helpers')

const apiPublicReviewsShow = async function(req, res) {
  const { locals: { currentWishlist } } = res
  res.render('api/public-reviews/show', { wishlist: currentWishlist, layout: false })
}

module.exports = [
  // getWishlistById('modal'),
  apiPublicReviewsShow
]

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
