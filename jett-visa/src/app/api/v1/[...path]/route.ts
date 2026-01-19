import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://saas.dev.api.musafirbiz.com';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params;
  return handleRequest(request, resolvedParams, 'GET');
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params;
  return handleRequest(request, resolvedParams, 'POST');
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params;
  return handleRequest(request, resolvedParams, 'PUT');
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params;
  return handleRequest(request, resolvedParams, 'DELETE');
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params;
  return handleRequest(request, resolvedParams, 'PATCH');
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, ConsumerKey, ConsumerSecret, AccessToken, Accept-Language',
      'Access-Control-Max-Age': '86400',
    },
  });
}

async function handleRequest(
  request: NextRequest,
  params: { path: string[] },
  method: string
) {
  try {
    const path = params.path.join('/');
    const url = new URL(request.url);
    const queryString = url.search;
    
    // Construct the full API URL
    const apiUrl = `${API_BASE_URL}/api/v1/${path}${queryString ? `?${queryString}` : ''}`;
    
    console.log(`[API Proxy] ${method} ${apiUrl}`);
    
    // Get headers from the request
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    // Forward OAuth headers if present
    const consumerKey = request.headers.get('ConsumerKey');
    const consumerSecret = request.headers.get('ConsumerSecret');
    const accessToken = request.headers.get('AccessToken');
    const acceptLanguage = request.headers.get('Accept-Language');
    
    // Use default credentials if headers are not provided
    const DEFAULT_CONSUMER_KEY = "691c12acf0d20b6c9743d05a:CK:019bb263-3bd2-7112-9ad4-3ce0457df59d";
    const DEFAULT_CONSUMER_SECRET = "cs019bb263-3bd2-7112-9ad4-3ce0457df59d";
    const DEFAULT_ACCESS_TOKEN = "atv2019bb263-3bd2-7112-9ad4-3ce0457df59d";
    
    const finalConsumerKey = consumerKey || DEFAULT_CONSUMER_KEY;
    const finalConsumerSecret = consumerSecret || DEFAULT_CONSUMER_SECRET;
    const finalAccessToken = accessToken || DEFAULT_ACCESS_TOKEN;
    
    headers['ConsumerKey'] = finalConsumerKey;
    headers['ConsumerSecret'] = finalConsumerSecret;
    headers['AccessToken'] = finalAccessToken;
    
    console.log(`[API Proxy] Using ConsumerKey: ${finalConsumerKey.substring(0, 20)}...`);
    console.log(`[API Proxy] Using ConsumerSecret: ${finalConsumerSecret.substring(0, 20)}...`);
    console.log(`[API Proxy] Using AccessToken: ${finalAccessToken.substring(0, 20)}...`);
    
    if (!consumerKey || !consumerSecret || !accessToken) {
      console.warn('[API Proxy] OAuth headers not provided in request, using default credentials');
    }
    
    if (acceptLanguage) headers['Accept-Language'] = acceptLanguage;
    
    // Prepare request options
    const requestOptions: RequestInit = {
      method,
      headers,
    };
    
    // Add body for POST, PUT, PATCH requests
    if (['POST', 'PUT', 'PATCH'].includes(method)) {
      try {
        const body = await request.json();
        requestOptions.body = JSON.stringify(body);
      } catch (e) {
        // If body is not JSON, try to get it as text
        try {
          const body = await request.text();
          if (body) {
            requestOptions.body = body;
          }
        } catch (textError) {
          // No body or error reading body
          console.warn('[API Proxy] Could not read request body');
        }
      }
    }
    
    // Make the API request
    let response: Response;
    try {
      response = await fetch(apiUrl, requestOptions);
    } catch (fetchError: any) {
      console.error('[API Proxy] Fetch error:', fetchError.message);
      return NextResponse.json(
        {
          error: 'Network error',
          message: fetchError.message || 'Failed to connect to API',
        },
        { status: 500 }
      );
    }
    
    // Get response data
    const data = await response.text();
    let jsonData;
    try {
      jsonData = JSON.parse(data);
    } catch (parseError) {
      // If parsing fails, return the raw data
      jsonData = data;
      console.warn('[API Proxy] Failed to parse JSON response:', parseError);
      console.warn('[API Proxy] Raw response:', data.substring(0, 200));
    }
    
    console.log(`[API Proxy] Response status: ${response.status}`);
    console.log(`[API Proxy] Response headers:`, Object.fromEntries(response.headers.entries()));
    
    // Log error responses for debugging
    if (!response.ok) {
      console.error('[API Proxy] Error response:', {
        status: response.status,
        statusText: response.statusText,
        data: typeof jsonData === 'object' ? jsonData : { raw: jsonData },
        headers: Object.fromEntries(response.headers.entries()),
      });
      
      // Log the actual request that was made
      console.error('[API Proxy] Request details:', {
        url: apiUrl,
        method: method,
        headers: Object.keys(headers),
        hasConsumerKey: !!headers['ConsumerKey'],
        hasConsumerSecret: !!headers['ConsumerSecret'],
        hasAccessToken: !!headers['AccessToken'],
      });
    } else {
      console.log('[API Proxy] Success response:', {
        status: response.status,
        dataKeys: typeof jsonData === 'object' && jsonData !== null ? Object.keys(jsonData) : 'not an object',
      });
    }
    
    // Return the response with appropriate status
    return NextResponse.json(jsonData, {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, ConsumerKey, ConsumerSecret, AccessToken, Accept-Language',
      },
    });
  } catch (error: any) {
    console.error('[API Proxy Error]:', error);
    console.error('[API Proxy Error Stack]:', error.stack);
    return NextResponse.json(
      {
        error: 'Failed to proxy request',
        message: error.message || 'Unknown error',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}

