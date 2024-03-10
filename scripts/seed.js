require('dotenv').config({ path: ['.env.local', '.env'] });
//console.log('process.env:');
//console.log(process.env);

const mongoose = require('mongoose');
const { atpActors, followedAtpActors } = require('../app/lib/placeholder-data.js');
//const dbConnect = require('../app/lib/dbConnect.ts');
//const connectMongo = require('../app/lib/connect-mongo.ts');
//const AtpActor = require('../models/atp-actor.ts');
//const FollowedAtpActor = require('../models/followed-atp-actor.ts');

//dbConnect();
//connectMongo();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local",
  );
}

mongoose.connect(MONGODB_URI, {})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const AtpActorSchema = new mongoose.Schema({
  did: { 
      type: String, 
      required: true, 
      index: true, 
      unique: true
  },
  actor: {},
  followedDids: [String],
  standardFollower: {},
  open: {},
}, {
    timestamps: true
  }
);

const FollowedAtpActorSchema = new mongoose.Schema({
  did: { 
      type: String, 
      required: true, 
      index: true, 
      unique: true 
  },
  displayName: { 
      type: String, 
      required: true 
  },
  actor: {},
}, {
  timestamps: true
}
);

const AtpActor = mongoose.model('atp_actor', AtpActorSchema);
const FollowedAtpActor = mongoose.model('followed_atp_actor', FollowedAtpActorSchema);

// Insert data into MongoDB database
const seedDatabase = async () => {
  try {
    //await AtpActor.deleteMany({}); // Remove existing data
    //await FollowedAtpActor.deleteMany({});

    await AtpActor.insertMany(atpActors);
    console.log('AtpActor data inserted');

    await FollowedAtpActor.insertMany(followedAtpActors);
    console.log('FollowedAtpActor data inserted');

    console.log('Database successfully seeded');
  } catch (err) {
    console.error('Error seeding database:', err);
  }
};

seedDatabase().then(() => mongoose.disconnect());
