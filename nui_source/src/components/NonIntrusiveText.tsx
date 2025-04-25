const NonIntrusiveText = () => {
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
                Non-intrusive mode
            </p>
        </div>
    );
};

export default NonIntrusiveText;
