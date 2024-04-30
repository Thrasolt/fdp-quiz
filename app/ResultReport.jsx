'use client'

import React from "react";

export const ResultReport = ({ correctAnswersCount, answers }) => {
    return (
        <div className="flex-grow flex items-center justify-center bg-white p-4">
            <div className="text-center p-4 bg-gray-200 rounded-lg shadow-xl">
                <div className="text-2xl font-bold mb-2 text-gray-900">Quiz Beendet</div>
                <div className="text-lg mb-3 text-gray-900">Sie haben 6 Fragen beantwortet und {correctAnswersCount} richtig.</div>
                {correctAnswersCount >= 3 ? (
                    <div className="text-green-900 font-bold">Glückwunsch! Sie haben das Quiz gewonnen!</div>
                ) : (
                    <div className="text-red-900 font-bold">Sie benötigen mindestens 3 richtige Antworten zum Gewinnen. Versuchen Sie es erneut!</div>
                )}
                <div className="mt-4">
                    <div className="text-lg font-bold mb-2 text-gray-900">Fragen Übersicht:</div>
                    <table className="mx-auto w-full max-w-xl">
                        <thead>
                        <tr className="text-left border-b-2 border-gray-400">
                            <th className="pb-2 px-2 text-gray-900">Frage</th>
                            <th className="pb-2 px-2 text-gray-900">Ihre Antwort</th>
                            <th className="pb-2 px-2 text-gray-900">Richtig?</th>
                        </tr>
                        </thead>
                        <tbody>
                        {answers.map((question, index) => (
                            <tr key={index} className={`${question.answeredCorrectly ? 'bg-green-600' : 'bg-red-600'} text-white`}>
                                <td className="py-1 px-2">{question.question}</td>
                                <td className="py-1 px-2">{question.option}</td>
                                <td className="py-1 px-2">{question.answeredCorrectly ? 'Ja' : 'Nein'}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}



