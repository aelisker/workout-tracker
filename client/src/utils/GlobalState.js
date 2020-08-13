import React, { createContext, useContext } from 'react';
import { useWorkoutReducer } from './reducers';

const StoreContext = createContext();
const { Provider } = StoreContext;

// const StoreProvider = ({ value = [], ...props }) => {
//   const [state, dispatch] = useWorkoutReducer({
//     workouts: [],
//     individualExercise: []
//   });
//   // use to confirm it works
//   console.log(state);
//   return <Provider value={[state, dispatch]} {...props} />;
// };

// const useStoreContext = () => {
//   return useContext(StoreContext);
// };

// export { StoreProvider, useStoreContext };