"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import { HiUser, HiShieldCheck, HiBell, HiKey } from "react-icons/hi";

import Heading from "@/src/components/ui/Heading";
import Card from "@/src/components/ui/Card";
import Input from "@/src/components/ui/Input";
import Button from "@/src/components/ui/Button";
import api from "@/src/services/api";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("profile");

    const tabs = [
        { id: "profile", label: "Profile", icon: <HiUser /> },
        { id: "security", label: "Security", icon: <HiShieldCheck /> },
        // { id: "notifications", label: "Notifications", icon: <HiBell /> }, // Future
    ];

    return (
        <div className="max-w-5xl mx-auto">
            <div className="mb-8">
                <Heading level={2}>Account Settings</Heading>
                <p className="text-gray-500 mt-1">Manage your personal information and security preferences.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Tabs */}
                <div className="w-full md:w-64 shrink-0">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2 space-y-1">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id
                                        ? "bg-brand-primary/10 text-brand-primary"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                    }`}
                            >
                                <span className="text-lg">{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {activeTab === "profile" && <ProfileForm />}
                        {activeTab === "security" && <SecurityForm />}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

function ProfileForm() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });
    const { register, handleSubmit, setValue } = useForm();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get("/users/profile");
                const data = response.data.data;
                setUser(data);
                setValue("firstName", data.firstName);
                setValue("lastName", data.lastName);
                setValue("email", data.email);
                setValue("phone", data.phone);
                setValue("department", data.department);
                setValue("designation", data.designation);
            } catch (error) {
                console.error("Failed to load profile", error);
            }
        };
        fetchProfile();
    }, [setValue]);

    const onSubmit = async (data) => {
        setLoading(true);
        setMessage({ type: "", text: "" });
        try {
            await api.put("/users/profile", data);
            setMessage({ type: "success", text: "Profile updated successfully!" });

            // Update cookie
            const currentUser = JSON.parse(Cookies.get("user") || "{}");
            Cookies.set("user", JSON.stringify({ ...currentUser, ...data }));

            // Re-fetch to sync state and exit edit mode
            const response = await api.get("/users/profile");
            setUser(response.data.data);
            setIsEditing(false);

        } catch (error) {
            setMessage({ type: "error", text: error.response?.data?.message || "Failed to update profile." });
        } finally {
            setLoading(false);
        }
    };

    if (!user) return <div className="p-8 text-center text-gray-500">Loading profile...</div>;

    return (
        <Card className="p-6 md:p-8">
            <div className="flex justify-between items-start mb-6 pb-6 border-b border-gray-100">
                <div>
                    <h3 className="text-lg font-bold text-gray-900">Public Profile</h3>
                    <p className="text-sm text-gray-500">Manage your personal information.</p>
                </div>
                {!isEditing && (
                    <Button onClick={() => setIsEditing(true)} size="sm" variant="outline">
                        Edit Profile
                    </Button>
                )}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ProfileField
                        label="First Name"
                        name="firstName"
                        register={register}
                        isEditing={isEditing}
                        value={user.firstName}
                    />
                    <ProfileField
                        label="Last Name"
                        name="lastName"
                        register={register}
                        isEditing={isEditing}
                        value={user.lastName}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ProfileField
                        label="Email Address"
                        name="email"
                        register={register}
                        isEditing={false} // Always read-only
                        value={user.email}
                        note={isEditing ? "Contact admin to change email." : ""}
                        disabled
                    />
                    <ProfileField
                        label="Phone Number"
                        name="phone"
                        register={register}
                        isEditing={isEditing}
                        value={user.phone}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ProfileField
                        label="Department"
                        name="department"
                        register={register}
                        isEditing={isEditing}
                        value={user.department}
                        placeholder="e.g. Sales"
                    />
                    <ProfileField
                        label="Designation"
                        name="designation"
                        register={register}
                        isEditing={isEditing}
                        value={user.designation}
                        placeholder="e.g. Senior Manager"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Role</label>
                        <span className="inline-block px-2 py-1 bg-brand-primary/10 text-brand-primary rounded text-xs font-bold ring-1 ring-brand-primary/20">
                            {user.role}
                        </span>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Joined On</label>
                        <div className="font-medium text-gray-900">
                            {new Date(user.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                    </div>
                </div>

                {message.text && (
                    <div className={`p-4 rounded-lg text-sm ${message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                        {message.text}
                    </div>
                )}

                {isEditing && (
                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                        <Button type="button" variant="ghost" onClick={() => setIsEditing(false)} disabled={loading}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>
                )}
            </form>
        </Card>
    );
}

function ProfileField({ label, name, register, isEditing, value, disabled, note, placeholder }) {
    if (!isEditing) {
        return (
            <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">{label}</label>
                <div className="text-gray-900 font-medium py-2 border-b border-gray-100 min-h-[40px]">
                    {value || <span className="text-gray-400 italic">Not set</span>}
                </div>
            </div>
        );
    }

    return (
        <Input
            label={label}
            {...register(name)}
            disabled={disabled}
            className={disabled ? "bg-gray-50 cursor-not-allowed" : ""}
            note={note}
            placeholder={placeholder}
        />
    );
}

function SecurityForm() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        if (data.newPassword !== data.confirmPassword) {
            setMessage({ type: "error", text: "New passwords do not match." });
            return;
        }

        setLoading(true);
        setMessage({ type: "", text: "" });
        try {
            await api.put("/auth/change-password", {
                currentPassword: data.currentPassword,
                newPassword: data.newPassword
            });
            setMessage({ type: "success", text: "Password changed successfully!" });
            reset();
        } catch (error) {
            setMessage({ type: "error", text: error.response?.data?.message || "Failed to change password." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="p-6 md:p-8">
            <div className="mb-6 pb-6 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">Password & Security</h3>
                <p className="text-sm text-gray-500">Ensure your account is using a long, random password to stay secure.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-lg">
                <Input
                    label="Current Password"
                    type="password"
                    {...register("currentPassword", { required: true })}
                />

                <div className="space-y-4 pt-2">
                    <Input
                        label="New Password"
                        type="password"
                        {...register("newPassword", { required: true, minLength: 6 })}
                        note="Minimum 6 characters"
                    />
                    <Input
                        label="Confirm New Password"
                        type="password"
                        {...register("confirmPassword", { required: true })}
                    />
                </div>

                {message.text && (
                    <div className={`p-4 rounded-lg text-sm ${message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                        {message.text}
                    </div>
                )}

                <div className="pt-4">
                    <Button type="submit" variant="outline" disabled={loading} className="w-full sm:w-auto">
                        {loading ? "Updating..." : "Update Password"}
                    </Button>
                </div>
            </form>
        </Card>
    )
}
