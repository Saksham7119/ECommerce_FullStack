import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPaymentMethod, createUserCart } from "../../store/actions";

export const PaymentMethod = () => {
  const { paymentMethod } = useSelector((state) => state.payment);
  const { cart, cartId } = useSelector((state) => state.carts);
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const dispatch = useDispatch();

  const paymentMethodHandler = (method) => {
    dispatch(addPaymentMethod(method));
  };

  useEffect(() => {
      console.log("Cart Length - "+cart.length , " Cart Id - " + cartId + " Error Message - " +
      errorMessage);
      
    //
    if (cart.length > 0 && !cartId ) {
      const sendCartItems = cart.map((item) => {
        return {
          productId: item.productId,
          quantity: item.quantity,
        };
      });

      dispatch(createUserCart(sendCartItems));
    }
  }, [cartId]);

  return (
    <div className="max-w-md mx-auto p-5 bg-white shadow-md rounded-lg mt-16 border">
      <h1 className="text-2xl font-semibold mb-4 text-center">
        Select Payment Method
      </h1>
      <FormControl>
        <RadioGroup
          aria-labelledby="payment method"
          name="paymentMethod"
          value={paymentMethod}
          onChange={(e) => paymentMethodHandler(e.target.value)}
        >
          <FormControlLabel value="Stripe" control={<Radio />} label="Stripe" />
          <FormControlLabel value="Paypal" control={<Radio />} label="Paypal" />
        </RadioGroup>
      </FormControl>
    </div>
  );
};
