import axios from "axios";

const API_URL = 'http://localhost:3000/api';


export const getCategoriesFieldsService = async () => {
    try {
        const response = await fetch(`${API_URL}/stats/categories`);
        const data = await response.json();

        if (!response.ok) {
            console.error('Server responded with an error:', data.message || response.statusText);
            throw new Error(data.message || 'Failed to fetch matches');
        }

        return data
    } catch (error) {
        console.error('❌ Error fetching match statistics:', error);
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error('Unexpected error occurred');
    }
}

export const fetchTeamStatisticsService = async (tournamentId: number) => {
    try {
        const response = await fetch(`${API_URL}/fetch/update-team-statistics`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({tournamentId}),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('Server responded with an error:', response.statusText);
            throw new Error(errorData.message || 'Failed to fetch tournament standings');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching tournament standings:', error);
        throw new Error('Failed to fetch tournament standings');
    }
}

export const fetchMatchStatisticsService = async (tournamentId: number) => {
    try {
        const response = await fetch(`${API_URL}/fetch/matches-statistics`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({tournamentId})
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Server responded with an error:', data.message || response.statusText);
            throw new Error(data.message || 'Failed to fetch matches');
        }

        return data
    } catch (error) {
        console.error('❌ Error fetching match statistics:', error);
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error('Unexpected error occurred');
    }
}

export const fetchNextMatchesService = async () => {
    try {
        const response = await fetch(`${API_URL}/fetch/next-matches`);
        const data = await response.json();

        if (!response.ok) {
            console.error('Server responded with an error:', data?.message || response.statusText);
            throw new Error(data?.message || 'Failed to fetch next matches');
        }

        return data
    } catch (error) {
        console.error('❌ Error fetching next matches:', error);
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error('Unexpected error occurred');
    }
}

export const fetchMatchesFromRapidApiService = async () => {
    try {
        const response = await fetch(`${API_URL}/fetch/matches`);
        const data = await response.json();

        if (!response.ok) {
            console.error('Server responded with an error:', data.message || response.statusText);
            throw new Error(data.message || 'Failed to fetch matches');
        }

        return data;
    } catch (error) {
        console.error('❌ Error fetching matches:', error);
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error('Unexpected error occurred');
    }

}

export const getAllTeams = async (tournamentId?: number) => {
    const url = tournamentId ? `${API_URL}/teams/${tournamentId}` : `${API_URL}/teams`;

    const response = await fetch(url);

    if (!response.ok) {
        console.error("Server responded with an error:", response.statusText);
        throw new Error("Failed to fetch teams");
    }

    return response.json();
};

export const getTeamDetail = async (teamId: string) => {
    const response = await fetch(`${API_URL}/teams/details/${teamId}`);

    if (!response.ok) {
        console.error('Server responded with an error:', response.statusText);
        throw new Error('Failed to fetch team detail');
    }

    const text = await response.text();

    try {
        const data = JSON.parse(text); // Then parse the JSON
        return data;
    } catch (error) {
        console.error('Error parsing JSON:', error);
        throw new Error('Failed to parse team detail data');
    }
}

export const fetchTournamentsService = async () => {
    const response = await fetch(`${API_URL}/tournaments`);

    if (!response.ok) {
        console.error('Server responded with an error:', response.statusText);
        throw new Error('Failed to fetch tournaments');
    }

    const text = await response.text();
    try {
        const data = JSON.parse(text); // Then parse the JSON
        return data;
    } catch (error) {
        console.error('Error parsing JSON:', error);
        throw new Error('Failed to parse tournaments data');
    }
}

export const compareTeamsService = async (homeTeamId: string, awayTeamId: string) => {
    const response = await fetch(`${API_URL}/compare/teams`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({homeTeamId, awayTeamId}),
    });

    if (!response.ok) {
        console.error('Server responded with an error:', response.statusText);
        throw new Error('Failed to compare teams');
    }

    const text = await response.text();

    try {
        const data = JSON.parse(text); // Then parse the JSON
        return data;
    } catch (error) {
        console.error('Error parsing JSON:', error);
        throw new Error('Failed to parse comparison data');
    }
}

export const createMatch = async (matchData: {
    homeTeamId: number;
    awayTeamId: number;
    tournamentId: number;
    matchDate: string;
}) => {
    try {
        const response = await axios.post(`${API_URL}/match`, matchData, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        return response.data; // წარმატებული პასუხი
    } catch (error) {
        console.error("Error saving match:", error);
        throw error;
    }
};

export const getMatchesService = async (tournamentId: number, date: string) => {
    const response = await fetch(`${API_URL}/match/matches?tournamentId=${tournamentId}&date=${date}`);

    if (!response.ok) {
        console.error('Server responded with an error:', response.statusText);
        throw new Error('Failed to fetch matches');
    }

    const text = await response.text();

    try {
        const data = JSON.parse(text); // Then parse the JSON
        return data;
    } catch (error) {
        console.error('Error parsing JSON:', error);
        throw new Error('Failed to parse matches data');
    }
}

export const createPreMatchStatisticsService = async (tournamentId: number, round: number) => {
    const response = await fetch(`${API_URL}/fetch/pre-match-statistics`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            tournament_id: tournamentId,
            round: round,
        }),
    });
    if (!response.ok) {
        console.error('Server responded with an error:', response.statusText);
        throw new Error('Failed to compare teams');
    }

    const text = await response.text();

    try {
        const data = JSON.parse(text); // Then parse the JSON
        return data;
    } catch (error) {
        console.error('Error parsing JSON:', error);
        throw new Error('Failed to parse comparison data');
    }
};

export const getMatchDetailService = async (matchId: string, statKey: string = "fouls") => {
    const url = new URL(`${API_URL}/match/${matchId}`);
    url.searchParams.append("statKey", statKey.toLowerCase());

    const response = await fetch(url.toString());

    if (!response.ok) {
        console.error('Server responded with an error:', response.statusText);
        throw new Error('Failed to fetch match detail');
    }

    const text = await response.text();

    try {
        const data = JSON.parse(text);
        return data;
    } catch (error) {
        console.error('Error parsing JSON:', error);
        throw new Error('Failed to parse match detail data');
    }
};

export const generateTipsService = async (date: string, statType?: string) => {
    try {
        const response = await fetch(`${API_URL}/analytics/create`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(statType ? {date, statType} : {date}),
        });

        if (!response.ok) {
            throw new Error(`Server Error: ${response.status} - ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Failed to fetch tips:", error);
        throw new Error("Could not fetch tips. Please try again.");
    }
};