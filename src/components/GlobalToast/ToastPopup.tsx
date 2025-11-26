// components/Toast.tsx
import { useEffect, useState } from "react";
import { X, AlertCircle, AlertTriangle } from "lucide-react";

interface ToastProps {
    message: string;
    type?: "success" | "error" | "warning";
    onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type = "error", onClose }) => {
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        const duration = 3000;

        const interval = setInterval(() => {
            setProgress((prev) => (prev > 0 ? prev - 2 : 0));
        }, duration / 50);

        const timeout = setTimeout(() => {
            onClose();
        }, duration);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [onClose]);

    const iconProps = {
        success: { icon: AlertCircle, color: "text-green-500" },
        error: { icon: AlertCircle, color: "text-red-500" },
        warning: { icon: AlertTriangle, color: "text-yellow-500" },
    }[type];

    const Icon = iconProps.icon;

    return (
        <div className="fixed top-5 right-5 z-99 w-68 bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="flex items-center justify-between px-4 py-4">
                <div className="flex items-center space-x-2">
                    <Icon className={`${iconProps.color} w-5 h-5`} />
                    <span className="text-sm text-gray-800">{message}</span>
                </div>
                <button onClick={onClose}>
                    <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                </button>
            </div>
            <div className="h-1 w-full bg-gray-100">
                <div className={`h-full ${type === "error"
                    ? "bg-red-500"
                    : type === "success"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }`}
                    style={{
                        width: `${progress}%`,
                        transition: "width 60ms linear",
                    }}
                />
            </div>
        </div>
    );
};

export default Toast;
