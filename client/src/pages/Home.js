import React from 'react';
import ExerciseList from '../components/ExerciseList';

function Home(props) {

  return (
    <header className="flex-row px-1 header-stylin">
      <ExerciseList></ExerciseList>
    </header>
  );
}

export default Home;