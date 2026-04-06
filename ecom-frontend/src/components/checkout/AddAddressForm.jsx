import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaAddressCard } from "react-icons/fa";
import { MdLogin } from "react-icons/md";
import InputField from "../shared/InputField";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Spinners from "../shared/Spinners";
import { addUpdateUserAddress } from "../../store/actions";

export const AddAddressForm = ({address , setOpenAddressModal}) => {
  const dispatch = useDispatch();
  const { btnLoader } = useSelector((state) => state.errors);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const onSaveAddressHandler = async (data) => {
    dispatch(addUpdateUserAddress(data, toast , address?.addressID , setOpenAddressModal));
  };

  useEffect(()=>{
    if(address?.addressID){
      setValue("buildingName" , address?.buildingName)
      setValue("city" , address?.city)
      setValue("street" , address?.street)
      setValue("state" , address?.state)
      setValue("pincode" , address?.pincode)
      setValue("country" , address?.country)
    }
  },[address])

  return (
    <div className="">
      <form
        action=""
        onSubmit={handleSubmit(onSaveAddressHandler)}
        className=""
      >
        <div className="flex justify-center items-center font-semibold mb-4 text-2xl text-slate-800 py-2 px-4 ">
          <FaAddressCard className="mr-2 text-2xl" />
          <h1 className="text-slate-800 text-center font-montserrat lg:text-3xl text-2xl font-bold ">
            {console.log(address)}
            {address?.addressID ? "Update Address" : "Add New Address"}
          </h1>
        </div>
        <hr className="mt-2 mb-5 text-black" />
        <div className="flex flex-col gap-4">
          <InputField
            label="Building Name"
            required
            id="buildingName"
            type="text"
            message="Bulding Name is required"
            placeholder="Enter your building name"
            register={register}
            errors={errors}
          />
          <InputField
            label="City"
            required
            id="city"
            type="text"
            message="City is required"
            placeholder="Enter your City"
            register={register}
            errors={errors}
          />
          <InputField
            label="State"
            required
            id="state"
            type="text"
            message="State is required"
            placeholder="Enter your State"
            register={register}
            errors={errors}
          />
          <InputField
            label="Pincode"
            required
            id="pincode"
            type="number"
            message="Pincode is required"
            placeholder="Enter your Pincode"
            register={register}
            errors={errors}
          />
          <InputField
            label="Street"
            required
            id="street"
            type="text"
            message="Steet is required"
            placeholder="Enter your street"
            register={register}
            errors={errors}
          />
          <InputField
            label="Country"
            required
            id="country"
            type="text"
            message="Country is required"
            placeholder="Enter your Country"
            register={register}
            errors={errors}
          />
        </div>

        <button
          disabled={btnLoader}
          className="bg-custom-gradient flex gap-2 items-center justify-center font-semibold text-white w-full py-2 hover:text-red-500 transition-colors duration-100 rounded-sm my-3 "
          type="submit"
        >
          {btnLoader ? (
            <>
              <Spinners /> Loading...
            </>
          ) : (
            <>Add</>
          )}
        </button>
      </form>
    </div>
  );
};
