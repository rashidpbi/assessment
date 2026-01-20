import { NextRequest, NextResponse } from 'next/server';
import { proxyRequest } from '@/lib/api-client';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { key: string } }
) {
  try {
    const { key } = await params;
    const body = await request.json();
    const data = await proxyRequest(`/api/labels/${key}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
