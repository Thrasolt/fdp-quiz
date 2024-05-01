'use client'

import React, { useState } from "react";
import {ResultDetails} from "@/app/ResultDetails";

export const ResultReport = ({ correctAnswersCount, answers }) => {
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    return (
        <div className="flex-grow flex items-center justify-center bg-white p-4">
            <div className="text-center p-4 bg-gray-200 rounded-lg shadow-xl">
                <div className="text-2xl font-bold mb-2 text-gray-900">Quiz Beendet</div>
                <div className="text-lg mb-3 text-gray-900">Sie haben 6 Fragen beantwortet und {correctAnswersCount} richtig.</div>
                {correctAnswersCount >= 3 ? (
                    <div className="text-green-600 font-bold">Glückwunsch! Sie haben das Quiz gewonnen!</div>
                ) : (
                    <div className="text-red-600 font-bold">Sie benötigen mindestens 3 richtige Antworten zum Gewinnen. Versuchen Sie es erneut!</div>
                )}
                <div className="mt-4">
                    <button onClick={toggleDetails} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        {showDetails ? "Weniger Details anzeigen" : "Ergebnis im Detail ansehen"}
                    </button>
                    {showDetails && (
                        <ResultDetails answers={answers} />
                    )}
                </div>
            </div>
        </div>
    );
}
