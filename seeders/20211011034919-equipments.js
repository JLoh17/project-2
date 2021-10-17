const { User, Equipment, Rating, Comment } = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await User.destroy({ truncate: true })
    await Equipment.destroy({ truncate: true })
    await Rating.destroy({ truncate: true })
    await Comment.destroy({ truncate: true })

    const newUser = await User.create({
      email: 'test@test.com',
      password: '000000',
      profileName: 'hi'
    })

    const formattedData = {
      Equipment: {
        name: 'Mac'
      },
      Rating: {
        rating: 5
      },
      Comment: {
        comment: 'Great!'
      }
    }

    const newEquipment = await Equipment.create(formattedData.Equipment)
    const newRating = await newUser.createRating({
      ...formattedData.Rating,
      EquipmentId: newEquipment.id
    })
    const newComment = await newUser.createComment({
      ...formattedData.Comment,
      EquipmentId: newEquipment.id
    })

    const results = await Equipment.findAll({
      where: {
        id: newEquipment.id
      },
      include: [
        {
          association: Equipment.Ratings,
          where: {
            UserId: newUser.id
          }
        }, {
          association: Equipment.Comments,
          where: {
            UserId: newUser.id
          }
        }
      ]
    })

  }
};
