import React from "react";
import { useState, useEffect } from "react";


export default function Test() {

    const [quiz, setQuiz] = useState([]);

    useEffect(() => {
        fetch('https://sheetdb.io/api/v1/75cxzjezzpkpu')
            .then((response) => response.json())
            .then((data) => setQuiz(data));
    }, []);

    console.log("quiz:"+quiz)
    return (
        <span>{}</span>
        
    )
}