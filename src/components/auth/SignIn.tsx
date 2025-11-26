'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../common/InputFields";
import User from "../svg/User";
import Email from "../svg/Email";
import Password from "../svg/Password";
import Image from "next/image";
import { useToast } from "../GlobalToast/ToastProvider";
import { HandHelping } from 'lucide-react';
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, signUpSchema } from "@/schema/authSchemas";
import { apiRequest } from "@/utils/api";

type AuthVariant = "signin" | "signup";

type SignInFormValues = {
    email: string;
    password: string;
    rememberMe?: boolean;
};

type SignUpFormValues = {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const SignIn = () => {
    const [variant, setVariant] = useState<AuthVariant>("signin");
    const [loading, setLoading] = useState(false);
    const isSignIn = variant === "signin";
    const toast = useToast();

    const {
        register: registerSignIn,
        handleSubmit: handleSubmitSignIn,
        formState: { errors: errorsSignIn },
        watch: watchSignIn,
        setValue: setValueSignIn,
    } = useForm<SignInFormValues>({
        resolver: zodResolver(signInSchema),
        mode: "onSubmit",
        reValidateMode: "onChange",
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        }
    });

    const {
        // register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<SignUpFormValues>({
        resolver: zodResolver(signUpSchema),
        mode: "onSubmit",
        reValidateMode: "onChange",
        defaultValues: {
            email: "",
            password: "",
            fullName: "",
            confirmPassword: ""
        }
    });

    // console.log("errors is :", errors)
    // console.log("errorsSignIn is :", errorsSignIn)

    const onSubmit = async (data: SignUpFormValues) => {
        setLoading(true);
        const { confirmPassword, ...payload } = data
        try {
            const response = await apiRequest({ endpoint: "/users/register", method: 'POST', payload });

            console.log("API Response:", response.data);
            toast.showToast("Regitration successful!", "success");

        } catch (error: any) {
            console.error("API Error:", error);
            toast.showToast("Regitration failed!", "error");
        } finally {
            setLoading(false)
        }
    };

    const onSubmitSignIn = async (data: SignInFormValues) => {
        setLoading(true)
        try {
            const endpoint = "https://my-app-cjm8.onrender.com/api/auth/login";

            const response = await axios.post(endpoint, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            console.log("API Response:", response.data);

        } catch (error: any) {
            console.error("API Error:", error);
        } finally {
            setLoading(false)
        }
    };

    const passwordValue = watch("password");

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className={`w-full bg-gray-100 overflow-hidden flex flex-col md:flex-row h-screen`}>
                {/* LEFT – FORM */}
                <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col my-auto">
                    {/* Logo placeholder */}
                    <div className="mb-8 flex items-center gap-2">
                        {/* TODO: Replace with actual logo image/icon */}
                        <div className="bg-gray-50 p-2 rounded-full border border-gray-300"><HandHelping /></div>
                        <span className="text-2xl font-bold text-gray-800">Self Help</span>
                    </div>

                    <h1 className="text-3xl font-semibold text-gray-800 mb-2">
                        {isSignIn ? "Welcome Back" : "Create an Account"}
                    </h1>
                    <p className="text-sm text-gray-500 mb-8">
                        {isSignIn
                            ? "Sign in to continue to your dashboard."
                            : "Sign up to start using the platform."}
                    </p>

                    {isSignIn ?
                        <form onSubmit={handleSubmitSignIn(onSubmitSignIn)} className="space-y-4">
                            {/* EMAIL */}
                            <InputField
                                label="Email"
                                type="text"
                                icon={<Email />}
                                value={watchSignIn("email") || ""}
                                onChange={(e) => setValueSignIn("email", e.target.value, {
                                    shouldValidate: true,
                                    // shouldDirty: true,
                                })}
                                error={errorsSignIn.email?.message}
                            />

                            {/* PASSWORD */}
                            <InputField
                                label="Password"
                                type="password"
                                icon={<Password />}
                                value={watchSignIn("password") || ""}
                                onChange={(e) => setValueSignIn("password", e.target.value)}
                                error={errorsSignIn.password?.message}
                            />

                            {/* REMEMBER ME */}
                            <div className="flex items-center justify-between text-sm">
                                <label className="inline-flex items-center gap-2">
                                    <input type="checkbox" {...registerSignIn("rememberMe")} />
                                    <span className="text-gray-600">Remember me</span>
                                </label>

                                <button type="button" className="text-orange-600 hover:underline">
                                    Forgot password?
                                </button>
                            </div>

                            <button type="submit" disabled={loading} className={`w-full py-2 ${loading ? "opacity-50" : ""} bg-orange-600 text-white rounded-lg cursor-pointer`}>
                                Sign In
                            </button>
                        </form>
                        :
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            {/* FULL NAME */}
                            <InputField
                                label="User Name"
                                type="text"
                                icon={<User />}
                                value={watch("fullName") || ""}
                                onChange={(e) => setValue("fullName", e.target.value)}
                                error={errors?.fullName?.message}
                            />

                            {/* EMAIL */}
                            <InputField
                                label="Email"
                                type="text"
                                icon={<Email />}
                                value={watch("email") || ""}
                                onChange={(e) => setValue("email", e.target.value)}
                                error={errors?.email?.message}
                            />

                            {/* PASSWORD */}
                            <InputField
                                label="Password"
                                type="password"
                                icon={<Password />}
                                value={watch("password") || ""}
                                onChange={(e) => setValue("password", e.target.value)}
                                error={errors?.password?.message}
                            />

                            {/* CONFIRM PASSWORD */}
                            <InputField
                                label="Confirm Password"
                                type="password"
                                icon={<Password />}
                                value={watch("confirmPassword") || ""}
                                onChange={(e) => setValue("confirmPassword", e.target.value)}
                                error={errors?.confirmPassword?.message}
                            />

                            <button type="submit" disabled={loading} className={`w-full py-2 ${loading ? "opacity-50" : ""} bg-orange-600 text-white rounded-lg cursor-pointer`}>
                                Sign Up
                            </button>
                        </form>
                    }

                    <p className="mt-6 text-sm text-gray-600 text-center">
                        {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
                        <button
                            type="button"
                            onClick={() => setVariant(isSignIn ? "signup" : "signin")}
                            className="text-orange-600 font-medium hover:underline cursor-pointer"
                        >
                            {isSignIn ? "Sign up" : "Sign in"}
                        </button>
                    </p>
                </div>

                {/* RIGHT – IMAGE PLACEHOLDER */}
                <div className="w-full md:w-1/2 text-white hidden h-full md:block relative">
                    <Image src="/auth/sign-in-up.jpg" alt="sign-in-up" fill
                        className="object-cover" />
                </div>
            </div>
        </div>
    )
}

export default SignIn