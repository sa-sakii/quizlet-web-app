import React from "react";

export default function HomePage(props) {
    return (
        <div className="home-container">
            <h1>Quizlet</h1>
            <button onClick={props.startQuiz}>Start Quiz</button>
        </div>
    )
}