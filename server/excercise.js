import mongoose from "mongoose";
const Schema = mongoose.Schema;
import exerciseSetSchema from "exerciseSet.js";

const exerciseSchema = new Schema({
    name: {
        type: String,
    },
    exerciseSets: {
        type: [exerciseSetSchema],
        required: true,
    },
});

module.exports = exerciseSchema;