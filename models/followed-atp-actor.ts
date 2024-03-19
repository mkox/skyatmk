import mongoose from "mongoose";

export interface FollowedAtpActors extends mongoose.Document {
    did: string;
    displayName: string;
    actor: {};
}

/* Schema will correspond to a collection in your MongoDB database. */
const FollowedAtpActorSchema = new mongoose.Schema<FollowedAtpActors>({
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
    timestamps: true,
    collection: 'followed_atp_actors'
  }
);

export default mongoose.models.FollowedAtpActor || mongoose.model<FollowedAtpActors>("FollowedAtpActor", FollowedAtpActorSchema);
