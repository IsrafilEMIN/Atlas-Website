import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const booking = req.body;
    
    // Add your booking logic here
    // For example, save to database, send confirmation email, etc.
    
    return res.status(200).json({ message: 'Booking created successfully' });
  } catch (error) {
    console.error('Booking error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
} 