const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing courses
  await User.deleteMany({});

  // Drop existing students
  await Thought.deleteMany({});

  // Create empty array to hold the students
  const users = [
    { name: 'Renee Santiago', email: 'reantiago@runner.net', friends: []},
    { name: 'Rei', email: 'sassylass@runner.net', friends: []},
  ];

  await User.collection.insertMany(users);
  
  const thoughts = [
    { thoughtText: 'Felt cute, might rob a bank later.', userId: users[1]._id },
    { thoughtText: 'A Runner is never truly alone.', userId: users[0]._id },
  ];
  
  await Thought.collection.insertMany(thoughts);



  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
