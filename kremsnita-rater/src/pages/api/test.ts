// pages/api/some-api-route.ts
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/utils/dbConnect';
import YourModel from '@/models/RatingModel'; // import your model

dbConnect();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const entries = await YourModel.find({}); // finds all documents from your collection
        res.status(200).json({ success: true, data: entries });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    //... you can add more HTTP methods
    default:
      res.status(400).json({ success: false });
      break;
  }
};
