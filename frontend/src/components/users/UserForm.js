"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect } from "react";
import Input from "@/src/components/ui/Input";
import Select from "@/src/components/ui/Select";
import Button from "@/src/components/ui/Button";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name too long"),
  email: z.string()
    .email("Invalid email address")
    .refine((val) => val.endsWith("@kronusinfra.org"), {
      message: "Only @kronusinfra.org emails are allowed"
    }),
  phone: z.string().regex(/^\+?[\d\s\-()]+$/, "Invalid phone number"),
  roles: z.array(z.enum(["ADMIN", "EXECUTIVE", "DIRECTOR", "MANAGER", "SALESMAN"])).min(1, "Select at least one role"),
  department: z.string().min(1, "Department is required"),
  designation: z.string().min(1, "Designation is required"),
});

export default function UserForm({ initialData, onSubmit, loading }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      roles: ["SALESMAN"],
    },
  });

  const selectedRoles = watch("roles") || [];

  useEffect(() => {
    if (initialData) {
      Object.keys(initialData).forEach((key) => {
        setValue(key, initialData[key]);
      });
    }
  }, [initialData, setValue]);

  const toggleRole = (role) => {
    const currentRoles = [...selectedRoles];
    const index = currentRoles.indexOf(role);
    if (index > -1) {
      currentRoles.splice(index, 1);
    } else {
      currentRoles.push(role);
    }
    setValue("roles", currentRoles, { shouldValidate: true });
  };

  const ROLE_OPTIONS = [
    { label: "Admin", value: "ADMIN" },
    { label: "Executive", value: "EXECUTIVE" },
    { label: "Director", value: "DIRECTOR" },
    { label: "Manager", value: "MANAGER" },
    { label: "Salesman", value: "SALESMAN" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Full Name"
          placeholder="John Doe"
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          label="Email Address"
          type="email"
          placeholder="john@kronusinfra.org"
          error={errors.email?.message}
          {...register("email")}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Phone Number"
          placeholder="+91..."
          error={errors.phone?.message}
          {...register("phone")}
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Department"
            placeholder="Sales"
            error={errors.department?.message}
            {...register("department")}
          />
          <Input
            label="Designation"
            placeholder="Account Manager"
            error={errors.designation?.message}
            {...register("designation")}
          />
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">User Roles (Select multiple)</label>
        <div className="flex flex-wrap gap-3">
          {ROLE_OPTIONS.map((role) => (
            <button
              key={role.value}
              type="button"
              onClick={() => toggleRole(role.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                selectedRoles.includes(role.value)
                  ? "bg-brand-primary border-brand-primary text-white shadow-md"
                  : "bg-white border-gray-200 text-gray-600 hover:border-brand-primary/50"
              }`}
            >
              {role.label}
            </button>
          ))}
        </div>
        {errors.roles && <p className="text-xs text-red-500">{errors.roles.message}</p>}
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
        <Button type="submit" disabled={loading} className="px-8">
          {loading ? "Saving..." : initialData ? "Update User" : "Create User"}
        </Button>
      </div>
    </form>
  );
}
