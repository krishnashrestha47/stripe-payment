import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  const price = 500;

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    try {
      const result = await axios({
        url: "http://localhost:8000/api/payment/create-payment-intent",
        method: "POST",
        data: {
          amount: price * 100,
          currency: "aud",
          paymentMethodType: "card",
        },
      });
      console.log(result);

      const clientSecret = result.data.clientSecret;
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name,
            email,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="payment">
      <form onSubmit={handleOnSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <CardElement options={{ hidePostalCode: true }} />
        </div>
        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
};

export default CheckoutForm;
