const { response } = require('express');
const { route } = require('./payRoutes');


router.use(express.static("public"));
router.use(express.json());

const router = express.Router();
const {
	getPrice,
	paymentIntent
} = require('../controllers/PayController')

router.post('/getPrice', getPrice);

// router.post('/create-checkout-session', checkoutSession);
router.post("/create-payment-intent", paymentIntent);


