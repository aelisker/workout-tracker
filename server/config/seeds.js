const db = require('./connection');
const { User, IndividualExercise, WorkoutRoutine, WorkoutCategory } = require('../models');

db.once('open', async () => {
  await WorkoutCategory.deleteMany();

  const workoutCategories = await WorkoutCategory.insertMany([
    { name: 'Arms' },
    { name: 'Shoulders' },
    { name: 'Chest' },
    { name: 'Back' },
    { name: 'Core' },
    { name: 'Lower Body' }
  ]);

  console.log('workout categories seeded');

  await IndividualExercise.deleteMany();

  // const individualExercise = await IndividualExercise.insertMany([
  await IndividualExercise.insertMany([
    {
      name: 'Bench Press',
      description:
        'Use a closed grip with a barbell to press upward from your chest.',
      videoLink: 'https://www.youtube.com/watch?v=rxD321l2svE',
      workoutCategory: workoutCategories[2]._id,
      reps: 0,
      weight: 0,
      trackReps: true,
      trackWeight: true
    },
    {
      name: 'Plank',
      description:
        'Lay face down with elbows holding you up. Keep core engaged.',
      videoLink: 'https://www.youtube.com/watch?v=rxD321l2svE',
      workoutCategory: workoutCategories[4]._id,
      time: 0,
      trackTime: true
    }
  ]);

  console.log('exercises seeded');

  await User.deleteMany();

  await User.create({
    username: 'Test',
    email: 'test@testmail.com',
    password: 'password!'
  });

  console.log('users seeded');

  process.exit();
});
