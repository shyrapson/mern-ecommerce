const { StatusCodes } = require("http-status-codes");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

const stripePayment = (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(StatusCodes.UNAVAILABLE).json(stripeErr);
      } else {
        res.status(StatusCodes.OK).json(stripeRes);
      }
    }
  );
};

module.exports = stripePayment;
