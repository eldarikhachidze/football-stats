import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { MatchDetail, MatchStatistic } from "../interfaces/match.ts";

type ChartProps = {
    matches: MatchDetail[];
    statKey: keyof MatchStatistic;
}

const Chart = ({ matches, statKey }: ChartProps) => {
    const threshold = 20;

    const data = matches.map((round, index) => {
        const value = round.statistics[0]?.[statKey] ?? 0;
        return {
            round: index + 1,
            value,
        };
    });

    const greenSegments: typeof data[][] = [];
    const redSegments: typeof data[][] = [];

    let currentSegment: typeof data = [];
    let currentColor: "green" | "red" | null = null;

    data.forEach((point, i) => {
        const pointColor = point.value > threshold ? "green" : "red";
        if (currentColor === null) {
            currentColor = pointColor;
            currentSegment = [point];
        } else if (currentColor === pointColor) {
            currentSegment.push(point);
        } else {
            currentSegment.push(point);
            if (currentColor === "green") greenSegments.push([...currentSegment]);
            else redSegments.push([...currentSegment]);
            currentSegment = [point];
            currentColor = pointColor;
        }
    });

    if (currentSegment.length > 0) {
        if (currentColor === "green") greenSegments.push(currentSegment);
        else redSegments.push([...currentSegment]);
    }

    return (
        <>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="round"
                        type="number"
                        label={{ value: "Round", position: "insideBottom", offset: -5 }} />
                    <YAxis label={{ value: statKey, angle: -90, position: "insideLeft", dx: 10, dy: 20 }} />
                    <Tooltip
                        labelFormatter={(label) => `Round: ${label}`}
                        formatter={(value) => [`${statKey}: ${value}`]}
                        wrapperStyle={{ backgroundColor: "#fff", border: "1px solid #ccc", borderRadius: "5px" }}
                        itemStyle={{ color: "#333", fontWeight: "bold" }}
                        labelStyle={{ color: "#8884d8", fontWeight: "bold" }}
                    />
                    <Legend
                        layout="horizontal"
                        verticalAlign="top"
                        align="center"
                        formatter={() => statKey}  // StatKey დასაყენებლად
                        wrapperStyle={{
                            paddingBottom: "10px",
                            fontSize: "1.2em",
                            fontWeight: "bold",
                            color: "#333",
                        }}
                    />
                    {greenSegments.map((seg, index) => (
                        <Line
                            key={`green-${index}`}
                            data={seg}
                            type="monotone"
                            dataKey="value"
                            stroke="#4caf50"
                            dot={{ fill: "#4caf50" }}
                            isAnimationActive={false}
                        />
                    ))}
                    {redSegments.map((seg, index) => (
                        <Line
                            key={`red-${index}`}
                            data={seg}
                            type="monotone"
                            dataKey="value"
                            stroke="#f44336"
                            dot={{ fill: "#f44336" }}
                            isAnimationActive={false}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </>
    );
};

export default Chart;
