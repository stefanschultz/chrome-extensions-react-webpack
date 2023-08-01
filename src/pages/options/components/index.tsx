import React from "react";
import { createRoot } from "react-dom/client";

import Options from "./Options";

const initApplication = () => {
    const applicationContainer = document.createElement(
        "application-container",
    );
    document.body.appendChild(applicationContainer);
    const root = createRoot(applicationContainer);
    root.render(<Options />);
};

initApplication();
