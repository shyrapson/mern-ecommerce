import axios from "axios";
import { useNavigate } from "react-router";
import React, { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
const KEY =
  "pk_test_51LgHLrKHu6EECHAYl7ssOa7ppzoCufsnuyy52NXFfzMYy6tH8ZEmQUqC9HEZB7bO93pAug0aJmpIJUVbmMeGTaKc00vhxcc78B";

const Pay = () => {
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post(
          "http://localhost:3000/api/v1/checkout/payment",
          {
            tokenId: stripeToken.id,
            amount: 2000,
          }
        );
        console.log(res.data, "respppp");
        navigate("/success");
      } catch (error) {
        console.log(error); 
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken, navigate]);

  return (
    <div className="pay__wrapper">
      {stripeToken ? (
        <span>Processing. please wait...</span>
      ) : (
        <StripeCheckout
          name="Saeed Shop"
          image="https://pixabay.com/illustrations/online-internet-icon-symbols-www-942406/"
          billingAddress
          shippingAddress
          description="your total is $20"
          amount={2000}
          token={onToken}
          stripeKey={KEY}
        >
          <button className="pay__btn">Pay Now</button>
        </StripeCheckout>
      )}
    </div>
  );
};

export default Pay;
