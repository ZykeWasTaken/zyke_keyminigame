import React from "react";
import { TbArrowBigDownLinesFilled } from "react-icons/tb";

interface TranslateArrowKeyProps {
    _key: "ARROWUP" | "ARROWDOWN" | "ARROWLEFT" | "ARROWRIGHT";
    props: React.SVGProps<SVGSVGElement>;
}

const TranslateArrowKey: React.FC<TranslateArrowKeyProps> = ({
    _key,
    props,
}) => {
    const rotation = {
        ["ARROWUP"]: 180,
        ["ARROWDOWN"]: 0,
        ["ARROWLEFT"]: 90,
        ["ARROWRIGHT"]: 270,
    };

    return (
        <TbArrowBigDownLinesFilled
            {...props}
            style={{
                ...(props.style && props.style),
                transform: `rotate(${rotation[_key]}deg)`,
            }}
        />
    );
};

export default TranslateArrowKey;
