import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const bookingData = req.body

    // TODO: Add your booking logic here
    // For example:
    // - Validate the booking data
    // - Save to database
    // - Send confirmation email
    // - etc.

    // For now, just echo back the received data
    return res.status(200).json({ 
      message: 'Booking received successfully',
      booking: bookingData 
    })
  } catch (error) {
    console.error('Booking error:', error)
    return res.status(500).json({ 
      message: 'Error processing booking request' 
    })
  }
} 