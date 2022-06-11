function getResponseObject() {
  const {
    _id,
    __v,
    hashedPassword,
    authScopes,
    canEmail,
    isDeleted,
    accountCreatedAt,
    lastUpdatedAt,
    lastUpdatedFields,
    ...user
  } = this.toObject();
  return { ...user, id: _id };
}

module.exports = getResponseObject;
