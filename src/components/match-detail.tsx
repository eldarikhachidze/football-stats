import React from "react";

export interface MatchDetailsProps {
    match?: {
        id: number;
        home: string;
        away: string;
        date: string;
        time: string;
        totalFoul: number;
        totalCorner: number;
    };
    onClose: () => void;
}

const MatchDetails: React.FC<MatchDetailsProps> = ({match, onClose}) => {
    if (!match) return null;

    return (
        <div style={{
            position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", alignItems: "center", justifyContent: "center"
        }}>
            <div style={{
                backgroundColor: "#fff", padding: "20px", borderRadius: "8px",
                boxShadow: "0 1px 4px rgba(34, 34, 38, .16)", maxWidth: "400px"
            }}>
                <h2 style={{color: "#333", fontSize: "0.7rem", margin: "unset"}}>Match Details</h2>
                <p style={{fontSize: "0.45rem", color: "#555", margin: "unset"}}>{match.date} {match.time}</p>
                <div style={{fontSize: "18px", fontWeight: "bold"}}>
                    {match.home} vs {match.away}
                </div>
                <div style={{
                    width: "100%",
                    maxWidth: "400px",
                    borderRadius: "5px",
                    overflow: "hidden",
                    boxShadow: "0 1px 4px rgba(34, 34, 38, .16)",
                }}>
                    <p style={{color: "#777"}}>Fouls: {match.totalFoul}</p>
                    <div
                        style={{
                            width: "100%",
                            height: "200px",
                            backgroundColor: "#ddd",
                            margin: "10px 0"
                        }}>
                    </div>
                </div>
                <p style={{color: "#777"}}>Total Corners: {match.totalCorner}</p>
                <button onClick={onClose} style={{marginTop: "10px"}}>Close</button>
            </div>
        </div>
    );
};

export default MatchDetails;
