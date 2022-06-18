const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

const PaymentServices = {
  async createCheckoutSession(items) {
    //TODO: map items onto price ids stored in mongo
    return await stripe.checkout.sessions.create({
      success_url: "https://google.com",
      cancel_url: 'https://google.com',
      line_items: [],
      mode: 'payment'
    })
  }
}
