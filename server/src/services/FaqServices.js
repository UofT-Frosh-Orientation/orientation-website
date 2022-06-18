const FaqModel = require('../models/FaqQuestionModel')

const FaqServices = {
  async getAnsweredQuestions() {
    return FaqModel.find({ answer: { $ne: "" } })
      .sort({ lastUpdated: -1})
      .exec((err, answeredQuestions) => {
        if (err) {
          throw new Error("SERVER_ERROR")
        } else {
          return answeredQuestions
        }
      })
  }
}

module.exports = FaqServices
