import mongoose, { Schema } from "mongoose";

const eventSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  eventType: {
    type: String,
    required: true,
  },
  planTitle: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  }

});

export const Event = mongoose.model('Event', eventSchema);