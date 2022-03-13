import mongoose from "mongoose";
const Schema = mongoose.Schema;

const exerciseInfoSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
});

module.exports = exerciseInfoSchema;