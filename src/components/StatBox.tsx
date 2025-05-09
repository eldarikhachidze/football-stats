import React from "react";

interface StatBoxProps {
    title: string;
    homePlayedMatches: number;
    homeValue: number;
    homeAverage: number;
    homeAgainst: number;
    homeAverageAgainst: number;
    awayPlayedMatches: number;
    awayValue: number;
    awayAverage: number;
    awayAgainst: number;
    awayAverageAgainst: number;
}

const StatBox: React.FC<StatBoxProps> = ({
                                             title,
                                             homePlayedMatches,
                                             homeValue,
                                             homeAverage,
                                             homeAgainst,
                                             homeAverageAgainst,
                                             awayPlayedMatches,
                                             awayValue,
                                             awayAverage,
                                             awayAgainst,
                                             awayAverageAgainst
                                         }) => {
    console.log("statBox", homeValue, homeValue, awayValue, awayAverage, homeAverage);

    return (
        <div className="stats-box">
            <div className="flex flex-row justify-around">
                <span className="text-gray-500">Played {homePlayedMatches} matches</span>
                <h3 className="text-lg font-bold">{title}</h3>
                <span className="text-gray-500">Played {awayPlayedMatches} matches</span>
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                    <span className="text-blue-500">{homeValue}</span>
                    <span className="text-gray-500">-</span>
                    <span className="text-red-500">{awayValue}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-500">Avg {homeAverage}</span>
                    <span className="text-gray-500">-</span>
                    <span className="text-gray-500">Avg {awayAverage}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-500">Against {homeAgainst}</span>
                    <span className="text-gray-500">-</span>
                    <span className="text-gray-500">Against {awayAgainst}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-500">AVR Against {homeAverageAgainst}</span>
                    <span className="text-gray-500">-</span>
                    <span className="text-gray-500">AVR Against {awayAverageAgainst}</span>
                </div>
            </div>
        </div>
    );
};

export default StatBox;