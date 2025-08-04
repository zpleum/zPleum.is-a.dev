import { NextResponse } from 'next/server'

const hash = process.env.HASH_SECRET || 'None'
const API_KEY = process.env.API_KEY || 'None'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const key = searchParams.get('key')

  if (key !== API_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  return NextResponse.json({ hash })
}
