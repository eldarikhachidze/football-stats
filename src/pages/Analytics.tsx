import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { generateTipsService } from "../services/api.ts";
import { useDate } from "../components/DateContext.tsx";
import { OldMatches } from "../interfaces/match.ts";
import Notification from "../components/Notification.tsx";
import CategoryButtons from "../components/CategoryButtons.tsx";

interface Statistic {
    homeTeamId: number;
    awayTeamId: number;
    homeTeam: string;
    awayTeam: string;
    value: number;
    valueAgainst: number;
    avgValueAgainst: number;
    avgValue: number;
    homeTeamStat: number;
    homeTeamAvgStat: number;
    homeTeamStatsAgainst: number;
    homeTeamAvgStatAgainst: number;
    awayTeamStat: number;
    awayTeamAvgStat: number;
    awayTeamStatsAgainst: number;
    awayTeamAvgStatAgainst: number;
    homeTeamOldMatch: OldMatches[];
    awayTeamOldMatch: OldMatches[];
}

const Analytics = () => {
    const navigate = useNavigate();
    const { selectedDate } = useDate();
    const [notification, setNotification] = useState<{ message: string, type: "success" | "error" } | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [categoryStats, setCategoryStats] = useState<Record<string, Statistic[]>>({});
    const [loader, setLoader] = useState(false);

    const navigateToTeam = (teamId?: number) => {
        if (teamId) navigate(`/team/${teamId}`);
    };

    const handleCategoryClick = async (category: string) => {
        if (!selectedDate) {
            return setNotification({ message: "Please select a date", type: "error" });
        }

        if (categoryStats[category]) {
            setSelectedCategory(category);
            return;
        }

        setLoader(true);
        try {
            const { statType, data } = await generateTipsService(selectedDate, category);
            if (!Array.isArray(data)) {
                throw new Error("No data returned");
            }
            setCategoryStats(prev => ({ ...prev, [statType]: data }));
            setSelectedCategory(statType);
        } catch (error) {
            let errorMessage = "Something went wrong!";
            if (error instanceof Error) errorMessage = error.message;
            setNotification({ message: errorMessage, type: "error" });
        } finally {
            setLoader(false);
        }
    };

    const fetchAnalytics = async () => {
        if (!selectedDate) {
            return setNotification({ message: "Please select a date", type: "error" });
        }

        setLoader(true);
        try {
            const { statType, data } = await generateTipsService(selectedDate);
            if (!Array.isArray(data)) {
                throw new Error("No data returned");
            }
            setCategoryStats(prev => ({ ...prev, [statType]: data }));
            setSelectedCategory(statType);
        } catch (error) {
            let errorMessage = "Something went wrong!";
            if (error instanceof Error) errorMessage = error.message;
            setNotification({ message: errorMessage, type: "error" });
        } finally {
            setLoader(false);
        }
    };

    useEffect(() => {
        fetchAnalytics();
    }, [selectedDate]); // თავიდან იწოდოს მხოლოდ როცა selectedDate იცვლება

    const renderTeamStatBlock = (
        label: string,
        stat1: number,
        stat2: number,
        stat3: number,
        stat4: number
    ) => (
        <div className="team-stat">
            <strong>{label}</strong>
            <p><span>Total:</span> <span>{stat1.toFixed(2)}</span></p>
            <p><span>Avg:</span> <span>{stat2.toFixed(2)}</span></p>
            <p><span>Aga:</span> <span>{stat3.toFixed(2)}</span></p>
            <p><span>Avg:</span> <span>{stat4.toFixed(2)}</span></p>
        </div>
    );

    return (
        <div>
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
            )}

            <CategoryButtons onCategoryClick={handleCategoryClick} />

            {loader && <div>Loading...</div>}

            {selectedCategory && Array.isArray(categoryStats[selectedCategory]) && (
                <div className="stat-category">
                    <h2>{selectedCategory.toUpperCase()}</h2>
                    <ul>
                        {categoryStats[selectedCategory].map((stat, index) => (
                            <li key={index} className="match-container">
                                <div className="match-header">
                                    <p className="team-detail-navigate-button"
                                       onClick={() => navigateToTeam(stat.homeTeamId)}>{stat.homeTeam}</p>
                                    <p className="vs-text">VS</p>
                                    <p className="team-detail-navigate-button"
                                       onClick={() => navigateToTeam(stat.awayTeamId)}>{stat.awayTeam}</p>
                                </div>

                                <div className="match-stats">
                                    {renderTeamStatBlock("Home", stat.homeTeamStat, stat.homeTeamAvgStat, stat.homeTeamStatsAgainst, stat.homeTeamAvgStatAgainst)}
                                    {renderTeamStatBlock("Total", stat.value, stat.avgValue, stat.valueAgainst, stat.avgValueAgainst)}
                                    {renderTeamStatBlock("Away", stat.awayTeamStat, stat.awayTeamAvgStat, stat.awayTeamStatsAgainst, stat.awayTeamAvgStatAgainst)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Analytics;
