function getResponseObject() {
  /* eslint-disable no-unused-vars*/
  const {
    _id,
    __v,
    hashedPassword,
    // canEmail,
    isDeleted,
    accountCreatedAt,
    lastUpdatedAt,
    lastUpdatedFields,
    payments,
    ...user
  } = this.toObject();
  return { ...user, id: _id };
}

module.exports = getResponseObject;
