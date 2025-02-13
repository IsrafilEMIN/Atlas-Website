import { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'

// Initialize the cors middleware
const cors = Cors({
  methods: ['GET', 'POST', 'HEAD', 'OPTIONS'],
  origin: ['https://atlas-paint.com', 'http://localhost:3000'], // Add any other allowed origins
  credentials: true,
})

// Helper method to wait for a middleware to execute before continuing
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }
      return resolve(result)
    })
  })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Run the middleware
  await runMiddleware(req, res, cors)
  
  // ... existing code ...
} 