# Authorization API Troubleshooting Guide

## Issue: Authorization API Failures

### Common Problems & Solutions

#### 1. **404 on IP Address API**
**Fixed:** Added IP API proxy to `next.config.ts`

```typescript
{
  source: '/ip-api/:path*',
  destination: 'https://ipapi.co/:path*',
}
```

**Restart required:** You need to restart your dev server for this change to take effect:
```bash
# Stop the current server (Ctrl+C)
npm run dev
```

#### 2. **Authorization Token Issues**

The authorization flow works as follows:

1. **Request Format:**
```typescript
POST /api/v1/token/authorize
{
  "Context": {
    "UserAgent": "...",
    "TrackingId": "uuid",
    "TransactionId": "uuid",
    "IpAddress": "192.168.1.1"
  },
  "Request": "encrypted-request-string"
}
```

2. **Expected Response:**
```typescript
{
  "Context": {
    "StatusCode": 200,
    "Message": "Success"
  },
  "Response": {
    "Auth1dot0": {
      "ConsumerKey": "...",
      "ConsumerSecret": "...",
      "AccessToken": "...",
      "ExpiryAt": "..."
    }
  }
}
```

3. **After Success:**
   - Tokens are stored in Redux (`loginSlice`)
   - Tokens are saved to localStorage (`authStorage`)
   - Tokens are automatically included in all API requests

#### 3. **Default OAuth Credentials**

If authorization fails, the API proxy (`/api/v1/[...path]/route.ts`) falls back to default credentials:

```typescript
const DEFAULT_CONSUMER_KEY = "691c12acf0d20b6c9743d05a:CK:019bb263-3bd2-7112-9ad4-3ce0457df59d";
const DEFAULT_CONSUMER_SECRET = "cs019bb263-3bd2-7112-9ad4-3ce0457df59d";
const DEFAULT_ACCESS_TOKEN = "atv2019bb263-3bd2-7112-9ad4-3ce0457df59d";
```

These are used automatically if no authorization headers are provided.

#### 4. **Redux Persist Warning**

**Warning:** `redux-persist failed to create sync storage. falling back to noop storage.`

**Why:** This happens in server-side rendering (SSR) because localStorage doesn't exist on the server.

**Solution:** This is expected and doesn't break functionality. The warning can be ignored, or you can configure redux-persist to only work on the client:

```typescript
// In ReduxProvider.tsx
if (typeof window !== 'undefined') {
  // Only use persist on client side
}
```

#### 5. **Debugging Authorization**

To debug authorization issues:

1. **Check Browser Console:**
   - Look for "Authorization Request Body" logs
   - Check for any error messages

2. **Check Network Tab:**
   - Look for POST to `/api/v1/token/authorize`
   - Check request payload
   - Check response status and body

3. **Check Server Logs:**
   - Look for "[API Proxy]" messages
   - Check if OAuth headers are being sent

4. **Use the debugger:**
   The `useAuthorization` hook has a `debugger` statement at line 12. Open DevTools to inspect the flow.

### Testing Authorization

```typescript
import { useAuthorization } from '@/utils/hooks/useAuthorization';

const { authorize, isLoading, error } = useAuthorization();

// Call authorize with encrypted request
const handleAuth = async () => {
  try {
    const result = await authorize("encrypted-request-string");
    console.log("Auth success:", result);
  } catch (err) {
    console.error("Auth failed:", err);
  }
};
```

### API Endpoints Available

1. **Authorization:**
   - `POST /api/v1/token/authorize`

2. **Countries:**
   - `GET /api/v1/countries`

3. **Destinations:**
   - `GET /api/v1/destinations`
   - `GET /api/v1/destinations/top`

4. **Location:**
   - `GET /ip-api/json` (IP address)
   - `GET /api/v1/geoip?ip=...` (GeoIP lookup)

5. **Modes:**
   - `GET /api/v1/modes`

6. **Static Content:**
   - `GET /api/v1/static-content`

### Environment Variables

Add to `.env.local`:

```env
# API Base URLs
NEXT_PUBLIC_API_BASE_URL=https://saas.dev.api.musafirbiz.com
NEXT_PUBLIC_API_GATEWAY_URL=https://saas.dev.gateway.musafirbiz.com

# IP Address Service (optional, defaults to ipapi.co via proxy)
NEXT_PUBLIC_API_IP_FETCH_URL=https://ipapi.co

# OAuth (optional, has defaults)
NEXT_PUBLIC_CONSUMER_KEY=your-key
NEXT_PUBLIC_CONSUMER_SECRET=your-secret
NEXT_PUBLIC_ACCESS_TOKEN=your-token
```

### Next Steps

1. **Restart dev server** to apply the IP API proxy change
2. **Check browser console** for any authorization errors
3. **Check network tab** to see API request/response
4. **Provide error details** if still failing (status code, error message)

---

*Created: 2026-01-16*

