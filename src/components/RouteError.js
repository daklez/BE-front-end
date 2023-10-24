
import React from "react";
import { useSelector } from "react-redux";
import { selectRouteError } from "../state/slices/routeErrorSlice";
import { Navigate } from "react-router-dom";

export default function RouteError() {
    const error = useSelector(selectRouteError)
    return error ?(
        <>
            <h1>{error.status} {error.statusText}</h1>
            <h2>{error.data}</h2>
        </>
    ) : <Navigate to="/" />
}