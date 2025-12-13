import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../Contexts/ThemeContext";

export default function ThemeToggle({ className = "" }) {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-colors duration-200 
                ${
                    theme === "dark"
                        ? "text-yellow-400 hover:bg-gray-700"
                        : "text-gray-600 hover:bg-gray-100 hover:text-primary"
                } ${className}`}
            title={
                theme === "dark"
                    ? "Switch to Light Mode"
                    : "Switch to Dark Mode"
            }
        >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
    );
}
