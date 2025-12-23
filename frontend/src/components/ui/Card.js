"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

export default function Card({ children, className, hover = false, glass = false }) {
    return (
        <motion.div
            whileHover={hover ? { y: -5 } : {}}
            className={clsx(
                "rounded-2xl p-6 border transition-all",
                glass ? "bg-white/70 backdrop-blur-lg border-white/50 shadow-xl" : "bg-white border-gray-100 shadow-sm hover:shadow-md",
                className
            )}
        >
            {children}
        </motion.div>
    );
}
