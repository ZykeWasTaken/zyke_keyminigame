import React from "react";
import { AnimatePresence, motion } from "framer-motion";

interface ModalProps {
    children: React.ReactNode;
    active: boolean;
    focused: boolean;
    nonIntrusive?: boolean;
}

const Modal: React.FC<ModalProps> = ({
    children,
    active,
    focused,
    nonIntrusive,
}) => {
    return (
        <>
            <AnimatePresence>
                {active && (
                    <motion.div
                        style={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            background: `rgba(0, 0, 0, ${focused ? 0.5 : 0.0})`,
                            top: 0,
                            left: 0,
                            zIndex: 1000,
                            transition: "background 0.2s ease-in-out",
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {active && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.98,
                        }}
                        animate={{
                            opacity: 1.0,
                            scale: 1.0,
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.98,
                        }}
                        transition={{
                            duration: 0.2,
                            delay: 0.0,
                        }}
                        style={{
                            position: "absolute",
                            height: "100%",
                            top: "50%",
                            left: "50%",
                            translateY: "-50%",
                            translateX: "-50%",
                            zIndex: 1001,
                        }}
                    >
                        <div
                            style={{
                                background: "rgba(var(--dark))",
                                borderRadius: "var(--lborderRadius)",
                                boxSizing: "border-box",
                                boxShadow: "0 0 5px 0 rgba(0, 0, 0, 0.3)",
                                border: "1px solid rgba(var(--grey4), 1.0)",
                                padding: "1rem",
                                opacity: focused || nonIntrusive ? 0.97 : 0.8,

                                position: "absolute",
                                top: focused ? "50%" : "1rem",
                                left: "50%",
                                transform: `translate(-50%, ${
                                    focused ? "-50%" : "0%"
                                })`,
                                zIndex: 1001,

                                transition:
                                    "top 0.2s ease-in-out, transform 0.2s ease-in-out",
                            }}
                        >
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Modal;
