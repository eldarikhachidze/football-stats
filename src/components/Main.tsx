import React, {useEffect, useState, useCallback, useMemo, useRef} from "react";
import {useNavigate} from "react-router-dom";
import {Match} from "../interfaces/match";
import {
    fetchTournamentsService,
    getMatchesService
} from "../services/api";
import {Tournament} from "../interfaces/tournaments";
import MatchComponent from "./match-component.tsx";
import {useDate} from "./DateContext.tsx";
import Notification from "./Notification.tsx";

const FootballLeagues = () => {
    const navigate = useNavigate();
    const matchRef = useRef<HTMLDivElement | null>(null);
    const { selectedDate, setSelectedDate } = useDate();
    const [matches, setMatches] = useState<Match[]>([]);
    const [tournaments, setTournaments] = useState<Tournament[]>([]);
    const [selectedTournament, setSelectedTournament] = useState<number | null>(null);
    const [loader, setLoader] = useState<boolean>(false);
    const [notification, setNotification] = useState<{ message: string, type: "success" | "error" } | null>(null);

    useEffect(() => {
        setLoader(true);

        if (!selectedDate) {
            const today = new Date().toISOString().split("T")[0];
            setSelectedDate(today);
        }

        loadTournaments();
    }, []);


    const loadTournaments = async () => {
        try {
            const response = await fetchTournamentsService();
            setTournaments(response);
        } catch (error) {
            console.error("❌ Error fetching tournaments:", error);
        } finally {
            setLoader(false);
        }
    };

    const redirectToContentManager = () => {
        navigate("/content-manager");
    }

    const handleTournamentClick = useCallback(async (tournamentId: number | string) => {
        const id = Number(tournamentId);

        if (selectedTournament === id) {
            setSelectedTournament(null);
            return;
        }

        setSelectedTournament(id);
        setLoader(true);

        try {
            const data = await getMatchesService(id, selectedDate || new Date().toISOString().split("T")[0]);
            setMatches(data);
        } catch (error) {
            console.error("❌ Error fetching matches:", error);
        } finally {
            setLoader(false);
        }

        setTimeout(() => {
            document.querySelector(".tournament-dropdown.open")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }, 100)

    }, [selectedTournament, selectedDate]);

    const tournamentList = useMemo(() => {
        return tournaments.map((tournament) => (
            <div key={tournament.id}>
                <div
                    className={`tournament-dropdown ${selectedTournament === Number(tournament.id) ? "open" : ""}`}
                    onClick={() => handleTournamentClick(tournament.id)}
                >
                    <div className="tournament-logo">
                        <span></span>
                    </div>
                    <div className="tournament-name">{tournament.country.toUpperCase()}</div>

                    <div
                        className={`dropdown-arrow ${selectedTournament === Number(tournament.id) ? "rotated" : ""}`}>▼
                    </div>
                </div>

                <div
                    ref={matchRef}
                    className="matches"
                    style={{
                        maxHeight: selectedTournament === Number(tournament.id) ? `${matchRef.current?.scrollHeight}px` : "0px",
                        transition: "max-height 0.4s ease-in-out",
                        overflow: "hidden",
                    }}
                >
                    {selectedTournament === Number(tournament.id) && (
                        matches.length > 0 ? (
                            matches.map((match) => <MatchComponent key={match.id} match={match}/>)
                        ) : (
                            <p>No matches today.</p>
                        )
                    )}
                </div>
            </div>
        ));
    }, [tournaments, selectedTournament, matches]);

    return (
        <div className="container">
            {notification && <Notification message={notification.message} type={notification.type}/>}

            <div className="body">
                <h3>Football Leagues</h3>
                {loader ? <p>Loading...</p> : <div className="page-content">{tournamentList}</div>}
            </div>
            <button onClick={redirectToContentManager}>
                content manager
            </button>
            <button onClick={() => navigate("/match")}>Make Matches</button>
            <button onClick={() => navigate("/teams")}>Teams</button>
        </div>
    );
};

export default FootballLeagues;
