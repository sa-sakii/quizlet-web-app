import React from "react";

function QuizResult(props) {
    return (
        <>
            <h1>Results</h1>
            <div>
                Your Score: {props.score}<br />
                Total Score: {props.totalScore}
            </div>
            <button 
                id="next-button"
                onClick={props.retryQuiz}
            >
                Retry
            </button>
        </>
    )
}

export default QuizResult; 