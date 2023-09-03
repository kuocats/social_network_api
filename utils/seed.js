const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing thoughts
  await Thought.deleteMany({});

  // Drop existing users
  await User.deleteMany({});

  // Create empty array to hold the users
  const users = [
    {
      username: "Ken",
      email: "ken@ken.com"
    },
    {
      username: "Alijah",
      email: "alijah@alijah.com"
    },
    {
      username: "Tygue",
      email: "tygue@tygue.com"
    },
    {
      username: "JJ",
      email: "jj@jj.com"
    }
  ];



  // Add students to the collection and await the results
  await User.collection.insertMany(users);
  
  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});