'use client'
import React, { useState, useEffect } from 'react';
import {Introduction} from "@/app/Introduction";
import {Footer} from "@/app/Footer";
import Quiz from "@/app/Quiz";
import {ResultReport} from "@/app/ResultReport";
import {questions} from "@/app/questions";

export default function QuizContainer() {

    const [quizStarted, setQuizStarted] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);

    const numberOfQuestions = 8;
    const winningNumber = 5;

    const trackAnswer = (question, option, answeredCorrectly) => {
        setUserAnswers([...userAnswers, { question, option, answeredCorrectly }]);
    }


    const startQuiz = () => {
        setQuizStarted(true);
    };

    const finishQuiz = (show) => {
        setShowResults(show);
    };

    if (!quizStarted) {
        return <Introduction startQuiz={startQuiz}/>
    }

    if (showResults) {
        return <ResultReport
            correctAnswersCount={correctAnswersCount}
            answers={userAnswers}
            numberOfQuestions={numberOfQuestions}
            winningNumber={winningNumber}
        />;
    }

    return (
        <Quiz
            finishQuiz={finishQuiz}
            updateCorrectAnswers={setCorrectAnswersCount}
            trackAnswer={trackAnswer}
            numberOfQuestions={numberOfQuestions}
        />
    );
}
