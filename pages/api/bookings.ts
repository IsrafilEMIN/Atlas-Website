import { NextApiRequest, NextApiResponse } from 'next'
import { insertBookingSchema } from '@/shared/schema'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const booking = req.body
    
    // Validate the booking data
    const validatedData = insertBookingSchema.parse(booking)

    // Here you would typically:
    // 1. Save the booking to your database
    // 2. Send confirmation emails
    // 3. Handle any other business logic

    // For now, we'll just return a success response
    return res.status(200).json({ 
      success: true, 
      message: 'Booking created successfully',
      data: validatedData 
    })

  } catch (error) {
    console.error('Booking error:', error)
    return res.status(400).json({ 
      success: false, 
      message: error instanceof Error ? error.message : 'Failed to create booking' 
    })
  }
} 