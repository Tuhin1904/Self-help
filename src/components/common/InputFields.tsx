import React, { useState } from 'react';

type Props = {
    label: string;
    icon?: React.ReactNode;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    bgColor?: string
};

const InputField = ({
    label,
    icon,
    value = "",
    onChange,
    type = "text",
    bgColor = "white"
}: Props) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const floating = isFocused || value.length > 0;
    const isPassword = type === "password";

    return (
        <div className={`w-full border border-gray-300 rounded-xl bg-${bgColor} px-4 py-3 flex items-center gap-4 relative mb-4`}>

            {/* Left Icon + Divider */}
            <div className="flex items-center border-r border-gray-300">
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
                            <img src="/Footer/eye-crossed.png" alt="eye" className='w-5' />
                        ) : (
                            <img src="/Footer/eye-crossed.png" alt="eye" className='w-5' />
                        )}
                    </button>
                )}
            </div>
        </div>
    )
}

export default InputField