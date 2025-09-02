import React from "react";
import { cn } from "@/lib/utils";

interface Props {
    message?: string;
    className?: string;
}

const InputError: React.FC<Props> = ({ message, className }) => {
    if (!message) return null;

    return (
        <div className={className}>
            <p className={cn("text-sm text-red-600", className && "m-0")}>{message}</p>
        </div>
    );
};

export default InputError;
