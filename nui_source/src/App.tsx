import { useEffect, useState } from "react";
import { listen, send } from "./components/utils/Nui";
import Modal from "./components/Modal";
import ToggleFocus from "./components/ToggleFocus";
import PressKeys from "./components/PressKeys";
import Timer from "./components/Timer";
import CancelMinigame from "./components/CancelMinigame";
import NonIntrusiveText from "./components/NonIntrusiveText";

type KeyList = string[];

function App() {
    const [active, setActive] = useState<boolean>(false);
    const [focused, setFocused] = useState<boolean>(false);
    const [keys, setKeys] = useState<KeyList>([]);
    const [keyIdx, setKeyIdx] = useState<number>(0);
    const [timeLimit, setTimeLimit] = useState<number | undefined>(undefined);
    const [nonIntrusive, setNonIntrusive] = useState<boolean>(false);

    listen(
        "Start",
        ({
            keys: newKeys,
            forceFocus,
            timeLimit: newTimeLimit,
            nonIntrusive: newNonIntrusive,
        }: {
            keys: KeyList;
            forceFocus?: boolean;
            timeLimit?: number;
            nonIntrusive?: boolean;
        }) => {
            setKeyIdx(0);
            setKeys(newKeys);
            setActive(true);
            setFocused(forceFocus ? true : false);
            setTimeLimit(newTimeLimit);
            setNonIntrusive(newNonIntrusive ? true : false);
        }
    );

    listen("SetFocus", (val: boolean) => {
        if (nonIntrusive) return;
        setFocused(val);
    });

    listen("Stop", () => setActive(false));

    useEffect(() => {
        if (!active) return;

        send("SetFocus", focused);
    }, [focused]);

    return (
        <Modal active={active} focused={focused} nonIntrusive={nonIntrusive}>
            <div
                style={{
                    marginBottom: "0.5rem",
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <div style={{ width: "100%" }}>
                    <h1
                        style={{
                            fontSize: "2.4rem",
                            color: "rgba(var(--text))",
                            fontWeight: "500",
                        }}
                    >
                        Match The Keys
                    </h1>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "start",
                            alignItems: "center",
                            marginTop: "-0.7rem",
                        }}
                    >
                        {nonIntrusive ? (
                            <NonIntrusiveText />
                        ) : (
                            <ToggleFocus
                                focused={focused}
                                setFocused={setFocused}
                            />
                        )}

                        <CancelMinigame setActive={setActive} />
                    </div>
                </div>

                <Timer timeLimit={timeLimit} setActive={setActive} />
            </div>

            <PressKeys
                keys={keys}
                keyIdx={keyIdx}
                setKeyIdx={setKeyIdx}
                setActive={setActive}
                nonIntrusive={nonIntrusive}
            />
        </Modal>
    );
}

export default App;
