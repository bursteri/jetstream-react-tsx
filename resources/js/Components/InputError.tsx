import React from "react";

interface Props {
    message?: string;
}

const InputError: React.FC<Props> = ({ message }) => {
    if (!message) return null;

    return (
        <div>
            <p className="text-sm text-red-600">{message}</p>
        </div>
    );
};

export default InputError;
