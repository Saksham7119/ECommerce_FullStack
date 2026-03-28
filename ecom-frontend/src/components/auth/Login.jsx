import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { MdLogin } from "react-icons/md";
import InputField from "../shared/InputField";
import { authenticateSignInUser } from "../../store/actions";
import toast from "react-hot-toast";
import Spinners from "../shared/Spinners";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const loginHandler = async (data) => {
    console.log("Login CLicked!");
    dispatch(authenticateSignInUser(data, toast, reset, navigate, setLoader));
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex justify-center items-center">
      <form
        action=""
        onSubmit={handleSubmit(loginHandler)}
        className="sm:w-[450px] w-[360px] shadow-custom py-8 sm:px-8 px-4 rounded-md"
      >
        <div className="flex flex-col items-center justify-center ">
          <MdLogin className="text-slate-800 text-5xl" />
          <h1 className="text-slate-800 text-center font-montserrat lg:text-3xl text-2xl font-bold ">
            Login Here
          </h1>
          <hr className="mt-2 mb-5 text-black" />
          <div className="flex flex-col gap-3 w-full">
            <InputField
              label="Username"
              required
              id="username"
              type="text"
              message="Username is required"
              placeholder="Enter your username"
              register={register}
              errors={errors}
            />
            <InputField
              label="Password"
              required
              id="password"
              type="password"
              message="Password is required"
              placeholder="Enter your username"
              register={register}
              errors={errors}
            />
          </div>

          <button
            disabled={loader}
            className="bg-custom-gradient flex gap-2 items-center justify-center font-semibold text-white w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-sm my-3 "
            type="submit"
          >
            {loader ? (
              <>
                <Spinners /> Loading...
              </>
            ) : (
              <>Login</>
            )}
          </button>

          <p className="text-center text-sm text-slate-700 mt-6 mr-1">
            Don't have an account?
            <Link
              className="font-semibold underline hover:text-black"
              to="/register"
            >
              <span>SignUp</span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};
