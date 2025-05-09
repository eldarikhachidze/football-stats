import React, { useState } from "react";

interface TimePickerProps {
    onTimeChange: (time: string) => void;
}

const CustomTimePicker: React.FC<TimePickerProps> = ({ onTimeChange }) => {
    const [hours, setHours] = useState("00");
    const [minutes, setMinutes] = useState("00");

    const handleTimeChange = (newHours: string, newMinutes: string) => {
        setHours(newHours);
        setMinutes(newMinutes);
        onTimeChange(`${newHours.padStart(2, "0")}:${newMinutes.padStart(2, "0")}`);
    };

    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
            <h2>Match Start Time (24h format)</h2>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                {/* საათების სელექტი */}
                <select
                    value={hours}
                    onChange={(e) => handleTimeChange(e.target.value, minutes)}
                >
                    {[...Array(24).keys()].map((hour) => (
                        <option key={hour} value={hour.toString().padStart(2, "0")}>
                            {hour.toString().padStart(2, "0")}
                        </option>
                    ))}
                </select>

                <span>:</span>

                {/* წუთების სელექტი */}
                <select
                    value={minutes}
                    onChange={(e) => handleTimeChange(hours, e.target.value)}
                >
                    {[...Array(60).keys()].map((minute) => (
                        <option key={minute} value={minute.toString().padStart(2, "0")}>
                            {minute.toString().padStart(2, "0")}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default CustomTimePicker;
