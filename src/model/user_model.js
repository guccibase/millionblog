class ArticleModel {
  constructor() {
    this.username,
      this.firstName,
      this.lastName,
      this.createdAt,
      this.bio,
      this.avatar;
  }

  toString() {
    return (
      this.username +
      ", " +
      this.firstName +
      ", " +
      this.lastName +
      ", " +
      this.createdAt +
      ", " +
      this.bio +
      ", " +
      this.avatar +
      ""
    );
  }
}
