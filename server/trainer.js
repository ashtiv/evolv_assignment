import mongoose from "mongoose";
const Schema = mongoose.Schema;

const trainerSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 5,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            minlength: 5,
            lowercase: true,
        },
        userRefs: {
            type: [mongoose.Types.ObjectId],
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);
const trainers = mongoose.model('trainer', trainerSchema)
export default trainers;