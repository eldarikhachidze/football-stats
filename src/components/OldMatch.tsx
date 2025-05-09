import React from 'react';
import {OldMatches} from '../interfaces/match';

interface OldMatchProps {
    homeMatches: OldMatches[];
    awayMatches: OldMatches[];
    label?: string;
}

const OldMatch: React.FC<OldMatchProps> = ({homeMatches, awayMatches, label}) => {
    return (
        <div className="p-4 rounded-xl bg-white shadow">
            <h2 className="text-xl font-semibold mb-4 text-center">{label}</h2>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <h3 className="font-bold text-gray-700 mb-2 text-center">Home Team</h3>
                    <p><strong>Played Matches:</strong> {homeMatches.length}</p>
                    <p><strong>Played Matches:</strong> {awayMatches.length}</p>
                    {homeMatches.length > 0 ? (
                        <ul className="space-y-2">
                            {homeMatches.map((match, index) => (
                                <li key={index} className="p-2 border rounded-md bg-gray-50">
                                    <p><strong>Date:</strong> {new Date(match.date).toLocaleDateString()}</p>
                                    <p><strong>Stat Total:</strong> {match.stat ?? 'N/A'}</p>
                                    <p><strong>Stat Home:</strong> {match.stat_home ?? 'N/A'} </p>
                                    <p><strong>Stat Away</strong> {match.stat_away ?? 'N/A'}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center text-gray-500">No home matches</p>
                    )}
                </div>

                {/* Away team matches */}
                <div>
                    <h3 className="font-bold text-gray-700 mb-2 text-center">Away Team</h3>
                    {awayMatches.length > 0 ? (
                        <ul className="space-y-2">
                            {awayMatches.map((match, index) => (
                                <li key={index} className="p-2 border rounded-md bg-gray-50">
                                    <p><strong>Date:</strong> {new Date(match.date).toLocaleDateString()}</p>
                                    <p><strong>Stat:</strong> {match.stat_away ?? 'N/A'}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center text-gray-500">No away matches</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OldMatch;
