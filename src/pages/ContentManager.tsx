import {
    createPreMatchStatisticsService, fetchMatchesFromRapidApiService,
    fetchMatchStatisticsService, fetchNextMatchesService, fetchTeamStatisticsService,
    fetchTournamentsService
} from "../services/api.ts";
import {Tournament} from "../interfaces/tournaments.ts";
import Notification from "../components/Notification.tsx";
import {useEffect, useState} from "react";

const ContentManager = () => {
    const [notification, setNotification] = useState<{
        message: string,
        type: "success" | "error"
    } | null>(null);
    const [tournaments, setTournaments] = useState<Tournament[]>([]);
    const [selectedTournament, setSelectedTournament] = useState<number | null>(null);
    const [tournamentId, setTournamentId] = useState<number | null>(null);
    const [tournamentIdForTeamStatistics, setTournamentIdForTeamStatistics] = useState<number | null>(null);
    const [round, setRound] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [loadingMatches, setLoadingMatches] = useState(false);
    const [loadingNextMatches, setLoadingNextMatches] = useState(false);
    const [loadingTeamsStatistics, setLoadingTeamsStatistics] = useState(false);
    const [loadingStatistics, setLoadingStatistics] = useState(false);
    const [loadingPreMatch, setLoadingPreMatch] = useState(false);

    useEffect(() => {

        loadTournaments();
    }, []);

    const fetchNextMatches = async () => {
        setLoadingNextMatches(true);
        try {
            const result = await fetchNextMatchesService();
            if (result.success) {
                setNotification({message: result.message, type: "success"});
            }
        } catch (error) {
            let errorMessage = "Something went wrong!";
            if (error instanceof Error) {
                errorMessage = error.message;
            }

            setNotification({message: errorMessage, type: "error"});
        } finally {
            setLoadingNextMatches(false);
        }
    }

    const fetchMatches = async () => {
        setLoadingMatches(true);
        try {
            const result = await fetchMatchesFromRapidApiService()
            if (result.success) {
                setNotification({message: result.message, type: "success"});
            }

        } catch (error) {
            let errorMessage = "Something went wrong!";
            if (error instanceof Error) {
                errorMessage = error.message;
            }

            setNotification({message: errorMessage, type: "error"});
        } finally {
            setLoadingMatches(false);
        }

    }

    const loadTournaments = async () => {
        setLoading(true);
        try {
            const response = await fetchTournamentsService();
            setTournaments(response);
        } catch (error) {
            let errorMessage = "Something went wrong!";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            setNotification({message: errorMessage, type: "error"});
        } finally {
            setLoading(false);
        }
    };

    const fetchTeamsStatistics = async () => {
        setLoadingTeamsStatistics(true);
        if (tournamentIdForTeamStatistics === null) {
            setNotification({message: "Please select a tournament!", type: "error"});
            return;
        }
        try {
            const result = await fetchTeamStatisticsService(tournamentIdForTeamStatistics);
            if (result.success) {
                setNotification({message: result.message, type: "success"});
            }
        } catch (error) {
            let errorMessage = "Something went wrong!";
            if (error instanceof Error) {
                errorMessage = error.message;
            }

            setNotification({message: errorMessage, type: "error"});
        } finally {
            setLoadingTeamsStatistics(false);
        }
    }

    const generateMatchStatistics = async () => {
        if (tournamentId === null) {
            setNotification({message: "Please select a tournament!", type: "error"});
            return;
        }
        setLoadingStatistics(true);
        try {
            const result = await fetchMatchStatisticsService(tournamentId);
            if (result.success) {
                setNotification({message: result.message, type: "success"});
            }

        } catch (error) {
            let errorMessage = "Something went wrong!";
            if (error instanceof Error) {
                errorMessage = error.message;
            }

            setNotification({message: errorMessage, type: "error"});
        } finally {
            setLoadingStatistics(false);
        }
    }

    const handleSubmit = async () => {
        setLoadingPreMatch(true);

        if (!selectedTournament || !round) {
            setNotification({message: "Please select a tournament and enter a round!", type: "error"});
            return;

        }
        try {
            const data = await createPreMatchStatisticsService(selectedTournament, Number(round));
            if (data.success) {
                setNotification({message: data.message, type: "success"});
            }
        } catch (error) {
            let errorMessage = "Something went wrong!";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            setNotification({message: errorMessage, type: "error"});
        } finally {
            setLoadingPreMatch(false);
        }
    };

    return (
        <div className="container">
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
            )}

            <div className="form-group">
                <h3>Fetch Matches</h3>

                <button
                    onClick={fetchMatches}
                    disabled={loadingMatches}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                    {loadingMatches ? "Processing..." : "Fetch Matches"}
                </button>
            </div>

            <div className="form-group">
                <h3>Fetch Next Matches</h3>

                <button
                    onClick={fetchNextMatches}
                    disabled={loadingNextMatches}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                    {loadingNextMatches ? "Processing..." : "Fetch Next Matches"}
                </button>
            </div>

            <div className="form-group">
                <h3>Create Pre Match Statistics</h3>

                <select
                    value={selectedTournament || ""}
                    onChange={(e) => setSelectedTournament(Number(e.target.value))}
                    disabled={loading}
                >
                    <option value="">Select Tournament</option>
                    {tournaments.map((tournament) => (
                        <option key={tournament.id} value={tournament.id}>
                            {tournament.country}
                        </option>
                    ))}
                </select>

                <input
                    type="number"
                    placeholder="Enter Round"
                    value={round}
                    onChange={(e) => setRound(e.target.value)}
                />

                <button onClick={handleSubmit} disabled={loadingPreMatch}>
                    {loadingPreMatch ? "Processing..." : "Create Pre-Match Statistics"}
                </button>
            </div>

            <div className="form-group">
                <h3>Fetch Match Statistics</h3>

                <select
                    value={tournamentId || ""}
                    onChange={(e) => setTournamentId(Number(e.target.value))}
                    disabled={loading}
                >
                    <option value="">Select Tournament</option>
                    {tournaments.map((tournament) => (
                        <option key={tournament.id} value={tournament.id}>
                            {tournament.country}
                        </option>
                    ))}
                </select>

                <button onClick={generateMatchStatistics} disabled={loadingStatistics}>
                    {loadingStatistics ? "Processing..." : "Fetch Match Statistics"}
                </button>
            </div>
            <div className="form-group">
                <h3>Fetch Teams Statistics</h3>

                <select
                    value={tournamentIdForTeamStatistics || ""}
                    onChange={(e) => setTournamentIdForTeamStatistics(Number(e.target.value))}
                    disabled={loading}
                >
                    <option value="">Select Tournament</option>
                    {tournaments.map((tournament) => (
                        <option key={tournament.id} value={tournament.id}>
                            {tournament.country}
                        </option>
                    ))}
                </select>
                <button onClick={fetchTeamsStatistics} disabled={loadingTeamsStatistics}>
                    {loadingTeamsStatistics ? "Processing..." : "Fetch Team Statistics"}
                </button>
            </div>
        </div>
    );
}

export default ContentManager;
