'use client'

import React, { useState, useEffect } from 'react';
import { questions as importedQuestions } from './questions';
import { mustQuestions } from './mustQuestions';

function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

export default function Quiz() {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
    const [questionsAnsweredCount, setQuestionsAnsweredCount] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [quizStarted, setQuizStarted] = useState(false);

    useEffect(() => {
        const shuffledQuestions = shuffleArray([...importedQuestions]);
        const selectedRegularQuestions = shuffledQuestions.slice(0, 6 - mustQuestions.length);
        const combinedQuestions = [...mustQuestions, ...selectedRegularQuestions];
        setQuestions(shuffleArray(combinedQuestions));  // Ensure randomness
    }, []);

    const handleAnswer = (option) => {
        setQuestionsAnsweredCount(questionsAnsweredCount + 1);
        if (option === question.answer) {
            setCorrectAnswersCount(correctAnswersCount + 1);
        }
        if (questionsAnsweredCount + 1 === 6) {
            setShowResults(true);
        } else {
            setCurrentQuestionIndex((currentQuestionIndex + 1) % questions.length);
        }
    };

    const startQuiz = () => {
        setQuizStarted(true);
    };

    const question = questions[currentQuestionIndex] || {};

    if (!quizStarted) {
        return (
            <div className="flex flex-col h-screen justify-between">
                <div className="flex-grow flex items-center justify-center bg-white p-4">
                    <div className="text-center p-4 bg-gray-100 rounded-lg shadow-xl">
                        <div className="text-2xl font-bold mb-2 text-gray-900">Willkommen zum Europa-Quiz der FDP Grevenbroich!</div>
                        <p className="text-lg text-gray-800 mb-4">Testen Sie Ihr Wissen mit unserem Quiz und gewinnen Sie tolle Preise. Drücken Sie 'Start' um zu beginnen.</p>
                        <button onClick={startQuiz} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Start
                        </button>
                    </div>
                </div>
                <footer className="text-center text-sm text-gray-600 py-4">
                    Der Rechtsweg ist ausgeschlossen.
                </footer>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen justify-between">
            <div className="flex-grow flex items-center justify-center bg-white p-4">
                {showResults ? (
                    <div className="text-center p-4 bg-gray-100 rounded-lg shadow-xl">
                        <div className="text-2xl font-bold mb-2 text-gray-900">Quiz Beendet</div>
                        <div className="text-lg mb-3 text-gray-900">Sie haben 6 Fragen beantwortet und {correctAnswersCount} richtig.</div>
                        {correctAnswersCount >= 3 ? (
                            <div className="text-green-600 font-semibold">Glückwunsch! Sie haben das Quiz gewonnen!</div>
                        ) : (
                            <div className="text-red-600 font-semibold">Sie benötigen mindestens 3 richtige Antworten zum Gewinnen. Versuchen Sie es erneut!</div>
                        )}
                    </div>
                ) : (
                    <div className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
                        <div className="mb-4">
                            <div className="text-lg font-semibold text-gray-900">{question.question}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {question.options?.map(option => (
                                <button key={option} onClick={() => handleAnswer(option)}
                                        className="bg-gray-300 hover:bg-gray-400 rounded p-2 text-black focus:outline-none transition duration-150 ease-in-out">
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <footer className="text-center text-sm text-gray-600 py-4">
                Der Rechtsweg ist ausgeschlossen.
            </footer>
        </div>
    );
}
