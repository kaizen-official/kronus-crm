"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

export default function Heading({
    children,
    level = 1,
    className,
    animate = true
}) {
    const Tag = `h${Math.min(Math.max(level, 1), 6)}`;

    const sizes = {
        1: "text-4xl md:text-5xl lg:text-6xl",
        2: "text-3xl md:text-4xl",
        3: "text-2xl md:text-3xl",
        4: "text-xl md:text-2xl",
        5: "text-lg md:text-xl",
        6: "text-base md:text-lg"
    };

    const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    if (!animate) {
        return (
            <Tag className={clsx("font-bold text-gray-900 leading-tight", sizes[level], className)}>
                {children}
            </Tag>
        )
    }

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={variants}
        >
            <Tag className={clsx("font-bold text-gray-900 leading-tight", sizes[level], className)}>
                {children}
            </Tag>
        </motion.div>
    );
}
