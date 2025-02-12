X-API-Key: your_api_key_here
```

## Available Endpoints

### 1. Create a New Review
- **Method**: POST
- **URL**: `https://your-vercel-domain.com/api/reviews`
- **Authentication**: Required (API Key)
- **Body** (JSON):
```json
{
  "bookingId": 1,
  "rating": 5,
  "comment": "Excellent service! Very professional team.",
  "customerName": "John Doe",
  "serviceType": "Interior Painting",
  "images": ["https://image-url1.com", "https://image-url2.com"]
}
```

### 2. Get All Published Reviews
- **Method**: GET
- **URL**: `https://your-vercel-domain.com/api/reviews/published`
- **Authentication**: Not required

### 3. Delete a Review
- **Method**: DELETE
- **URL**: `https://your-vercel-domain.com/api/reviews/{review_id}`
- **Authentication**: Required (API Key)

### 4. Update Review Publication Status
- **Method**: PATCH
- **URL**: `https://your-vercel-domain.com/api/reviews/{review_id}/publish`
- **Authentication**: Required (API Key)
- **Body** (JSON):
```json
{
  "isPublished": true
}