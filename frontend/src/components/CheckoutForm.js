import React from "react";

const CheckoutForm = () => {
  return (
    <div className="payment">
      <form>
        <div>
          <label>Name</label>
          <input type="text" name="name" />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" />
        </div>
        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
};

export default CheckoutForm;
