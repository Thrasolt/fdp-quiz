'use client'

import React from "react";

export const ResultDetails = ({answers }) => {
    return (
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
                    <tr key={index}
                        className={`${question.answeredCorrectly ? 'bg-green-600' : 'bg-red-600'} text-white`}>
                        <td className="py-1 px-2">{question.question}</td>
                        <td className="py-1 px-2">{question.option}</td>
                        <td className="py-1 px-2">{question.answeredCorrectly ? 'Ja' : 'Nein'}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}