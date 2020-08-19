// import React, { useState, useEffect } from 'react';

// function IndividualRoutineExercise(props) {
//   const {
//     _id,
//     name,
//     description,
//     videoLink,
//     trackDistance,
//     distance,
//     trackTime,
//     time,
//     trackReps,
//     reps,
//     trackWeight,
//     weight,
//     workoutId
//   } = props;

//   const saveTheRoutine = async event => {
//     // event.preventDefault();
//     try {
//       const submit = await saveRoutine({
//         variables: {
//           workoutId: formState.workoutId, input: [
//             {
//               name: currentExercise.name, description: currentExercise.description, videoLink: currentExercise.videoLink,
//               trackReps: currentExercise.trackReps, trackWeight: currentExercise.trackWeight,
//               trackDistance: currentExercise.trackDistance, trackTime: currentExercise.trackTime,
//               reps: Number(formState.reps), weight: Number(formState.weight),
//               distance: Number(formState.distance), time: Number(formState.time)
//             }]
//         }
//       })
//       setFormState({
//         ...formState,
//         workoutId: submit.data.saveRoutine._id.toString(),
//       });
//       console.log('WORKOUT ID', formState.workoutId);

//     } catch (error) {
//       console.log(error);
//     }
//   }

//   const [formState, setFormState] = useState({ time: 0, weight: 0, reps: 0, distance: 0, workoutId: null });
//   const [workouts, setWorkouts] = useState([])
//   // const [count, setCount] = useState(0)

//   const formFunction = () => {
//     // setCount(count + 1)
//     setWorkouts([...workouts, { time: formState.time, weight: formState.weight, reps: formState.reps, distance: formState.distance }])
//   }

//   function handleSubmit(e) {
//     e.preventDefault();
//   }

//   return (
//         <>
//           <div className="container my-1">
    

//             <h2>{name}</h2>

//             <p>
//               {description}
//             </p>
//             {/* <p>
//               {workoutCategory ? workoutCategory.name : null}
//             </p> */}
//           </div>

//           <div key="div-container-dates" className="single-exercise" onSubmit={handleSubmit}>

//             <div key="exercise" className="d-flex justify-content-center">
//               Exercise: {name}
//             </div>

//             {trackTime ? (
//               <div key="div-container-timedata" className="d-flex justify-content-center"> Time (Seconds)
//                 <input key="time" className='form-input'
//                   placeholder='Number of Minutes'
//                   // onBlur= {handleChange}
//                   name='time'
//                   value={Number(formState.time).toString()}
//                   type='number'
//                   id='time'
//                   required
//                   onChange={(event) => {
//                     const { name, value } = event.target;

//                     setFormState({
//                       ...formState,
//                       [name]: value,
//                     });
//                   }}>

//                 </input>
//               </div>
//             ) : null}

//             {trackWeight ? (
//               <div key="div-container-weight" className="d-flex justify-content-center"> Weight (lbs)
//                 <input key="weight" className='form-input'
//                   // onBlur= {handleChange}
//                   placeholder='weight'
//                   name='weight'
//                   type='number'
//                   value={Number(formState.weight).toString()}
//                   id='weight'
//                   required
//                   onChange={(event) => {
//                     const { name, value } = event.target;
//                     console.log({ name, value });

//                     setFormState({
//                       ...formState,
//                       [name]: value,
//                     });
//                   }}>

//                 </input>
//               </div>
//             ) : null}

//             {trackReps ? (
//               <div key="div-container-reps" className="d-flex justify-content-center"> Reps (Number)
//                 <input key="reps" className='form-input'
//                   // onBlur= {handleChange}
//                   placeholder='reps'
//                   name='reps'
//                   type='number'
//                   value={Number(formState.reps).toString()}
//                   id='reps'
//                   required
//                   onChange={(event) => {
//                     const { name, value } = event.target;

//                     setFormState({
//                       ...formState,
//                       [name]: value,
//                     });
//                   }}>

//                 </input>
//               </div>
//             ) : null}

//             {trackDistance ? (
//               <div key="div-container-timedata" className="d-flex justify-content-center"> Distance (Miles)
//                 <input key="time" className='form-input'
//                   // onBlur= {handleChange}
//                   placeholder='Number of Miles'
//                   name='distance'
//                   type='number'
//                   value={Number(formState.distance).toString()}
//                   required
//                   id='distance'
//                   onChange={(event) => {
//                     const { name, value } = event.target;

//                     setFormState({
//                       ...formState,
//                       [name]: value,
//                     });
//                   }}>

//                 </input>
//               </div>
//             ) : null}

//             <div key="div-container-button" className="d-flex justify-content-center">
//               <button onClick={() => {
//                 // if (!errorMessage.length > 0) {
//                   formFunction()
//                   saveTheRoutine()
//                 // } 
//               }}>
//                 Submit Set
//             </button>
//             </div>

//             {/* <div className="d-flex justify-content-center">
//               {errorMessage && (
//                 <div>
//                   <p className="error-text">{errorMessage}</p>
//                 </div>
//               )}
//             </div> */}

            
//           </div>
//     </>
//   );
// }

// export default IndividualRoutineExercise;