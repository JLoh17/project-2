module.exports = {
  getUserByToken: require('./get-user-by-token'),
  authenticateCurrentUserByToken: require('./authenticate-current-user-by-token'),
  checkValidation: require('./check-validation'),
  myReviews: {
    getCurrentUserReviewsById: require('./my-reviews/get-current-user-reviews-by-id')
  }
}
