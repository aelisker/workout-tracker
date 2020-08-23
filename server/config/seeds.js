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
    { name: 'Lower Body' },
    { name: 'Cardio' }
  ]);

  console.log('workout categories seeded');

  await IndividualExercise.deleteMany();

  // const individualExercise = await IndividualExercise.insertMany([
  await IndividualExercise.insertMany([
    {
      name: 'Bench Press',
      description:
        'Use a closed grip with a barbell to press upward from your chest.',
      videoLink: 'rxD321l2svE',
      imageName: 'bench-press-min.png',
      workoutCategory: workoutCategories[2]._id,
      trackReps: true,
      trackWeight: true
    },
    {
      name: 'Plank',
      description:
        'Lay face down with elbows holding you up. Keep core engaged.',
      videoLink: 'kL_NJAkCQBg',
      imageName: 'plank-min.png',
      workoutCategory: workoutCategories[4]._id,
      trackTime: true
    },
    {
      name: 'Back Squat',
      description: 
        'Place the barbell on your back, and bend at the knee while keeping a tight core until hips are at 90 degrees then press up.',
      videoLink: 'Dy28eq2PjcM',
      imageName: 'barbell-squat-min.png',
      workoutCategory: workoutCategories[5]._id,
      trackReps: true,
      trackWeight: true
    },
    {
      name: 'Military Press',
      description:
        'With the barbell in the front rack position press with your arms overhead until elbows are locked out',
      videoLink: '2yjwXTZQDDI',
      imageName: 'military-press-min.png',
      workoutCategory: workoutCategories[1]._id,
      trackReps: true,
      trackWeight: true
    },
    {
      name: 'Deadlift',
      description:
        'With the barbell resting on the ground, hinge at the waist and with a neutral back position place hands on the bar and lift from the floor.',
      videoLink: 'ytGaGIn3SjE',
      imageName: 'deadlift-min.png',
      workoutCategory: workoutCategories[3]._id,
      trackReps: true,
      trackWeight: true
    },
    {
      name: 'Dumbbell Curls',
      description:
        'Using a dumbbell in your hand bend at the elbow and sqeeze your bicep.',
      videoLink: 'in7PaeYlhrM',
      imageName: 'dumbbell-bicep-curl-min.jpg',
      workoutCategory: workoutCategories[0]._id,
      trackReps: true,
      trackWeight: true
    },
    {
      name: 'Push-Ups',
      description:
        'Place your hands on the floor as well as your toes, allow your body to descend to the floor and press up with your arms and squeeze your chest.',
      videoLink: 'IODxDxX7oi4',
      imageName: 'push-up-min.jpg',
      workoutCategory: workoutCategories[2]._id,
      trackReps: true,
    },
    {
      name: 'Pull-Up',
      description: 
        'Place your hands on the pull up bar, and squeeze from you lats while pulling yourself up to have your chin over the bar.',
      videoLink: '3YvfRx31xDE',
      imageName: 'pull-ups-min.jpg',
      workoutCategory: workoutCategories[3]._id,
      trackReps: true,
    },
    {
      name: 'Running',
      description:
        'Put one foot in front of the other and keep moving!',
      videoLink: '_kGESn8ArrU',
      imageName: 'high-knee-skips-min.png',
      workoutCategory: workoutCategories[6]._id,
      trackTime: true,
      trackDistance: true
    },
    {
      name: 'Biking',
      description:
        'On your bike keep pumping those legs!',
      videoLink: '4ssLDk1eX9w',
      imageName: 'bike-min.jpg',
      workoutCategory: workoutCategories[6]._id,
      trackTime: true,
      trackDistance: true
    },
    {
      name: 'Bent Over Row',
      description:
        'Using a barbell lift it from the ground to your waist, and then hinge at the waist and pull the barbell from the hanging position to your lower stomach while squeezing your lat muscles.',
      videoLink: 'T3N-TO4reLQ',
      imageName: 'bent-over-rows-min.png',
      workoutCategory: workoutCategories[3]._id,
      trackReps: true,
      trackWeight: true
    }
  ]);

  console.log('exercises seeded');

  await User.deleteMany();

  console.log('users seeded');

  await WorkoutRoutine.deleteMany();

  console.log('routines deleted');

  process.exit();
});