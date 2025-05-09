import {useLocation} from "react-router-dom";
import BackButton from "./BackButton.tsx";
import React from "react";
import {useDate} from "./DateContext.tsx";


const Header = () => {
    const location = useLocation();
    const pathname = location.pathname.split("/").filter(Boolean)
    const secondPath = pathname[0] || "Matches";
    const showBackButton = location.pathname !== "/";

    const {selectedDate, setSelectedDate} = useDate();

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(event.target.value);
    };

    return (
        <header className="header">
            <div className="left">
                {showBackButton && <BackButton/>}
            </div>
            <div className="center">
                <h1 className="header-title">{secondPath.charAt(0).toUpperCase() + secondPath.slice(1)}</h1>
            </div>
            <div className="right">
                <div className="calendar-position">
                    <input
                        type="date"
                        value={selectedDate || new Date().toISOString().split("T")[0]}
                        onChange={handleDateChange}
                    />
                </div>
            </div>
        </header>
    );
}

export default Header;