import React, { Fragment, useEffect } from "react";
import KeyDisplay from "./KeyDisplay";
import KeyDivider from "./KeyDivider";
import { send } from "./utils/Nui";

interface PressKeysProps {
    keys: string[];
    keyIdx: number;
    setKeyIdx: (val: number) => void;
    setActive: (val: boolean) => void;
    nonIntrusive: boolean;
}

const PressKeys: React.FC<PressKeysProps> = ({
    keys,
    keyIdx,
    setKeyIdx,
    setActive,
    nonIntrusive,
}) => {
    const handleKeyPress = (event: KeyboardEvent) => {
        const key = event.key.toUpperCase();
        if (nonIntrusive) {
            if (!key.startsWith("ARROW")) return;
        }

        if (key === "ALT") return; // Focus key, ignore it
        if (key === "ESCAPE") return; // Cancel key, ignore it

        const newIdx =
            keys[keyIdx] === key ? keyIdx + 1 : Math.max(keyIdx - 1, 0);

        setKeyIdx(newIdx);
        if (newIdx >= keys.length) {
            send("Complete", { state: "success" });
            setActive(false);
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);

        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [keyIdx, keys]);

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
                flexDirection: "row",
                gap: "1rem",
                boxSizing: "border-box",
            }}
        >
            {keys.map((key, idx) => (
                <Fragment key={key + "-" + idx}>
                    <KeyDisplay
                        _key={key}
                        isCurrent={idx === keyIdx}
                        hasPassed={idx < keyIdx}
                    />

                    {idx !== keys.length - 1 && (
                        <KeyDivider
                            half={keyIdx === idx + 1}
                            full={keyIdx > idx + 1}
                        />
                    )}
                </Fragment>
            ))}
        </div>
    );
};

export default PressKeys;
