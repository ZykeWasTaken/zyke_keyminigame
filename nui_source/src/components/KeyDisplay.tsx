import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import { AnimatePresence, motion } from "framer-motion";
import TranslateArrowKey from "./TranslateArrowKey";

interface KeyDisplayProps {
    _key: string;
    isCurrent: boolean;
    hasPassed: boolean;
}

const KeyDisplay: React.FC<KeyDisplayProps> = ({
    _key,
    isCurrent,
    hasPassed,
}) => {
    return (
        <div
            style={{
                width: "4rem",
                height: "4rem",
                borderRadius: "50%",
                border:
                    isCurrent || hasPassed
                        ? "3px solid rgba(var(--blue2), 1.0)"
                        : "3px solid rgba(var(--grey4), 1.0)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: isCurrent
                    ? "rgba(var(--blue2), 0.25)"
                    : hasPassed
                    ? "rgba(var(--blue2), 1.0)"
                    : "rgba(var(--dark4), 1.0)",
                transition: "background 0.2s ease-in-out",
            }}
        >
            <AnimatePresence>
                {hasPassed && (
                    <motion.div
                        style={{
                            position: "absolute",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{
                            duration: 0.2,
                        }}
                    >
                        <CheckIcon
                            style={{
                                color: "rgba(var(--icon))",
                                position: "absolute",
                                fontSize: "2.5rem",
                                stroke: "rgba(var(--icon))",
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {!hasPassed && isCurrent && (
                    <motion.div
                        style={{
                            position: "absolute",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{
                            duration: 0.2,
                        }}
                    >
                        {_key.startsWith("ARROW") ? (
                            <TranslateArrowKey
                                _key={
                                    _key as
                                        | "ARROWUP"
                                        | "ARROWDOWN"
                                        | "ARROWLEFT"
                                        | "ARROWRIGHT"
                                }
                                props={{
                                    style: {
                                        fontSize: "2rem",
                                        color: "rgba(var(--blue2))",
                                        fontWeight: "500",
                                        textAlign: "center",
                                    },
                                }}
                            />
                        ) : (
                            <p
                                style={{
                                    fontSize: "2rem",
                                    color: "rgba(var(--blue2))",
                                    fontWeight: "500",
                                    textAlign: "center",
                                }}
                            >
                                {_key}
                            </p>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {!hasPassed && !isCurrent && (
                    <motion.div
                        style={{
                            position: "absolute",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{
                            duration: 0.2,
                        }}
                    >
                        <p
                            style={{
                                fontSize: "2rem",
                                color: "rgba(var(--secText))",
                                fontWeight: "500",
                                textAlign: "center",
                            }}
                        >
                            ?
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default KeyDisplay;
