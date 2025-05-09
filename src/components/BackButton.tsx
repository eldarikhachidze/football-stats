import {useNavigate} from "react-router-dom";


const BackButton = () => {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(-1)}
            style={{
                color: "#f9dddb",
                border: "none",
                cursor: "pointer",
                backgroundColor:"#3447AA",
            }}
        >
            ⬅ Back
        </button>
    );
}

export default BackButton;