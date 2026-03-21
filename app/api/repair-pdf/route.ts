import { NextRequest, NextResponse } from 'next/server';

const RAILWAY_API_URL = process.env.RAILWAY_API_URL || 'https://dockitt-api-production.up.railway.app';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    
    const response = await fetch(`${RAILWAY_API_URL}/repair-pdf`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const text = await response.text();
      let message = 'Server error';
      try { message = JSON.parse(text).error; } catch {}
      return NextResponse.json({ error: message }, { status: response.status });
    }

    const buffer = await response.arrayBuffer();
    return new NextResponse(Buffer.from(buffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="repaired.pdf"',
      },
    });
  } catch (error) {
    console.error('repair-pdf error:', error);
    return NextResponse.json({ error: 'Failed to repair PDF' }, { status: 500 });
  }
}