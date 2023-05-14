// models/RatingModel.ts
import mongoose, { Document, Model, Schema } from 'mongoose';

interface IRatingModel extends Document {
    rating: number;
    comment: string;
    createdAt: Date;
}

const RatingModelSchema: Schema = new mongoose.Schema({
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

const RatingModel: Model<IRatingModel> = mongoose.models.RatingModel || mongoose.model<IRatingModel>('RatingModel', RatingModelSchema);

export default RatingModel;
