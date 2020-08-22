import { useReducer } from 'react';
import { UPDATE_CURRENT_WORKOUT, REMOVE_FROM_CURRENT_WORKOUT } from './actions';

export const reducer = (state, action) => {
  console.log('ACTION', action)
  switch (action.type) {
    // if action type value if the value of X, return a new state object
    case UPDATE_CURRENT_WORKOUT:
      return {
        ...state,
        currentWorkout: {...action.workout}
      };
    case REMOVE_FROM_CURRENT_WORKOUT:
      console.log('STATE from REDUCER', state)
      let newExerciseState = state.currentWorkout.exercises.filter(exercise => {
        return exercise._id !== action._id;
      });

      return {
        ...state,
        currentWorkout: { exercises: newState }
      }

      // console.log('NEW STATE', newState)

      // let realNewState = {
      //   ...state,
      //   currentWorkout: { exercises: newState }
      // };

      // console.log("\n\n\n ---- NEW STATE: ");
      // console.log(realNewState);
      // return realNewState;
    // if its none of these actions, do not update state at all 
    default: 
      return state;
  }
};

export function useWorkoutReducer(initialState) {
  return useReducer(reducer, initialState);
};