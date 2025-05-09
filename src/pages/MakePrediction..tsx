import React, {useEffect, useState} from "react";
import {getAllTeams, fetchTournamentsService, compareTeamsService} from "../services/api.ts";
import {Tournament} from "../interfaces/tournaments.ts";
import {TeamDetail, Team, Statistics} from "../interfaces/team.ts";
import StatBox from "../components/StatBox.tsx";

interface TeamState {
    homeTeam: Statistics;
    awayTeam: Statistics;
}

const TeamsPage = () => {
    const [tournaments, setTournament] = useState<Tournament[]>([]);
    const [selectedTournament, setSelectedTournament] = useState<string>("");
    const [teams, setTeams] = useState<Team[]>([]);
    const [homeTeam, setHomeTeam] = useState<Team | null>(null);
    const [awayTeam, setAwayTeam] = useState<Team | null>(null);
    const [stats, setStats] = useState<TeamState | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const fetchTournaments = async () => {
            const data = await fetchTournamentsService();
            setTournament(data);
            setLoading(false);
        };

        fetchTournaments();
    }, []);

    const handleTournamentChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const tournamentId = Number(event.target.value);

        setSelectedTournament(event.target.value);
        setHomeTeam(null);
        setAwayTeam(null);

        if (!event.target.value) return;

        try {
            const data = await getAllTeams(tournamentId);
            setTeams(data);
        } catch (error) {
            console.error("Error fetching teams:", error);
        }
    };

    const handleCompareTeams = async () => {
        if (!homeTeam || !awayTeam) {
            console.error("❌ No team found.");
            return;
        }

        try {
            const response: TeamDetail[] = await compareTeamsService(homeTeam.id.toString(), awayTeam.id.toString());

            if (!Array.isArray(response) || response.length !== 2) {
                console.error("❌ Invalid response format", response);
                return;
            }

            const homeTeamData = response.find((team) => team.id === homeTeam.id);
            const awayTeamData = response.find((team) => team.id === awayTeam.id);

            if (!homeTeamData || !awayTeamData) {
                console.error("❌ One or both teams were not found in the response.");
                return;
            }

            const homeStats = homeTeamData.statistics;
            const awayStats = awayTeamData.statistics;

            if (homeStats && awayStats) {
                setStats({homeTeam: homeStats, awayTeam: awayStats});
                console.log("✅ Stats Updated:", {homeTeam: homeStats, awayTeam: awayStats});
            } else {
                console.error("❌ Stats missing for one or both teams.");
            }
        } catch (error) {
            console.error("🚨 Error comparing teams:", error);
        }
    };


    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1
                style={{
                    textAlign: "center",
                    fontSize: "1.5rem",
                    padding: "1rem",
                }}
            >
                Choice Teams
            </h1>

            <select value={selectedTournament} onChange={handleTournamentChange}>
                <option value="">Select Tournament</option>
                {tournaments.map((tournament) => (
                    <option key={tournament.id} value={tournament.id}>
                        {tournament.country}
                    </option>
                ))}
            </select>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "1rem",
                    marginTop: "1rem",
                }}
            >
                <div>
                    <h2 className={'choice-teams-box'}>Home Team</h2>
                    {selectedTournament && (
                        <select
                            value={homeTeam ? homeTeam.id : ""}
                            onChange={(e) => {
                                const selectedTeam = teams.find(team => team.id === Number(e.target.value));
                                setHomeTeam(selectedTeam || null);
                            }}
                        >
                            <option value="">Select Home Team</option>
                            {teams.map((team) => (
                                <option key={team.id} value={team.id}>
                                    {team.name}
                                </option>
                            ))}
                        </select>
                    )}
                </div>

                <div>
                    <h2 className={'choice-teams-box'}>Away Team</h2>
                    {selectedTournament && (
                        <select
                            value={awayTeam ? awayTeam.id : ""}
                            onChange={(e) => {
                                const selectedTeam = teams.find(team => team.id === Number(e.target.value));
                                setAwayTeam(selectedTeam || null);
                            }}
                        >
                            <option value="">Select Away Team</option>
                            {teams.map((team) => (
                                <option key={team.id} value={team.id}>
                                    {team.name}
                                </option>
                            ))}
                        </select>
                    )}
                </div>
            </div>

            <button
                onClick={handleCompareTeams}
                style={{marginTop: "1rem", padding: "0.5rem 1rem", cursor: "pointer"}}
            >
                Compare Teams
            </button>

            {stats && (
                <div>
                    <h2>Team Stats:</h2>
                    <div style={
                        {
                            display: "flex",
                            justifyContent: "space-between",
                            flexDirection: "column",
                            gap: "1rem",
                            marginTop: "1rem",
                        }
                    }>
                        <StatBox
                            title="Goals scored"
                            homePlayedMatches={stats.homeTeam.matches}
                            homeValue={stats.homeTeam.goals_scored}
                            homeAverage={stats.homeTeam.averageGoals}
                            homeAgainst={stats.homeTeam.goals_conceded}
                            homeAverageAgainst={stats.homeTeam.averageGoalsAgainst}
                            awayPlayedMatches={stats.awayTeam.matches}
                            awayValue={stats.awayTeam.goals_scored}
                            awayAverage={stats.awayTeam.averageGoals}
                            awayAgainst={stats.awayTeam.goals_conceded}
                            awayAverageAgainst={stats.awayTeam.averageGoalsAgainst}
                        />
                        <StatBox
                            title="Corners"
                            homePlayedMatches={stats.homeTeam.matches}
                            homeValue={stats.homeTeam.corners}
                            homeAverage={stats.homeTeam.averageCorners}
                            homeAgainst={stats.homeTeam.cornersagainst}
                            homeAverageAgainst={stats.homeTeam.averageCornersAgainst}
                            awayPlayedMatches={stats.awayTeam.matches}
                            awayValue={stats.awayTeam.corners}
                            awayAverage={stats.awayTeam.averageCorners}
                            awayAgainst={stats.awayTeam.cornersagainst}
                            awayAverageAgainst={stats.awayTeam.averageCornersAgainst}
                        />
                        <StatBox
                            title="Offsides"
                            homePlayedMatches={stats.homeTeam.matches}
                            homeValue={stats.homeTeam.offsides}
                            homeAverage={stats.homeTeam.averageOffsides}
                            homeAgainst={stats.homeTeam.offsidesagainst}
                            homeAverageAgainst={stats.homeTeam.averageOffsidesAgainst}
                            awayPlayedMatches={stats.awayTeam.matches}
                            awayValue={stats.awayTeam.offsides}
                            awayAverage={stats.awayTeam.averageOffsides}
                            awayAgainst={stats.awayTeam.offsidesagainst}
                            awayAverageAgainst={stats.awayTeam.averageOffsidesAgainst}
                        />
                        <StatBox
                            title="Fouls"
                            homePlayedMatches={stats.homeTeam.matches}
                            homeValue={stats.homeTeam.fouls}
                            homeAverage={stats.homeTeam.averageFouls}
                            homeAgainst={stats.homeTeam.fouls}
                            homeAverageAgainst={stats.homeTeam.averageFoulsAgainst}
                            awayPlayedMatches={stats.awayTeam.matches}
                            awayValue={stats.awayTeam.fouls}
                            awayAverage={stats.awayTeam.averageFouls}
                            awayAgainst={stats.awayTeam.fouls}
                            awayAverageAgainst={stats.awayTeam.averageFoulsAgainst}
                        />
                        <StatBox
                            title="Yellow Cards"
                            homePlayedMatches={stats.homeTeam.matches}
                            homeValue={stats.homeTeam.yellowcards}
                            homeAverage={stats.homeTeam.averageYellowCards}
                            homeAgainst={stats.homeTeam.yellowcardsagainst}
                            homeAverageAgainst={stats.homeTeam.averageYellowCardsAgainst}
                            awayPlayedMatches={stats.awayTeam.matches}
                            awayValue={stats.awayTeam.yellowcards}
                            awayAverage={stats.awayTeam.averageYellowCards}
                            awayAgainst={stats.awayTeam.yellowcardsagainst}
                            awayAverageAgainst={stats.awayTeam.averageYellowCardsAgainst}
                        />
                        <StatBox
                            title="Red Cards"
                            homePlayedMatches={stats.homeTeam.matches}
                            homeValue={stats.homeTeam.redcards}
                            homeAverage={stats.homeTeam.averageRedCards}
                            homeAgainst={stats.homeTeam.redcardsagainst}
                            homeAverageAgainst={stats.homeTeam.averageRedCardsAgainst}
                            awayPlayedMatches={stats.awayTeam.matches}
                            awayValue={stats.awayTeam.redcards}
                            awayAverage={stats.awayTeam.averageRedCards}
                            awayAgainst={stats.awayTeam.averageRedCardsAgainst}
                            awayAverageAgainst={stats.awayTeam.averageRedCardsAgainst}
                        />
                    </div>
                </div>
            )}

        </div>
    );
};

export default TeamsPage;
