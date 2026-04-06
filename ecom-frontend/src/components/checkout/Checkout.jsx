import { Button, Skeleton, Step, StepLabel, Stepper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AddressInfo } from "./AddressInfo";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserAddresses,
  selectUserCheckoutAddress,
} from "../../store/actions";
import toast from "react-hot-toast";
import { BoxSkeleton } from "../shared/BoxSkeleton";
import { ErrorPage } from "../shared/ErrorPage";

export const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();
  const { address, selectedUserAddress } = useSelector((state) => state.auth);
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const paymentMethod = false;

  const steps = ["Address", "Payment Method", "Order Summary", "Payment"];

  useEffect(() => {
    dispatch(fetchUserAddresses());
  }, [dispatch]);

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };
  const handleNext = () => {
    if (activeStep === 0 && !selectUserCheckoutAddress) {
      toast.error("Please select checkout address before proceeding");
      return;
    }

    if (activeStep === 0 && (!selectUserCheckoutAddress || !paymentMethod)) {
      toast.error("Please select checkout payment address before proceeding");
      return;
    }

    setActiveStep((prevStep) => prevStep + 1);
  };

  return (
    <div className="py-14 min-h-[calc(100vh-100px)]">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {isLoading ? (
        <div className="lg:w-[80%] mx-auto py-5">
          <Skeleton/>
          <Skeleton/>
          <Skeleton/>
          <Skeleton/>
          <Skeleton/>
          <Skeleton/>
          <Skeleton/>
          <Skeleton/>
          <Skeleton/>
          <Skeleton/>
          <Skeleton/>
          <Skeleton/>
          <Skeleton/>
          <Skeleton/>
          <Skeleton/>
          <Skeleton/>
          <Skeleton/>
          <Skeleton/>
        </div>
      ) : (
        <div className="mt-5">
          {activeStep === 0 && <AddressInfo address={address} />}
        </div>
      )}

      <div
        className="
    fixed bottom-0 left-0 right-0
    z-50
    bg-white
    border-t
    shadow-lg
    px-6 py-4
     mt-3
  "
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Back Button */}
          <Button
            variant="outlined"
            disabled={activeStep === 0}
            onClick={handleBack}
            className="px-6 py-2"
          >
            Back
          </Button>

          {/* Proceed Button */}
          {activeStep !== steps.length - 1 && (
            <button
              onClick={handleNext}
              disabled={
                errorMessage ||
                (activeStep === 0
                  ? !selectedUserAddress
                  : activeStep === 1
                    ? !paymentMethod
                    : false)
              }
              className={`
          px-8 py-3
          rounded-lg
          font-semibold
          transition
          shadow-sm
          ${
            errorMessage ||
            (activeStep === 0
              ? !selectedUserAddress
              : activeStep === 1
                ? !paymentMethod
                : false)
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-green-700"
          }
        `}
            >
              Proceed
            </button>
          )}
        </div>
      </div>

          {errorMessage && <ErrorPage message={errorMessage}/>}

    </div>
  );
};
