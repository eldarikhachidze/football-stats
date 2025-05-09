import {MatchDetail} from "./match.ts";

export interface Team {
    id: number;
    name: string;
    country: string;
    matches: MatchDetail[];
}



export interface Statistics {
    id: number;
    team_id: number;
    goals_scored: number;
    goals_conceded: number;
    owngoals: number;
    assists: number;
    shots: number;
    bigchances: number;
    bigchancescreated: number;
    bigchancesmissed: number;
    shotsontarget: number;
    shotsofftarget: number;
    corners: number;
    totalpasses: number;
    accuratepasses: number;
    accuratepassespercentage: number;
    saves: number;
    offsides: number;
    fouls: number;
    yellowcards: number;
    yellowredcards: number;
    redcards: number;
    bigchancesagainst: number;
    bigchancescreatedagainst: number;
    bigchancesmissedagainst: number;
    cornersagainst: number;
    offsidesagainst: number;
    redcardsagainst: number;
    shotsagainst: number;
    shotsblockedagainst: number;
    shotsfrominsidetheboxagainst: number;
    shotsfromoutsidetheboxagainst: number;
    shotsofftargetagainst: number;
    shotsontargetagainst: number;
    totalpassesagainst: number;
    yellowcardsagainst: number;
    throwins: number;
    goalkicks: number;
    ballrecovery: number;
    freekicks: number;
    matches: number;
    awardedmatches: number;
    averageGoals: number;
    averageGoalsAgainst: number;
    averageOffsides: number;
    averageOffsidesAgainst: number;
    averageYellowCards: number;
    averageYellowCardsAgainst: number
    averageRedCards: number;
    averageRedCardsAgainst: number;
    averageFouls: number;
    averageFoulsAgainst: number;
    averageCorners: number;
    averageCornersAgainst: number;

}

export interface TeamDetail {
    team: Team;
    statistics: Statistics;
}