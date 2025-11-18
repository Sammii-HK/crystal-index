import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'API Documentation - Crystal Index',
  description: 'Complete API documentation for Crystal Index identification service',
}

export default function APIDocsPage() {
  return (
    <div className="container mt-5">
      <div className="box">
        <h1 className="title is-2">API Documentation</h1>
        <p className="subtitle is-5">
          Integrate crystal identification into your application
        </p>

        <div className="content mt-5">
          <div className="notification is-info is-light">
            <strong>API Access:</strong> Available for Retail/API tier subscribers.
            <Link href="/pricing" className="ml-2">
              View Pricing →
            </Link>
          </div>

          <h2 className="title is-4 mt-5">Authentication</h2>
          <p>
            All API requests require authentication using an API key. Include your API key in the request header:
          </p>
          <pre className="has-background-grey-lighter p-3">
            <code>Authorization: Bearer YOUR_API_KEY</code>
          </pre>

          <h2 className="title is-4 mt-5">Base URL</h2>
          <pre className="has-background-grey-lighter p-3">
            <code>https://crystalindex.co.uk/api</code>
          </pre>

          <h2 className="title is-4 mt-5">Endpoints</h2>

          <div className="box mt-4">
            <h3 className="title is-5">Identify Crystal</h3>
            <p className="subtitle is-6">Identify a crystal from an image</p>
            
            <p><strong>POST</strong> <code>/api/v1/identify</code></p>
            
            <h4 className="title is-6 mt-4">Request</h4>
            <pre className="has-background-grey-lighter p-3">
              <code>{`{
  "image": "base64_encoded_image_or_url",
  "removeBackground": true
}`}</code>
            </pre>

            <h4 className="title is-6 mt-4">Response</h4>
            <pre className="has-background-grey-lighter p-3">
              <code>{`{
  "id": "identification_id",
  "topMatches": [
    {
      "crystal": "Amethyst",
      "confidence": 0.95
    }
  ],
  "confidence": 0.95,
  "imageUrl": "https://...",
  "processedImageUrl": "https://..."
}`}</code>
            </pre>
          </div>

          <div className="box mt-4">
            <h3 className="title is-5">Get Crystal Information</h3>
            <p className="subtitle is-6">Retrieve detailed information about a crystal</p>
            
            <p><strong>GET</strong> <code>/api/v1/crystals/:id</code></p>
            
            <h4 className="title is-6 mt-4">Response</h4>
            <pre className="has-background-grey-lighter p-3">
              <code>{`{
  "id": 1,
  "name": "Amethyst",
  "chakra": ["Crown", "Third Eye"],
  "colour": ["Purple"],
  "crystalInfo": {
    "info": "Detailed information...",
    "colour": ["Purple"],
    "chakra": ["Crown", "Third Eye"]
  }
}`}</code>
            </pre>
          </div>

          <div className="box mt-4">
            <h3 className="title is-5">List Crystals</h3>
            <p className="subtitle is-6">Get a list of all available crystals</p>
            
            <p><strong>GET</strong> <code>/api/v1/crystals</code></p>
            
            <h4 className="title is-6 mt-4">Query Parameters</h4>
            <ul>
              <li><code>limit</code> - Number of results (default: 50)</li>
              <li><code>offset</code> - Pagination offset (default: 0)</li>
              <li><code>chakra</code> - Filter by chakra</li>
              <li><code>colour</code> - Filter by color</li>
            </ul>
          </div>

          <h2 className="title is-4 mt-5">Rate Limits</h2>
          <p>
            API requests are rate-limited based on your subscription tier:
          </p>
          <ul>
            <li><strong>Retail/API:</strong> 10,000 requests/month</li>
            <li>Rate limit headers are included in all responses</li>
          </ul>

          <h2 className="title is-4 mt-5">Error Responses</h2>
          <p>All errors follow this format:</p>
          <pre className="has-background-grey-lighter p-3">
            <code>{`{
  "error": "Error message",
  "code": "ERROR_CODE"
}`}</code>
          </pre>

          <h2 className="title is-4 mt-5">Getting Started</h2>
          <ol>
            <li>Subscribe to the Retail/API tier</li>
            <li>Generate an API key from your dashboard</li>
            <li>Start making requests!</li>
          </ol>

          <div className="box has-background-primary-light mt-5">
            <h3 className="title is-5">Need Help?</h3>
            <p>
              Contact us at <a href="mailto:support@crystalindex.co.uk">support@crystalindex.co.uk</a> or
              visit our <Link href="/pricing">pricing page</Link> to get started.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

