import React from "react";

interface KeyDividerProps {
    half: boolean;
    full: boolean;
}

const KeyDivider: React.FC<KeyDividerProps> = ({ half, full }) => {
    return (
        <div
            style={{
                width: "5rem",
                height: "5px",
                background: "rgba(var(--dark4), 1.0)",
                borderRadius: "var(--lborderRadius)",
                position: "relative",
            }}
        >
            <div
                style={{
                    width: full ? "100%" : half ? "50%" : "0%",
                    height: "100%",
                    background: "rgba(var(--blue2), 1.0)",
                    borderRadius: "inherit",
                    transition: "width 0.2s ease-in-out",
                    transitionDelay: half ? "0.2s" : "0s",
                }}
            />
        </div>
    );
};

export default KeyDivider;
