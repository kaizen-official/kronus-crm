"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { motion } from "framer-motion";

import BgLayout from "@/src/components/layout/BgLayout";
import Card from "@/src/components/ui/Card";
import Input from "@/src/components/ui/Input";
import Button from "@/src/components/ui/Button";
import Heading from "@/src/components/ui/Heading";
import api from "@/src/services/api";

const schema = z.object({
    name: z.string().min(2, "Full name is required").max(100),
    email: z.string().email("Invalid email address").refine(val => val.endsWith("@kronusinfra.org"), {
        message: "Only @kronusinfra.org emails are allowed"
    }),
    phone: z.string().regex(/^\+?[\d\s\-()]+$/, "Invalid phone number"),
    password: z.string().min(8, "Password must be at least 8 characters long")
        .regex(/[A-Z]/, "One uppercase letter required")
        .regex(/[a-z]/, "One lowercase letter required")
        .regex(/[0-9]/, "One number required")
        .regex(/[^A-Za-z0-9]/, "One special character required"),
});

export default function Register() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data) => {
        setLoading(true);
        setError("");
        try {
            const response = await api.post("/auth/register", data);
            if (response.data.success) {
                // Set token
                Cookies.set("token", response.data.data.token, { expires: 7 });
                Cookies.set("user", JSON.stringify(response.data.data.user), { expires: 7 });

                // Redirect
                router.push("/dashboard");
            }
        } catch (err) {
            setError(
                err.response?.data?.message || "Registration failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <BgLayout showFooter={false}>
            <div className="flex items-center justify-center min-h-[calc(100vh-140px)] px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-lg"
                >
                    <Card glass className="bg-white/80">
                        <div className="text-center mb-8">
                            <Heading level={2} className="text-brand-primary mb-2">Create Account</Heading>
                            <p className="text-gray-600">Start your journey with Kronus today</p>
                        </div>

                        {error && (
                            <div className="bg-brand-red/10 text-brand-red p-3 rounded-lg text-sm mb-6 text-center">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <Input
                                label="Full Name"
                                placeholder="John Doe"
                                error={errors.name?.message}
                                {...register("name")}
                            />

                            <Input
                                label="Email Address"
                                type="email"
                                placeholder="you@kronusinfra.org"
                                error={errors.email?.message}
                                {...register("email")}
                                note="Must be @kronusinfra.org"
                            />

                            <Input
                                label="Phone Number"
                                placeholder="+91..."
                                error={errors.phone?.message}
                                {...register("phone")}
                            />

                            <Input
                                label="Password"
                                type="password"
                                placeholder="••••••••"
                                error={errors.password?.message}
                                {...register("password")}
                                note="Min 8 chars, 1 Upper, 1 Lower, 1 Number, 1 Special"
                            />

                            <Button type="submit" fullWidth disabled={loading} className="mt-4">
                                {loading ? "Creating Account..." : "Sign Up"}
                            </Button>
                        </form>

                        <div className="mt-8 text-center text-sm text-gray-600">
                            Already have an account?{" "}
                            <Link href="/login" className="text-brand-primary font-bold hover:underline">
                                Sign In
                            </Link>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </BgLayout>
    );
}
