"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import clsx from "clsx";

export default function Button({
  children,
  variant = "primary", // primary, secondary, outline, ghost
  size = "md", // sm, md, lg
  fullWidth = false,
  className,
  onClick,
  type = "button",
  disabled = false,
  ...props
}) {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-brand-primary hover:bg-brand-primary/90 text-white focus:ring-brand-primary/50 shadow-lg shadow-brand-primary/30",
    secondary: "bg-brand-secondary hover:bg-brand-secondary/90 text-white focus:ring-brand-secondary/50",
    outline: "border-2 border-brand-primary text-brand-primary hover:bg-brand-primary/5 focus:ring-brand-primary/50",
    ghost: "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
    danger: "bg-brand-red hover:bg-brand-red/90 text-white focus:ring-brand-red/50",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      type={type}
      className={clsx(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className
      )}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
}
