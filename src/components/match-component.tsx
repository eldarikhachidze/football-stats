import {Match} from "../interfaces/match.ts";
import {useNavigate} from "react-router-dom";


const MatchComponent = (props: { match: Match }) => {
    const navigate = useNavigate();

    const MatchDetail = () => {
        navigate(`/match/${props.match.id}`);
    }

    return (
        <div
            style={{
                display: "flex",
                padding: "5px",
                cursor: "pointer",
            }}
            onClick={MatchDetail}
        >
            <p
                style={
                    {
                        color: "rgba(34, 34, 38, 0.45",
                        borderRight: "1px solid rgba(34, 34, 38, 0.45",
                        paddingRight: "10px"
                    }
                }
            >{new Date(props.match.date).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            })}</p>

            <div style={{display: "grid",  paddingLeft: "10px"}}>
                <h3 className={"teams-name"}>
                    {props.match.home_team_name}
                </h3>
                <h3 className={"teams-name"}>
                    {props.match.away_team_name}
                </h3>
            </div>

        </div>
    )
}

export default MatchComponent;