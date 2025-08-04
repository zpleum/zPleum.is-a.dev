import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const version = "2.0";
    return NextResponse.json({ version });
  } catch (error) {
    console.error('Error fetching version:', error);
    
    return NextResponse.json({ version: "2.0" }, { status: 200 });
  }
}