import { createRoot } from "react-dom/client";
import App from "./App";

import "./styling/index.css";
import "./styling/text.css";
import "./styling/base_defaults.css";

createRoot(document.getElementById("root")!).render(<App />);
