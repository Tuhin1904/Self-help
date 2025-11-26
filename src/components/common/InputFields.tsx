import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

type Props = {
    label: string;
    icon?: React.ReactNode;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    bgColor?: string;
    error?: string;
};

const InputField = ({
    label,
    icon,
    value = "",
    onChange,
    type = "text",
    bgColor = "white",
    error
}: Props) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const floating = isFocused || value.length > 0;
    const isPassword = type === "password";
    const hasError = !!error;

    return (
        <div>
            <div className={`w-full border  ${hasError ? "border-red-500" : "border-gray-300 mb-4"} rounded-xl bg-${bgColor} px-4 py-3 flex items-center gap-4 relative `}>

                {/* Left Icon + Divider */}
                <div className="flex items-center border-gray-300">
                    {icon}
                    <div className="h-6 w-px bg-gray-300 mx-3 mr-1" />
                </div>

                {/* Floating Label + Input */}
                <div className="relative w-full">
                    {/* Floating Label */}
                    <label
                        className={`
            absolute left-0 transition-all pointer-events-none
            ${floating ? "text-xs -top-1 text-gray-600 font-medium" : "text-base top-1/2 -translate-y-1/2 text-gray-400"}
          `}
                    >
                        {label}
                    </label>

                    {/* Input */}
                    <input
                        type={isPassword ? (showPassword ? "text" : "password") : type}
                        value={value}
                        onChange={onChange}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        className="w-full pt-4 pb-1 outline-none bg-transparent text-sm"
                    />
                    {/* Password Toggle Button */}
                    {isPassword && (
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                        >
                            {showPassword ? (
                                <Eye />
                            ) : (
                                <EyeOff />
                            )}
                        </button>
                    )}
                </div>
            </div>

            {/* Error Text */}
            {hasError && (
                <p
                    id={`${label}-error`}
                    className="text-xs text-red-500 mt-1 ml-1"
                >
                    {error}
                </p>
            )}
        </div>
    )
}

export default InputField