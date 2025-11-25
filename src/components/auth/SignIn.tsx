'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type AuthVariant = "signin" | "signup";

type FormValues = {
    fullName?: string;
    email: string;
    password: string;
    confirmPassword?: string;
    rememberMe?: boolean;
};

const SignIn = () => {
    const [variant, setVariant] = useState<AuthVariant>("signin");
    const isSignIn = variant === "signin";

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset,
    } = useForm<FormValues>({
        mode: "onBlur",
    });

    // Reset form when switching between sign in/sign up
    useEffect(() => {
        reset();
    }, [variant, reset]);

    const onSubmit = async (data: FormValues) => {
        try {
            const endpoint =
                variant == "signin"
                    ? "https://my-app-cjm8.onrender.com/api/auth/login"
                    : "https://my-app-cjm8.onrender.com/api/users/register";

            const response = await axios.post(endpoint, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            console.log("API Response:", response.data);

            // Example: If your API returns tokens
            // localStorage.setItem("access_token", response.data.accessToken);

            alert(`${variant === "signin" ? "Logged in" : "Registered"} successfully!`);
        } catch (error: any) {
            console.error("API Error:", error);

            // Axios error message
            const msg =
                error?.response?.data?.message || "Something went wrong, try again.";

            alert(msg);
        }
    };

    const passwordValue = watch("password");

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-5xl w-full bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
                {/* LEFT – FORM */}
                <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col">
                    {/* Logo placeholder */}
                    <div className="mb-8 flex items-center gap-2">
                        {/* TODO: Replace with actual logo image/icon */}
                        <div className="h-10 w-10 rounded-full bg-orange-500" />
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

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                        noValidate
                    >
                        {/* FULL NAME (Sign Up only) */}
                        {!isSignIn && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name
                                </label>
                                <div className="relative">
                                    {/* TODO: replace with user icon */}
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 bg-gray-300 rounded-sm" />
                                    <input
                                        type="text"
                                        className={`w-full border rounded-lg py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 ${errors.fullName
                                            ? "border-red-500 focus:ring-red-500"
                                            : "focus:ring-orange-500"
                                            }`}
                                        placeholder="John Doe"
                                        {...register("fullName", {
                                            required: !isSignIn && "Full name is required",
                                            minLength: {
                                                value: 2,
                                                message: "Name must be at least 2 characters",
                                            },
                                        })}
                                    />
                                </div>
                                {errors.fullName && (
                                    <p className="mt-1 text-xs text-red-600">
                                        {errors.fullName.message}
                                    </p>
                                )}
                            </div>
                        )}

                        {/* EMAIL */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <div className="relative">
                                {/* TODO: replace with mail icon */}
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 bg-gray-300 rounded-sm" />
                                <input
                                    type="email"
                                    className={`w-full border rounded-lg py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 ${errors.email
                                        ? "border-red-500 focus:ring-red-500"
                                        : "focus:ring-orange-500"
                                        }`}
                                    placeholder="you@example.com"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Enter a valid email address",
                                        },
                                    })}
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-1 text-xs text-red-600">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* PASSWORD */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                {/* TODO: replace with lock icon */}
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 bg-gray-300 rounded-sm" />
                                <input
                                    type="password"
                                    className={`w-full border rounded-lg py-2 pl-9 pr-10 text-sm focus:outline-none focus:ring-2 ${errors.password
                                        ? "border-red-500 focus:ring-red-500"
                                        : "focus:ring-orange-500"
                                        }`}
                                    placeholder="••••••••"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Password must be at least 6 characters",
                                        },
                                    })}
                                />
                                {/* TODO: right side eye icon for show/hide */}
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 bg-gray-300 rounded-sm" />
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-xs text-red-600">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* CONFIRM PASSWORD – Sign Up only */}
                        {!isSignIn && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    className={`w-full border rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 ${errors.confirmPassword
                                        ? "border-red-500 focus:ring-red-500"
                                        : "focus:ring-orange-500"
                                        }`}
                                    placeholder="••••••••"
                                    {...register("confirmPassword", {
                                        required: "Please confirm your password",
                                        validate: (value) =>
                                            value === passwordValue || "Passwords do not match",
                                    })}
                                />
                                {errors.confirmPassword && (
                                    <p className="mt-1 text-xs text-red-600">
                                        {errors.confirmPassword.message}
                                    </p>
                                )}
                            </div>
                        )}

                        {/* REMEMBER ME + FORGOT – Sign In only */}
                        {isSignIn && (
                            <div className="flex items-center justify-between text-sm">
                                <label className="inline-flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        className="rounded"
                                        {...register("rememberMe")}
                                    />
                                    <span className="text-gray-600">Remember me</span>
                                </label>
                                <button
                                    type="button"
                                    className="text-orange-600 hover:underline"
                                >
                                    Forgot password?
                                </button>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full mt-2 py-2 rounded-lg bg-orange-600 text-white font-semibold text-sm hover:bg-orange-700 transition"
                        >
                            {isSignIn ? "Sign In" : "Sign Up"}
                        </button>
                    </form>

                    <p className="mt-6 text-sm text-gray-600 text-center">
                        {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
                        <button
                            type="button"
                            onClick={() => setVariant(isSignIn ? "signup" : "signin")}
                            className="text-orange-600 font-medium hover:underline"
                        >
                            {isSignIn ? "Sign up" : "Sign in"}
                        </button>
                    </p>
                </div>

                {/* RIGHT – IMAGE PLACEHOLDER */}
                <div className="w-full md:w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-orange-400 text-white relative hidden md:block">
                    {/* TODO: Replace this whole area with your illustration/image */}
                    <div className="h-full w-full flex items-center justify-center p-6">
                        <div className="h-full w-full rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                            <span className="text-sm font-medium text-white/80 text-center px-6">
                                IMAGE PLACEHOLDER
                                <br />
                                (put rocket / product / whatever here)
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn