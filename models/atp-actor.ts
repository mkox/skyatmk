import mongoose from "mongoose";

export interface AtpActors extends mongoose.Document {
  did: string;
  actor: {},
  followedDids: string[];
  standardFollower: {},
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
  standardFollower: {},
  open: {},
}, {
    timestamps: true
  }
);

export default mongoose.models.AtpActor || mongoose.model<AtpActors>("AtpActor", AtpActorSchema);
