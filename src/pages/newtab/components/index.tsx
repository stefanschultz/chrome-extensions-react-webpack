import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter as Router } from "react-router-dom";

import NewTab from "./NewTab";

const initApplication = () => {
    const applicationContainer = document.createElement(
        "application-container",
    );
    document.body.appendChild(applicationContainer);
    const root = createRoot(applicationContainer);
    root.render(
        <Router>
            <NewTab />
        </Router>,
    );
};

initApplication();
