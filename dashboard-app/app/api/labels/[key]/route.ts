import { NextRequest, NextResponse } from 'next/server';
import { proxyRequest } from '@/lib/api-client';

export async function PATCH(
  request: NextRequest,
  // 1. Change params to a Promise type
  { params }: { params: Promise<{ key: string }> }
) {
  try {
    // 2. Await the params object before destructuring
    const { key } = await params;
    
    const body = await request.json();
    
    // 3. Use the unwrapped key
    const data = await proxyRequest(`/api/labels/${key}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
