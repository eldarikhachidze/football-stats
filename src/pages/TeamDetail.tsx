import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getTeamDetail} from "../services/api.ts";
import {MatchDetail, MatchStatistic} from "../interfaces/match.ts";
import {Team} from "../interfaces/team.ts";
import Chart from "../components/Chart.tsx";

const TeamDetail = () => {
    const {teamId} = useParams();
    const [team, setTeam] = useState<Team | null>(null);
    const [matches, setMatches] = useState<MatchDetail[]>([]);
    const [loader, setLoader] = useState(false);
    const [selectedStat, setSelectedStat] = useState<keyof MatchStatistic>("fouls"); // ✅ აქ ვუთითებთ keyof MatchStatistic

    const statOptions: (keyof MatchStatistic)[] = [
        "fouls", "passes", "punches", "offsides", "redcards", "throwins", "divesaves",
        "freekicks", "goalkicks", "highclaims", "cornerkicks", "hitwoodwork", "shotsongoal",
        "totaltackle", "yellowcards", "ballrecovery", "dispossessed", "shotsoffgoal", "accuratecross",
        "expectedgoals", "accuratepasses", "ballpossession", "duelwonpercent", "goalsprevented",
        "totalclearance", "bigchancemissed", "bigchancescored", "goalkeepersaves", "interceptionwon",
        "touchesinoppbox", "bigchancecreated", "errorsleadtoshot", "fouledfinalthird",
        "totalshotsongoal", "wontacklepercent", "accuratelongballs", "finalthirdentries",
        "dribblespercentage", "accuratethroughball", "totalshotsinsidebox", "totalshotsoutsidebox",
        "aerialduelspercentage", "blockedscoringattempt", "groundduelspercentage",
        "finalthirdphasestatistic"
    ];

    useEffect(() => {
        const fetchData = async () => {
            if (!teamId) return

            try {
                setLoader(true);
                const data = await getTeamDetail(teamId);
                setTeam(data);
                setMatches(data.matches || []);
            } catch (error) {
                console.error("Error fetching team detail:", error);
            } finally {
                setLoader(false);
            }
        };

        fetchData();
    }, [teamId]);

    if (loader) {
        return <p>Loading...</p>;
    }

    if (!team) {
        return <p>Team not found</p>;
    }

    return (
        <div style={{ height: "100vh" }}>
            <h2 style={{
                paddingBottom: "10px",
                fontSize: "1.5rem",
                fontWeight: "bold",
            }}>Statistics</h2>


            <div className={"detail-content"}>
                <div className={"team-box"}>
                    <div className={"team-logo"}></div>
                    <div className={"team-name-box"}>
                        <h3>{team.name}</h3>
                        <p>{team.country}</p>
                    </div>
                </div>


                <select
                    value={selectedStat}
                    onChange={(e) => setSelectedStat(e.target.value as keyof MatchStatistic)} // ✅ აქ ვუთითებთ "as keyof MatchStatistic"
                    style={{
                        marginBottom: "20px",
                        padding: "8px",
                        fontSize: "1rem",
                        borderRadius: "5px"
                    }}
                >
                    {statOptions.map((option) => (
                        <option key={option} value={option}>
                            {option.replace(/([a-z])([A-Z])/g, "$1 $2").replace("_", " ").toUpperCase()}
                        </option>
                    ))}
                </select>

                {matches.length > 0 ? (
                    <Chart matches={matches} statKey={selectedStat}/>
                ) : (
                    <p>No matches available</p>
                )}
            </div>
        </div>
    );
}

export default TeamDetail;
