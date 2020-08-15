// import { useReducer } from 'react';
// import {  } from './actions';

// export const reducer = (state, action) => {
//   switch (action.type) {
//     // if action type value if the value of X, return a new state object
//     case TOGGLE_PROP:
//       return {
//         ...state,
//         newProp: !state.newProp
//       };
//     // if its none of these actions, do not update state at all 
//     default: 
//       return state;
//   }
// };
switch (action.type) {
    case UPDATE_WORKOUT:
        return {
            ...state,
            workouts: [...action.products]
        };
    case UPDATE_EXERCISES:
        return {
            ...state,
            exercises: [...action.exercises]
        };
    case ADD_EXERCISES:
        return {
            ...state,
            exercises: [...state.workouts, action.workouts]
        }
}
// export function useWorkoutReducer(initialState) {
//   return useReducer(reducer, initialState);
// };