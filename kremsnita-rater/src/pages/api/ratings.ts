import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from './db';
import RatingModel, { Rating } from './db';

type RatingData = {
  rating: number;
  comment: string;
};

const ratingsHandler = (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();

  if (req.method === 'POST') {
    // Handle the received rating and comment
    const { rating, comment }: RatingData = req.body;
    console.log(`Received rating: ${rating}, comment: ${comment}`);
   
    // Here you can perform any necessary operations with the received data, such as saving it to a database

    // For now, let's just send a response indicating success
    res.status(200).json({ message: 'Rating submitted successfully' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};


const ratingsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();

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
};

export default ratingsHandler;
