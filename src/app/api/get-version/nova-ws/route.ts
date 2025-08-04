import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const version = "2.3.2";
    return NextResponse.json({ version });
  } catch (error) {
    console.error('Error fetching version:', error);
    
    return NextResponse.json({ version: "2.3.2" }, { status: 200 });
  }
}