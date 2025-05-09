import {Team} from "../interfaces/team.ts";
import {Tournament} from "../interfaces/tournaments.ts";
import {createMatch, fetchTournamentsService, getAllTeams} from "../services/api.ts";
import React, {useEffect, useState} from "react";
import CustomTimePicker from "../components/CustomTimePicker.tsx";


const MakeMatch = () => {
    const [teams, setTeams] = useState<Team[]>([]);
    const [homeTeam, setHomeTeam] = useState<Team | null>(null);
    const [awayTeam, setAwayTeam] = useState<Team | null>(null);
    const [tournaments, setTournaments] = useState<Tournament[]>([]);
    const [selectedTournament, setSelectedTournament] = useState<number>();
    const [matchDate, setMatchDate] = useState<string>("");
    const [matchTime, setMatchTime] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);

        const fetchTeams = async () => {
            try {
                const data = await getAllTeams();
                setTeams(data);
            } catch (error) {
                console.error("Error fetching teams:", error);
            }
        };

        const fetchTournaments = async () => {
            try {
                const data = await fetchTournamentsService();
                setTournaments(data);
            } catch (error) {
                console.error("Error fetching tournaments:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTeams();
        fetchTournaments();
    }, []);

    const handleTournamentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const tournamentId = Number(event.target.value);
        setSelectedTournament(tournamentId);
    };

    const saveMatch = async () => {

        if (!homeTeam || !awayTeam || !selectedTournament || !matchDate || !matchTime) {
            console.log("No match date");
            return;
        }

        const matchData = {
            homeTeamId: homeTeam.id,
            awayTeamId: awayTeam.id,
            tournamentId: selectedTournament,
            matchDate: `${matchDate}T${matchTime}:00`
        }

        console.log(matchData);

        try {
            const response = await createMatch(matchData);
            console.log("Match created:", response);
        } catch (error) {
            console.error("Error creating match:", error);
        } finally {
            setHomeTeam(null);
            setAwayTeam(null);
            setSelectedTournament(undefined);
            setMatchDate("");
            setMatchTime("");
        }

    }


    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "1rem",
                    marginTop: "1rem",
                }}
            >
                <div>
                    <h2>Home Team</h2>
                    <select
                        value={homeTeam ? homeTeam.id : ""}
                        onChange={(e) => {
                            const team = teams.find((team) => team.id === Number(e.target.value));
                            setHomeTeam(team || null);
                        }}
                    >
                        <option value={""}>Select Home Team</option>
                        {teams.map((team) => (
                            <option key={team.id} value={team.id}>
                                {team.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <h2>Away Team</h2>
                    <select
                        value={awayTeam ? awayTeam.id : ""}
                        onChange={(e) => {
                            const team = teams.find((team) => team.id === Number(e.target.value));
                            setAwayTeam(team || null);
                        }}
                    >
                        <option value={""}>Select Away Team</option>
                        {teams.map((team) => (
                            <option key={team.id} value={team.id}>
                                {team.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div>
                <h2>Tournament</h2>
                <select value={selectedTournament} onChange={handleTournamentChange}>
                    <option value="">Select Tournament</option>
                    {tournaments.map((tournament) => (
                        <option key={tournament.id} value={tournament.id}>
                            {tournament.country}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <h2>Match Date</h2>
                <input type="date" value={matchDate} onChange={(e) => setMatchDate(e.target.value)}/>
            </div>

            <CustomTimePicker onTimeChange={setMatchTime}/>

            <button
                onClick={saveMatch}
                style={{marginTop: "1rem", padding: "0.5rem 1rem", cursor: "pointer"}}
                disabled={!homeTeam || !awayTeam || !selectedTournament}
            >
                Save Match
            </button>
        </div>
    )
}

export default MakeMatch;