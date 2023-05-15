import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongo/dbConnect';
import RatingModel from '@/models/RatingModel';

type RatingData = {
  rating: number;
  comment: string;
};

const ratingsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db("sample_mflix");

    const movies = await db
        .collection("movies")
        .find({})
        .sort({ metacritic: -1 })
        .limit(10)
        .toArray();

    res.json(movies);
    } catch (e) {
      console.error(e);
  }

  /*
  if (req.method === 'POST') {
    try {
      const { rating, comment }: Rating = req.body;

      // Create a new rating instance
      const newRating = new RatingModel({
        rating,
        comment,
      });

      // Save the rating to the database
      await newRating.save();

      res.status(200).json({ message: 'Rating submitted successfully' });
    } catch (error) {
      console.error('Error saving rating to the database:', error);
      res.status(500).json({ message: 'Error saving rating to the database' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
  */
};

export default ratingsHandler;
