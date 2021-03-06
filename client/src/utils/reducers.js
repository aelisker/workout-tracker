import { useReducer } from 'react';
import { UPDATE_CURRENT_WORKOUT, REMOVE_FROM_CURRENT_WORKOUT } from './actions';

export const reducer = (state, action) => {
  console.log('ACTION', action)
  switch (action.type) {
    // if action type value if the value of X, return a new state object
    case UPDATE_CURRENT_WORKOUT:
      const testExerciseState = {
        ...state,
        currentWorkout: {...action.workout}
      };
      return testExerciseState;

    case REMOVE_FROM_CURRENT_WORKOUT:
      // return exercise array with selected exercise pulled, spread rest of workout with current state
      let newExerciseState = {
        ...state.currentWorkout,
        exercises: state.currentWorkout.exercises.filter(exercise => {
          return exercise._id !== action._id;
        })
      }

      let returnState = {
        currentWorkout: newExerciseState
      }

      return returnState;   

    // if its none of these actions, do not update state at all 
    default: 
      return state;
  }
};

export function useWorkoutReducer(initialState) {
  return useReducer(reducer, initialState);
};