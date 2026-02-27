import { NextResponse } from 'next/server';
import { fetchAppData } from '@/lib/data';

export const revalidate = 300; // 5 minutes

export async function GET() {
  try {
    const data = await fetchAppData();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Failed to load data' }, { status: 500 });
  }
}
