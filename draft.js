// User
User.Equipments = this.belongsToMany(models.Equipment, {through:'Rating'})
User.Ratings = this.hasMany(models.Rating)

User.CommentedEquipments = this.belongsToMany(models.Equipment, {through:'Comment'}) // we use commentedEquipments here because otherwise replaces the line 2 (replaces the name of the association)
User.Comments = this.hasMany(models.Comment)

// // Example
// Author.Books = this.belongsToMany(models.Book, { through: 'AuthorBook' })
// Author.AuthorBooks = this.hasMany(models.AuthorBook)

// Equipment
Equipment.Users = this.belongsToMany(models.User, {through:'Rating'})
Equipment.Ratings = this.hasMany(models.Rating)

Equipment.CommentedUsers = this.belongsToMany(models.User, {through: 'Comment'}) // we use commentedUsers here because otherwise replaces the line 14 (replaces the name of the association)
Equipment.Comments = this.hasMany(models.Comment)

// // Example
// Book.Authors = this.belongsToMany(models.Author, { through: 'AuthorBook' })
// Book.AuthorBooks = this.hasMany(models.AuthorBook)

// Ratings (join table)
Rating.User = this.belongsTo(models.User)
Rating.Equipment = this.belongsTo(models.Equipment)

// // Example
// AuthorBook.Author = this.belongsTo(models.Author)
// AuthorBook.Book = this.belongsTo(models.Book)

// Comments (join table)
  Comments.User = this.belongsTo(models.User)
  Comments.Equipment = this.belongsTo(models.Equipment)
