import { InputProps } from "@/utils/types/Form/Input";
import { motion } from "framer-motion";
import React from "react";

export default function Input({
  register,
  errors,
  id,
  type = "text",
  placeholder = "Enter Text",
  name = "",
  icon,
  className = "",
  settings = {},
  isAuth = true,
}: InputProps) {
  return (
    <div className={`${className} relative`}>
      <label
        htmlFor={id}
        className="block text-sm font-bold mb-2 px-2 capitalize"
      >
        {name}
      </label>
      <div className="relative">
        {icon && (
          <label
            htmlFor={id}
            className="absolute inset-y-0 start-0 px-3 flex items-center pointer-events-none z-10"
          >
            {icon}
          </label>
        )}
        <input
          id={id}
          type={type}
          {...settings}
          {...(register ? register(id) : {})}
          aria-invalid={!!errors?.[id]}
          aria-describedby={errors?.[id] ? `${id}-error` : undefined}
          className={`
            ${isAuth ? "" : "text-neutral1 bg-primary"}
            w-full ${
              !!icon ? "ps-12" : "ps-4"
            }  pe-4 py-3 bg-white border-2 border-gray-200 rounded-lg  
            focus:outline-none focus:ring-2 focus:ring-blue-400
            focus:border-transparent transition-all duration-300 disabled:bg-gray-400`}
          placeholder={placeholder}
        />
      </div>
      {errors?.[id] && (
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          id={`${id}-error`}
          role="alert"
          className="text-sm absolute rtl:right-0"
        >
          <p className="text-red-400 font-medium rtl:text-right">
            {errors[id].message}
          </p>
        </motion.div>
      )}
    </div>
  );
}
