import express from "express";
import Stripe from "stripe";

const stripePaymentRouter = express.Router();

stripePaymentRouter.post("/create-payment-intent", async (req, res) => {
  const secret = process.env.SECRET_KEY;
  const stripe = new Stripe(secret);

  const { amount, currency, paymentMethodType } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: [paymentMethodType],
    });
    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
});

export default stripePaymentRouter;
