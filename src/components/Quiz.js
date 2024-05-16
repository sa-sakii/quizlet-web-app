import React, { useState, useEffect } from "react";
// import Questions from "../data/GeneralKnowledge";
import QuizResult from "./QuizResult";
import HomePage from "./HomePage";
// import CountDown from "./CountDown";

function shuffleArray(array) {

    // Start from the end of the array
    for (let i = array.length - 1; i > 0; i--) {
        // Generate a random index between 0 and i
        const j = Math.floor(Math.random() * (i + 1));
        // Swap elements at i and j
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
// Function to add the value of "correct_answer" in a random position of "incorrect_answers"
function addCorrectAnswerRandomly(questions) {
    questions.forEach(question => {
        // Get a random index within the range of incorrect_answers array length
        const randomIndex = Math.floor(Math.random() * (question.incorrect_answers.length + 1));

        // Insert the value of correct_answer at the random index
        question.incorrect_answers.splice(randomIndex, 0, question.correct_answer);

        shuffleArray(question.incorrect_answers)
    });

    return questions;
}

// Adding correct_answer randomly to incorrect_answers
// const finalQuestions = addCorrectAnswerRandomly(Questions);

// insert the number of questions

export default function Quiz() {
    const [quiz, setQuiz] = useState([]); 
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [clickedOption, setClickedOption] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [questionCount, setQuesionCount] = useState(1);
    const [quizGame, setQuizGame] = useState(false);
    const [counter, setCounter] = useState(10);
    
    const QuizQuestions = quiz.slice(0, 5);
    
    useEffect(() => {
        fetch('https://sheetdb.io/api/v1/75cxzjezzpkpu')
            .then((response) => response.json())
            .then((data) => setQuiz(data));
    }, []);

    // changing to the next question
    const nextQuestion = () => {
        updateScore();
        setQuesionCount(questionCount + 1);
        if (currentQuestion < QuizQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setClickedOption(0);
        }
        else {
            setShowResult(true);
        }
    }

    // checking the correct answer and updating the score
    const updateScore = () => {
        if (QuizQuestions[currentQuestion].incorrect_answers[clickedOption - 1] === QuizQuestions[currentQuestion].correct_answer) {
            setScore(score + 1);
        }
    }

    // reset all the state values and start quiz again
    const retryQuiz = () => {
        setShowResult(false);
        setClickedOption(0);
        setCurrentQuestion(0);
        setScore(0);
        setQuesionCount(1);
    }

    // sending props to "start quiz" button
    const startQuiz = () => {
        setQuizGame(!quizGame);
    }

    // calling the nextquestion after the timer hit 10 secs 
    const handleTimer = () => {
        setTimeout(nextQuestion, 10000);
    }


    return (
        <div className="main-container">
            {!quizGame ? (
                <HomePage startQuiz={startQuiz} />
            ) :
                (
                    <div className="container">
                        {showResult ? (
                            <QuizResult score={score} totalScore={QuizQuestions.length} retryQuiz={retryQuiz} />
                        ) :
                            (
                                <>
                                    <div className="question-count">
                                        {`${questionCount} / ${QuizQuestions.length}`}
                                    </div>

                                    <div className="question">
                                        <span id="question-txt">{QuizQuestions[currentQuestion].question}</span>
                                    </div>
                                    <div className="option-container">
                                        {QuizQuestions[currentQuestion].incorrect_answers.map((option, i) => {
                                            return (
                                                <div className="button-container" onLoad={handleTimer()}>
                                                    <button className={`option-btn ${clickedOption === i + 1 ? "checked" : null}`}
                                                        onClick={() => setClickedOption(i + 1)}
                                                        key={i}
                                                    >
                                                        {option}
                                                    </button>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <input
                                        type="button"
                                        value="Next"
                                        id="next-button"
                                        onClick={nextQuestion}
                                    />
                                </>
                            )}
                    </div>
                )
            }
        </div>
    )
}