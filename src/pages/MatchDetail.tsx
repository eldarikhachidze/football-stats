import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMatchDetailService } from "../services/api.ts";
import { Match, OldMatches } from "../interfaces/match.ts";
import Notification from "../components/Notification.tsx";
import CategoryButtons from "../components/CategoryButtons.tsx";
import {formatDateAndTime} from "../components/DateTimeDisplay.tsx";

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
    homeTeamOldMatches: OldMatches[];
    awayTeamOldMatches: OldMatches[];
}

const MatchDetail = () => {
    const navigate = useNavigate();
    const { matchId } = useParams<{ matchId: string }>();

    const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);
    const [match, setMatch] = useState<Match | null>(null);
    const [loader, setLoader] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [categoryStats, setCategoryStats] = useState<Statistic | null>(null);
    const [categoryLoader, setCategoryLoader] = useState(false);
    const [homeTeamOldMatches, setHomeTeamOldMatches] = useState<OldMatches[]>([]);
    const [awayTeamOldMatches, setAwayTeamOldMatches] = useState<OldMatches[]>([]);

    const navigateTeamDetail = (teamId: number) => {
        if (!teamId) return;
        navigate(`/team/${teamId}`);
    };

    const handleCategoryClick = async (category: string) => {
        if (!matchId) return;
        setSelectedCategory(category);
        setCategoryLoader(true);
        try {
            const data = await getMatchDetailService(matchId, category);

            setMatch(data.data);
            setCategoryStats(data.data);
            setHomeTeamOldMatches(data.data.homeTeamOldMatches);
            setAwayTeamOldMatches(data.data.awayTeamOldMatches);
        } catch (error) {
            let errorMessage = "Something went wrong!";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            setNotification({ message: errorMessage, type: "error" });
        } finally {
            setCategoryLoader(false);
        }
    };

    useEffect(() => {
        if (!matchId) return;
        const fetchMatchDetail = async () => {
            setLoader(true);
            try {
                const data = await getMatchDetailService(matchId);
                setMatch(data.data);
                setSelectedCategory("fouls");
                setCategoryStats(data.data);
                setHomeTeamOldMatches(data.data.homeTeamOldMatches);
                setAwayTeamOldMatches(data.data.awayTeamOldMatches);
            } catch (error) {
                let errorMessage = "Something went wrong!";
                if (error instanceof Error) {
                    errorMessage = error.message;
                }
                setNotification({ message: errorMessage, type: "error" });
            } finally {
                setLoader(false);
            }
        };
        fetchMatchDetail();
    }, [matchId]);

    if (loader) {
        return <div>Loading match...</div>;
    }

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

            {match && (
                <div className="team-name-box">
                    <h2>{match.home_team_name} vs {match.away_team_name}</h2>
                </div>
            )}

            {categoryLoader && <p>Loading stats...</p>}

            <div >
                {categoryStats && (
                    <div>
                        <h3>{selectedCategory}</h3>
                        <p>Home Team: {categoryStats.homeTeamStat} - {categoryStats.homeTeamStat}</p>
                        <p>Away Team: {categoryStats.awayTeam} - {categoryStats.awayTeamStat}</p>
                        <button onClick={() => navigateTeamDetail(categoryStats.homeTeamId)}>View Home Team</button>
                        <button onClick={() => navigateTeamDetail(categoryStats.awayTeamId)}>View Away Team</button>
                    </div>
                )}
            </div>
            <div className="old-matches">
                <div>
                    {homeTeamOldMatches.map((match) => {
                        const { formattedTime } = formatDateAndTime(match.date);
                        return (
                            <div key={match.match_id}>
                                <p>{formattedTime} - {match.round} - {match.stat}</p>
                            </div>
                        );
                    })}
                </div>
                <div>
                    {awayTeamOldMatches.map((match) => {
                        const { formattedTime } = formatDateAndTime(match.date);
                        return (
                            <div key={match.match_id}>
                                <p>{formattedTime} - {match.round} - {match.stat}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default MatchDetail;
