import { useReducer } from 'react';
import { UPDATE_CURRENT_WORKOUT } from './actions';

export const reducer = (state, action) => {
  console.log('ACTION', action)
  switch (action.type) {
    // if action type value if the value of X, return a new state object
    case UPDATE_CURRENT_WORKOUT:
      return {
        ...state,
        currentWorkout: {...action.workout}
      };
    // if its none of these actions, do not update state at all 
    default: 
      return state;
  }
};

export function useWorkoutReducer(initialState) {
  return useReducer(reducer, initialState);
};