import React from "react";
import { funds } from "../app/data";
import { useParams } from "react-router-dom";

export default function Fund() {
    const { name } = useParams()
    
    return funds[name] ? (
        <>
            <h1>{funds[name].title}</h1>
            <p>{funds[name].content}</p>
        </>
    ) : (
        <>
            <h1>404 Not Found</h1>
            <h2>Error: No route matches URL "/{name}"</h2>
        </>
        
    )
}