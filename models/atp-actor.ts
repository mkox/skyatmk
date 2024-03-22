import mongoose from "mongoose";

export interface AtpActors extends mongoose.Document {
  did: string;
  actor: {},
  followedDids: string[];
  baseActors: [],
  open: {}
}

/* Schema will correspond to a collection in your MongoDB database. */
const AtpActorSchema = new mongoose.Schema<AtpActors>({
  did: { 
      type: String, 
      required: true, 
      index: true, 
      unique: true
  },
  actor: {},
  followedDids: [String],
  baseActors: [],
  open: {},
}, {
    timestamps: true,
    collection: 'atp_actors'
  }
);

//export default mongoose.models.AtpActor || mongoose.model<AtpActors>("atp_actor", AtpActorSchema);
export default mongoose.models.AtpActor || mongoose.model<AtpActors>("AtpActor", AtpActorSchema); // AtpActor twice because auf error OverwriteModelError