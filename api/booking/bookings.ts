import type { VercelRequest, VercelResponse } from "@vercel/node";

// Example POST endpoint:
//   - Receives a JSON body with the booking form fields
//   - Validates them
//   - (Optional) Saves to a DB or sends an email
//   - Returns a success/error response

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Accept only POST (and optionally OPTIONS for CORS preflight).
  if (req.method === "POST") {
    try {
      const {
        serviceType,
        fullName,
        email,
        phone,
        projectDetails,
        dateTime, // e.g., "2025-02-15T10:00" or something similar
      } = req.body;

      // --- 1) Validate fields (simple example) ---
      if (!serviceType || !fullName || !email || !dateTime) {
        return res.status(400).json({
          error: "Missing required fields",
        });
      }

      // (Optional) Validate date format, phone, etc.
      // A library like Yup, Zod, or JOI can help for more robust validation.

      // --- 2) Save to DB or Perform Some Action ---
      //
      // For example, if you have a database connection, you’d do something like:
      //
      //  const booking = await db.booking.create({
      //    data: {
      //      serviceType,
      //      fullName,
      //      email,
      //      phone,
      //      projectDetails,
      //      dateTime,
      //    },
      //  });
      //
      // Or if you’re just emailing the details, call your email service here.

      // Fake success for the example
      return res.status(200).json({
        message: "Consultation booked successfully!",
        data: {
          serviceType,
          fullName,
          email,
          phone,
          projectDetails,
          dateTime
        }
      });
    } catch (err: any) {
      console.error("Error in bookConsultation.ts:", err);
      return res.status(500).json({ error: "Server error" });
    }
  } else {
    // For any non-POST requests, return a 405 (Method Not Allowed) or something similar
    return res.status(405).json({ error: "Method not allowed" });
  }
}
