import { FaEye, FaEyeSlash } from "react-icons/fa";
import React, { useState } from "react";
import { FaLock } from "react-icons/fa";
import { InputProps } from "@/utils/types/Form/Input";
import { motion } from "framer-motion";

export default function PasswordInput({
  name,
  register,
  errors,
  id = "password",
  placeholder = "Enter Password",
  icon,
  className,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className={`${className} relative`}>
      <label
        htmlFor={id}
        className="block text-sm font-medium capitalize text-gray-700 mb-2"
      >
        {name}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none z-10">
          <span className="text-gray-400">
            {icon ? icon : <FaLock className="text-primaryA1" size={22} />}
          </span>
        </div>
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          {...register(id)}
          className={`
                w-full ps-12 pe-4 py-3 bg-white border-2 border-gray-200 rounded-lg  
                focus:outline-none focus:ring-2 focus:ring-blue-400
                focus:border-transparent transition-all duration-300`}
          placeholder={placeholder}
        />
        <button
          type="button"
          className="absolute inset-y-0 end-0 pe-3 flex items-center"
          onClick={() => setShowPassword(!showPassword)}
        >
          <span className=" cursor-pointer text-gray-400">
            {showPassword ? (
              <FaEyeSlash className="w-5 h-5" />
            ) : (
              <FaEye className="w-5 h-5" />
            )}
          </span>
        </button>
      </div>
      {errors?.[id] && (
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="text-sm absolute rtl:right-0"
        >
          <p className="text-red-400 font-medium">{errors[id].message}</p>
        </motion.div>
      )}
    </div>
  );
}
