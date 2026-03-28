import React from "react";

const InputField = ({
  label,
  id,
  type,
  errors,
  register,
  required,
  message,
  classname,
  min,
  value,
  placeholder,
}) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label
        htmlFor={id}
        className={`${classname ? classname : ""} font-semibold text-sm text-slate-800`}
      >
        {label}
      </label>

      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className={`${classname ? classname : ""}
          px-2 py-2 border outline-none bg-transparent text-slate-800 rounded-md w-full
          ${errors[id]?.message ? "border-red-500" : "border-slate-700"}
        `}
        {...register(id, {
          required: required
            ? { value: true, message }
            : undefined,

          minLength: min
            ? {
                value: min,
                message: `Minimum ${min} characters are required`,
              }
            : undefined,

          pattern:
            type === "email"
              ? {
                  value:
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid Email",
                }
              : type === "url"
              ? {
                  value:
                    /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?$/,
                  message: "Please enter valid url!",
                }
              : undefined,
        })}
      />

      {errors[id]?.message && (
        <p className="text-sm font-semibold text-red-600 mt-0">
          {errors[id]?.message}
        </p>
      )}
    </div>
  );
};

export default InputField;