import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";

const PaypalPayment = () => {
  const initialOptions = {
    clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
  };
  const styles = {
    shapes: "rect",
    layout: "vertical",
  };
  const onCreateOrder = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/paypal/create-order`
      );
      console.log(response);
      return response.data.orderId;
    } catch (error) {
      console.log(`Error creating order: ${error}`);
    }
  };
  const onApprove = () => {
    window.location.href = "/complete-payment";
  };
  const onError = () => {
    console.error(`Payment Error`);
    window.location.href = "/payment-cancel";
  };
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
