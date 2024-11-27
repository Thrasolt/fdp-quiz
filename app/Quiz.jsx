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

export default function Quiz({ finishQuiz, updateCorrectAnswers, trackAnswer, numberOfQuestions }) {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
    const [questionsAnsweredCount, setQuestionsAnsweredCount] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [blink, setBlink] = useState({ color: '', key: null });

    useEffect(() => {
        const shuffledQuestions = shuffleArray([...importedQuestions]);
        const selectedRegularQuestions = shuffledQuestions.slice(0, numberOfQuestions - mustQuestions.length);
        const combinedQuestions = [...mustQuestions, ...selectedRegularQuestions];

        combinedQuestions.forEach(question => {shuffleArray(question.options)});

        setQuestions(shuffleArray(combinedQuestions));
    }, []);

    const handleAnswer = (option, optionKey) => {
        const correctAnswer = questions[currentQuestionIndex].answer;
        const isCorrect = option === correctAnswer;
        setSelectedOption(optionKey);
        setQuestionsAnsweredCount(questionsAnsweredCount + 1);


        if (isCorrect) {
            const newCorrectAnswersCount = correctAnswersCount + 1;
            setCorrectAnswersCount(newCorrectAnswersCount);
            updateCorrectAnswers(newCorrectAnswersCount);
            setBlink({ color: 'green', key: optionKey });
            trackAnswer(questions[currentQuestionIndex].question, option, true);

            setTimeout(() => {
                if (questionsAnsweredCount + 1 === numberOfQuestions) {
                    finishQuiz(true);
                } else {
                    setCurrentQuestionIndex((currentQuestionIndex + 1) % questions.length);
                    setBlink({ color: '', key: null });
                }
            }, 1000);
        } else {
            setBlink({ color: 'red', key: optionKey });
            trackAnswer(questions[currentQuestionIndex].question, option, false);
            setTimeout(() => {
                const correctKey = questions[currentQuestionIndex].options.indexOf(correctAnswer);
                setBlink({ color: 'green', key: correctKey });

                setTimeout(() => {
                    if (questionsAnsweredCount + 1 === numberOfQuestions) {
                        finishQuiz(true);
                    } else {
                        setCurrentQuestionIndex((currentQuestionIndex + 1) % questions.length);
                        setBlink({ color: '', key: null });
                    }
                }, 1000);
            }, 1000);
        }
    };

    const question = questions[currentQuestionIndex] || {};

    return (
        <div className="flex-grow flex items-center justify-center bg-white p-4">
            <div className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
                <div className="mb-4">
                    <div className="text-lg font-semibold text-gray-900">{question.question}</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {question.options?.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleAnswer(option, index)}
                            className={`bg-gray-300 hover:bg-gray-400 active:bg-gray-500 focus:bg-gray-300 rounded p-2 text-black focus:outline-none transition duration-150 ease-in-out 
                                ${blink.key === index ? (blink.color === 'green' ? 'animate-blink-green' : 'animate-blink-red') : ''}`}
                        >
                            {option}
                        </button>
                    ))}
                </div>

            </div>
        </div>
    );
}

// Add CSS for blinking animations in your global styles or a CSS module
