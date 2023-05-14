import mongoose, { ConnectOptions } from 'mongoose';
import { Schema, model, Document } from 'mongoose';


const connectDB = async () => {
  try {
    const dbOptions: ConnectOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    await mongoose.connect('mongodb://localhost:27017/kremsnita-ratings', dbOptions);
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};



interface Rating extends Document {
  rating: number;
  comment: string;
  createdAt: Date;
}

const ratingSchema = new Schema<Rating>({
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const RatingModel = model<Rating>('Rating', ratingSchema);

export { connectDB, RatingModel };

