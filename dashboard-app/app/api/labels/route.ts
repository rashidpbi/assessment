import { NextResponse } from 'next/server';
import { proxyRequest } from '@/lib/api-client';

export async function GET() {
  try {
    const data = await proxyRequest('/api/labels');
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
