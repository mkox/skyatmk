import dbConnect from '@/app/lib/dbConnect';
import AtpActor, { AtpActors } from '@/models/atp-actor';
import FollowedAtpActorModel from '@/models/followed-atp-actor';
import { unstable_noStore as noStore } from 'next/cache';

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

