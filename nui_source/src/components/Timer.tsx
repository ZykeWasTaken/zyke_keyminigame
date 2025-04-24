import React, { useEffect, useState } from "react";
import { send } from "./utils/Nui";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

interface TimerProps {
    timeLimit: number | undefined;
    setActive: (val: boolean) => void;
}

const Timer: React.FC<TimerProps> = ({ timeLimit, setActive }) => {
    const [started, setStarted] = useState<number | undefined>(undefined);
    const [percentage, setPercentage] = useState<number>(100);

    useEffect(() => {
        setStarted(new Date().getTime());
        setPercentage(100);
    }, [timeLimit]);

    useEffect(() => {
        if (!started) return;
        if (!timeLimit) return;

        const interval = setInterval(() => {
            if (started === undefined) return;

            const now = new Date().getTime();
            const elapsed = now - started;
            const newPercentage = Math.max(
                0,
                Math.min(
                    100,
                    ((timeLimit * 1000 - elapsed) / (timeLimit * 1000)) * 100
                )
            );

            setPercentage(newPercentage);

            if (newPercentage <= 0) {
                send("Complete", { state: "fail" });
                setActive(false);
            }
        }, 500);

        return () => {
            clearInterval(interval);
            setStarted(undefined);
            setPercentage(100);
        };
    }, [started]);

    return (
        <div
            style={{
                width: "4.5rem",
                height: "4.5rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
            }}
        >
            <CircularProgressbar
                value={percentage}
                styles={buildStyles({
                    pathColor: "rgba(var(--orange2), 1.0)",
                    trailColor: "rgba(var(--orange2), 0.25)",
                    strokeLinecap: "round",
                    pathTransitionDuration: 0.5,
                })}
            />
            <HourglassEmptyIcon
                sx={{
                    height: "2rem",
                    width: "2rem",
                    fontSize: "10rem",
                    color: "rgba(var(--orange2), 1.0)",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}
            />
        </div>
    );
};

export default Timer;
