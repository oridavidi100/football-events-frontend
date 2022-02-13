import mongoose from 'mongoose';
import { Event } from '../../@types/Event';

const EventSchema = new mongoose.Schema<Event>(
  {
    _id: { type: String, required: true },
    location: {
      type: String,
      required: true,
    },
    Players: [
      {
        type: mongoose.Schema.Types.String,
        ref: 'User',
      },
    ],
    date: {
      type: Date,
      required: true,
    },
    creator: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
  },
  { timestamps: true }
);

const Event = mongoose.model<Event>('Event', EventSchema);
export { Event };
