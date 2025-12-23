"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import Button from "@/src/components/ui/Button";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto py-3 px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="hover:scale-110 transition-transform">
          <img src="/logo.png" alt="Kronius Logo" className="object-contain w-40" />
        </Link>
        
        {/* Simple Auth Nav */}
        <div className="flex items-center gap-4">
            <span className="hidden md:block text-xs text-gray-400 uppercase tracking-widest font-semibold mr-2">Employee Portal</span>
            <Link href="/login">
                <Button size="sm" className="bg-gray-900 text-white hover:bg-gray-800 shadow-none rounded-none px-6">Login</Button>
            </Link>
        </div>
      </div>
    </header>
  );
}
