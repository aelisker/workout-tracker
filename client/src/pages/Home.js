<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import Calendar from '../components/Calendar';
=======
import React from 'react';
import ExerciseList from '../components/ExerciseList';
>>>>>>> feature/styling

function Home() {

  return (
<<<<<<< HEAD
    <>
    <header className="flex-row px-1 header-stylin">
      <div className="row ">
        <div className="column ">
          <h3>
            <div data-testid="link" href="/"> Strength Training
          </div>
          </h3>
          <h4>
            <a
              onClick={() => setCurrentWorkout("curls")}
              data-testid="link" href="/curls"> Curls
          </a>
          </h4>
          <h4>
            <a
             onClick={() => setCurrentWorkout("bench")}
             data-testid="link" href="/5f38a4b9dbfed8512853da6c/?workout_id=5f38a4b9dbfed8512853da6c"> Bench Press
          </a>
          </h4>
          <h4>
            <a
             onClick={() => setCurrentWorkout("flies")}
             data-testid="link" href="/flies"> Flies
          </a>
          </h4>
          <h4>
            <a
            onClick={() => setCurrentWorkout("squats")} 
            data-testid="link" href="/squats"> Squats
          </a>
          </h4>
          <h4>
            <a
            onClick={() => setCurrentWorkout("leg-ext")} 
            data-testid="link" href="/leg-ext"> Leg Extensions
          </a>
          </h4>
          <h4>
            <a
            onClick={() => setCurrentWorkout("push-ups")} 
            data-testid="link" href="/push-ups"> Push-ups
          </a>
          </h4>
          <h4>
            <a
            onClick={() => setCurrentWorkout("chin-ups")} 
            data-testid="link" href="/chin-ups"> Chin-ups
          </a>
          </h4>
          <h4>
            <a
            onClick={() => setCurrentWorkout("sit-ups")} 
            data-testid="link" href="/sit-ups"> Sit-ups
          </a>
          </h4>
          <h4>
            <a
              onClick={() => setCurrentWorkout("5f38a4b9dbfed8512853da6d")}
              data-testid="link" href="/5f38a4b9dbfed8512853da6d/?workout_id=5f38a4b9dbfed8512853da6d"> Plank
          </a>
          </h4>
          <h4>
            <a
              // onClick={() => setCurrentWorkout("5f38a4b9dbfed8512853da6d")}
              data-testid="link" href="/list"> List
          </a>
          </h4>
        </div>
        <div className="column">




          <h3>
            <div data-testid="link" href="/"> Aerobic Exercise
          </div>
          </h3>
          <h4>
            <a
            onClick={() => setCurrentWorkout("running")} 
            data-testid="link" href="/running"> Running
          </a>
          </h4>
          <h4>
            <a
            onClick={() => setCurrentWorkout("walking")} 
            data-testid="link" href="/walking"> Walking
          </a>
          </h4>
          <h4>
            <a
            onClick={() => setCurrentWorkout("swimming")} 
            data-testid="link" href="/swimming"> Swimming
          </a>
          </h4>
          <h4>
            <a
            onClick={() => setCurrentWorkout("biking")} 
            data-testid="link" href="/biking"> Biking
          </a>
          </h4>


        </div>
      </div>

    </header>
    <Calendar></Calendar>
    </>
=======
    <ExerciseList></ExerciseList>
>>>>>>> feature/styling
  );
}

export default Home;