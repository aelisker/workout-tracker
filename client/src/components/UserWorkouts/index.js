import React, { useEffect } from "react";
import { useLazyQuery } from '@apollo/react-hooks';
import { idbPromise } from '../../utils/helpers';
import { QUERY_USER } from "../../utils/queries";

const userWorkouts = () => {
    const state = useSelector((state) => {
        return state
    });

    useEffect(() => {
        async function getWorkouts() {
            if (data) {
                dispatch({
                    type: QUERY_USER,
                    userworkouts: user.workouts
                });
                data.userworkouts.forEach((userworkout) => {
                    idbPromise('workouts', 'get', userworkout)
                });
            }
        }
    }, [data, loading, dispatch]); 
    
    <div className="workouts">
        <h2>Your Workouts</h2>
        <div>{state.userworkouts}</div>
    </div>
}