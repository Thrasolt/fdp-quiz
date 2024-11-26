'use client'

import React from "react";
import {Footer} from "@/app/Footer";

export const Introduction = ({startQuiz}) => {
    return (
            <div className="flex-grow flex items-center justify-center bg-white p-4">
                <div className="text-center p-4 bg-gray-100 rounded-lg shadow-xl">
                    <div className="text-2xl font-bold mb-2 text-gray-900">Willkommen zum Wahl-Quiz der FDP
                        Grevenbroich!
                    </div>
                    <p className="text-lg text-gray-800 mb-4">Testen Sie Ihr Wissen mit unserem Quiz und gewinnen Sie
                        tolle Preise. Drücken Sie 'Start' um zu beginnen.</p>
                    <button onClick={startQuiz}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Start
                    </button>
                </div>
            </div>
    )
}