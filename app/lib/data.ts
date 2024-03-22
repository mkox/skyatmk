import dbConnect from '@/app/lib/dbConnect';
import AtpActor, { AtpActors } from '@/models/atp-actor';
import BaseActor, { BaseActors } from '@/models/base-actor';
import FollowedAtpActorModel from '@/models/followed-atp-actor';
import { unstable_noStore as noStore } from 'next/cache';
import { BskyAgent } from '@atproto/api';

const agent = new BskyAgent({ service: "https://bsky.social" });
const identifier: string = process.env.ATPROT_AGENT_IDENTIFIER as string;
const password: string = process.env.ATPROT_AGENT_PASSWORD as string;

async function getActorByATC(profileId:string) {
  await agent.login({ identifier, password});
  var result = { data: {} };
  try {
    result = await agent.getProfile({actor: profileId});
  } catch(err) {
    console.log('error in getActorByATC on etProfile(): ', err);
  }
  return result.data;
}

export async function getAndStoreBaseActor(profileId:string) {
  var actor = getActorByATC(profileId);
  await dbConnect();
  // Insert data into MongoDB database
  const mDatabase = async () => {
    try {
      await BaseActor.create(actor);
      console.log('BaseActor data inserted');
    } catch (err) {
      console.error('Error mongodb database:', err);
    }
  };
  mDatabase().then(() => mongoose.disconnect());
}

export async function getBaseActors() {

}

export async function fetchAllActors() {
  noStore();
  await dbConnect();
  try {
    const actors = await AtpActor.find({}); /* find all the data of the collection */
    /*
    console.log('actors: ');
    console.log(actors);
    console.log('actors.length: ');
    console.log(actors.length);
    */
    return actors;

  } catch(err) {
    console.log('err for actors: ');
    console.log(err);
  }
  
}

