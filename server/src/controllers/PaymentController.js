const PaymentServices = require('../services/PaymentServices');
const FroshServices = require('../services/FroshServices');

const PaymentController = {
  async handleWebhook(req, res, next) {
    let event;
    const signature = req.headers['stripe-signature'];
    try {
      event = await PaymentServices.decodeWebhookEvent(req.body, signature);
    } catch (error) {
      next(error);
    }
    try {
      switch (event.type) {
        case 'payment_intent.succeeded': {
          const { id, amount_received } = event.data.object;

          console.log('Handling payment intent');
          // update frosh model to have paid successfully
          await PaymentServices.updatePayment(id, amount_received);
          break;
        }
        case 'checkout.session.expired': {
          const { payment_intent } = event.data.object;
          await PaymentServices.expirePayment(payment_intent);
          break;
        }
        default:
          console.log(`Unhandled event type: ${event.type}`);
      }
      res.status(200).send({ message: 'Webhook processed' });
    } catch (error) {
      req.log.fatal({ msg: 'Unable to process payment', error });
      next(error);
    }
  },

  async createCheckout(req, res, next) {
    try {
      const { email } = req.user;
      const { url } = await PaymentServices.createCheckoutSession(email, 'orientation');
      res.redirect(303, url);
    } catch (err) {
      req.log.fatal({ msg: 'Unable to create checkout', err });
      next(new Error('UNABLE_TO_CREATE_CHECKOUT'));
    }
  },

  async froshRetreatTicketCount(req, res, next) {
    try {
      const count = await PaymentServices.getNonExpiredPaymentsCountForItem('Retreat Ticket');
      console.log(`retreat tickets being purchased : ${count}`);
      const remaining = process.env.RETREAT_MAX_TICKETS - count;
      res.status(200).send({ count: remaining < 0 ? 0 : remaining });
    } catch (e) {
      req.log.error({ msg: 'Unable to get frosh retreat ticket count', e });
      next(e);
    }
  },

  async froshRetreatPayment(req, res, next) {
    try {
      const user = req.user;
      const count = await PaymentServices.getNonExpiredPaymentsCountForItem('Retreat Ticket');
      if (count < process.env.RETREAT_MAX_TICKETS) {
        const { url, payment_intent } = await PaymentServices.createCheckoutSession(
          user.email,
          'retreat',
        );

        const frosh = await FroshServices.addRetreatPayment(user, payment_intent);
        if (!frosh) {
          res.status(400).send({ message: 'Something went wrong!' });
        }
        res.status(200).send({ url });
      } else {
        res.status(400).send({
          message: 'Sold out! Please check back later in case more tickets become available',
        });
      }
    } catch (e) {
      req.log.fatal({
        msg: 'Unable to process frosh retreat payment: user ' + req.user.id,
        e,
        user: req.user.getResponseObject(),
      });
      next(e);
    }
  },
};

module.exports = PaymentController;
