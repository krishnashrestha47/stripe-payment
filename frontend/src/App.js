import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "./App.css";
import CheckoutForm from "./components/CheckoutForm";

const publishableKey = process.env.REACT_APP_PK;
const stripePromise = loadStripe(publishableKey);

function App() {
  return (
    <div className="App">
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}

export default App;
