import mongoose from "mongoose";

export interface BaseActors extends mongoose.Document {
  did: string;
  actor: {},
}

/* Schema will correspond to a collection in your MongoDB database. */
const BaseActorSchema = new mongoose.Schema<BaseActors>({
  did: { 
      type: String, 
      required: true, 
      index: true, 
      unique: true
  },
  actor: {},
}, {
    timestamps: true,
    collection: 'base_actors'
  }
);

export default mongoose.models.BaseActor || mongoose.model<BaseActors>("BaseActor", BaseActorSchema);