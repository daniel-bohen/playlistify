import Head from "next/head"
import styles from '../styles/Home.module.css'
import { useEffect, useState, useReducer } from 'react'


const initialState = {
    message: "hi"
};

function reducer(state, action)
{
    switch(action.type)
    {
        case "yell":
            return {
                message: "HEY"
            }
        case "whisper": 
        return {
            message: "excuse me"
        }
    }
}


export default function editor() {
    const [state, dispatch] = useReducer(
        reducer, 
        initialState
        ); 


    return (
        <>
            <p>Message: {state.message}</p>
            <button onClick={() => dispatch({type: "yell"})}>yell</button>
            <button onClick={() => dispatch({type: "whisper"})}>whisper</button>
        </>
    )
}