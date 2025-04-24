import React, { useEffect } from "react";
import { send } from "./utils/Nui";

interface CancelMinigameProps {
    setActive: (val: boolean) => void;
}

const CancelMinigame: React.FC<CancelMinigameProps> = ({ setActive }) => {
    const handleKeyPress = (event: KeyboardEvent) => {
        if (event.key.toUpperCase() === "ESCAPE") {
            setActive(false);
            send("Complete", { state: "cancel" });
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);

        return () => window.removeEventListener("keydown", handleKeyPress);
    }, []);

    return null;
};

export default CancelMinigame;
