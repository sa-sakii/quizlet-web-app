import { clear } from "@testing-library/user-event/dist/clear";
import { useEffect, useState, useRef } from "react"

export default function CountDown({seconds}){
    const [countdown, setCountdown] = useState(seconds); 
    const timerId = useRef()

    useEffect(() => {
        timerId.current = setInterval(() => {
            setCountdown(prev => prev - 1)
        }, 1000)
        return () => clearInterval(timerId.current);
    })

    useEffect(() => {
        if (countdown <= 0){
            clearInterval(timerId.current);
        }
    })
    return (
        <h1>CountDown: {countdown}</h1>
    )
}