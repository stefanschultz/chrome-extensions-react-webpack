import React from "react";
import { createRoot } from "react-dom/client";

import Popup from "./Popup";

const initApplication = () => {
    const applicationContainer = document.createElement(
        "application-container",
    );
    document.body.appendChild(applicationContainer);
    const root = createRoot(applicationContainer);
    root.render(<Popup />);
};

initApplication();
