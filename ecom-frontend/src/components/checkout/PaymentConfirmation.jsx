import React, { useEffect, useState, CheckCircle } from "react";
import { useLocation } from "react-router-dom";
// import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { stripePaymentConfirmation } from "../../store/actions";

const PaymentConfirmation = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const { cart } = useSelector((state) => state.carts);
  const [loading, setLoading] = useState(false);

  const storedAddress = localStorage.getItem("CHECKOUT_ADDRESS");
const finalCheckoutAddress = storedAddress ? JSON.parse(storedAddress) : null;

  const paymentIntent = searchParams.get("payment_intent");
  const clientSecret = searchParams.get("payment_intent_client_secret");
  const redirectStatus = searchParams.get("redirect_status");

  useEffect(() => {
    if (paymentIntent && clientSecret && redirectStatus && cart && finalCheckoutAddress) {

      const sendData = {
        addressId: finalCheckoutAddress.addressID,
        pgName: "Stripe",
        pgPaymentId: "pi_1234567890",
        pgStatus: "success",
        pgResponseMessage: "Payment Successful",
      };
      dispatch(
        stripePaymentConfirmation(setErrorMessage, setLoading, toast, sendData),
      );
    }
  }, [paymentIntent, clientSecret, redirectStatus, cart]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full"
      >
        {/* Icon */}
        {/* <div className="text-green-500 mb-4 flex justify-center">
          <CheckCircle size={64} />
        </div> */}

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Payment Successful!
        </h2>

        {/* Subtitle */}
        <p className="text-gray-600 mb-6">
          Your payment has been processed successfully.
        </p>
      </div>
    </div>
  );
};

export default PaymentConfirmation;
