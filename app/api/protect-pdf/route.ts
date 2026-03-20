import { NextRequest, NextResponse } from 'next/server';

const RAILWAY_API_URL = process.env.RAILWAY_API_URL || 'https://dockitt-api-production.up.railway.app';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    
    const response = await fetch(`${RAILWAY_API_URL}/protect-pdf`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Server error' }));
      return NextResponse.json(error, { status: response.status });
    }

    const buffer = await response.arrayBuffer();
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="protected.pdf"',
      },
    });
  } catch (error) {
    console.error('protect-pdf error:', error);
    return NextResponse.json({ error: 'Failed to protect PDF' }, { status: 500 });
  }
}