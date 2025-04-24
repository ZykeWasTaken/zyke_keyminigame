import React, { useEffect } from "react";

interface ToggleFocusProps {
    focused: boolean;
    setFocused: (val: boolean) => void;
}

const ToggleFocus: React.FC<ToggleFocusProps> = ({ focused, setFocused }) => {
    const handleKeyPress = (event: KeyboardEvent) => {
        if (event.key.toUpperCase() === "ALT") setFocused(!focused);
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);

        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [focused]);

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
            }}
        >
            <p
                style={{
                    fontSize: "1.5rem",
                    color: "rgba(var(--secText))",
                    fontWeight: "500",
                }}
            >
                Press ALT to toggle focus
            </p>
        </div>
    );
};

export default ToggleFocus;
