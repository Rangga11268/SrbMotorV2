import React, { createContext, useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";

const ComparisonContext = createContext();

export const useComparison = () => useContext(ComparisonContext);

export const ComparisonProvider = ({ children }) => {
    const [selectedMotors, setSelectedMotors] = useState(() => {
        const saved = localStorage.getItem("comparison_motors");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem(
            "comparison_motors",
            JSON.stringify(selectedMotors)
        );
    }, [selectedMotors]);

    const addToCompare = (motor) => {
        if (selectedMotors.find((m) => m.id === motor.id)) {
            toast.error("Motor sudah ada dalam perbandingan");
            return;
        }

        if (selectedMotors.length >= 3) {
            toast.error("Maksimal 3 motor untuk perbandingan");
            return;
        }

        setSelectedMotors([
            ...selectedMotors,
            {
                id: motor.id,
                name: motor.name,
                image: motor.image_path,
                price: motor.price,
                brand: motor.brand,
                type: motor.type,
            },
        ]);
        toast.success("Motor ditambahkan ke perbandingan");
    };

    const removeFromCompare = (motorId) => {
        setSelectedMotors(selectedMotors.filter((m) => m.id !== motorId));
        toast.success("Motor dihapus dari perbandingan");
    };

    const clearComparison = () => {
        setSelectedMotors([]);
        toast.success("Daftar perbandingan dikosongkan");
    };

    const isInComparison = (motorId) => {
        return selectedMotors.some((m) => m.id === motorId);
    };

    return (
        <ComparisonContext.Provider
            value={{
                selectedMotors,
                addToCompare,
                removeFromCompare,
                clearComparison,
                isInComparison,
            }}
        >
            {children}
        </ComparisonContext.Provider>
    );
};
