import React from "react";
import "./bootstrap";
import "../css/app.css";
import { ComparisonProvider } from "./Contexts/ComparisonContext";
import { route } from "ziggy-js";

window.route = route;

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";

const appName = "SRB Motor";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <ComparisonProvider>
                <App {...props} />
            </ComparisonProvider>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
