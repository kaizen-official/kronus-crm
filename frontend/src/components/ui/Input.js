"use client";

import clsx from "clsx";
import { forwardRef } from "react";
import { motion } from "framer-motion";

const Input = forwardRef(({
  label,
  error,
  type = "text",
  className,
  containerClassName,
  ...props
}, ref) => {
  return (
    <div className={clsx("w-full", containerClassName)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <motion.div
        initial={false}
        animate={error ? { x: [-2, 2, -2, 2, 0] } : {}}
      >
        <input
          ref={ref}
          type={type}
          className={clsx(
            "w-full px-4 py-3 text-black rounded-lg border bg-white focus:outline-none focus:ring-2 transition-all",
            error
              ? "border-brand-red focus:ring-brand-red/50 text-brand-red"
              : "border-gray-200 focus:border-brand-primary focus:ring-brand-primary/20",
            className
          )}
          {...props}
        />
      </motion.div>
      {error && (
        <p className="mt-1 text-xs text-brand-red">{error}</p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
