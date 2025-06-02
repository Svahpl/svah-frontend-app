import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { useState } from "react";

const PaypalPayment = ({
  productPrice = 0,
  uid,
  num,
  sha,
  dmode,
  products,
  weight,
  quantity = 1,
}) => {
  const [paypalOid, setPaypalOid] = useState("");
  const initialOptions = {
    clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
  };
  const styles = {
    shapes: "rect",
    layout: "vertical",
  };
  console.log("-----degbug weight recieved", weight);
  const onCreateOrder = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/paypal/create-order`,
        { price: productPrice.toFixed(2) }
      );
      console.log(response);
      setPaypalOid(response.data.orderId);
      return response.data.orderId;
    } catch (error) {
      console.log(`Error creating order: ${error}`);
    }
  };
  const onApprove = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/order/create-order`,
      {
        userId: uid,
        phoneNumber: num,
        shippingaddress: sha,
        finalAmount: productPrice,
        shipThrough: dmode,
        items: products,
        weight,
        qty: quantity,
        paypalOrderId: paypalOid,
      }
    );
    console.log(response);
  };
  const onError = () => {
    console.error(`Payment Error`);
    // window.location.href = "/payment-cancel";
  };
  console.log("products", products);
  return (
    <>
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          style={styles}
          createOrder={onCreateOrder}
          onApprove={onApprove}
          onError={onError}
          //   fundingSource="paypal"
        ></PayPalButtons>
      </PayPalScriptProvider>
    </>
  );
};

export default PaypalPayment;
