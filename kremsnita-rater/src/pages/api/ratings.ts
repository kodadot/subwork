import { NextApiRequest, NextApiResponse } from 'next';

type RatingData = {
  rating: number;
  comment: string;
};

const ratingsHandler = (req: NextApiRequest, res: NextApiResponse) => {
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

export default ratingsHandler;
