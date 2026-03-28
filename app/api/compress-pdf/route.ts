import { NextRequest, NextResponse } from 'next/server';

const RAILWAY_API_URL = process.env.RAILWAY_API_URL || 'https://dockitt-api-production.up.railway.app';

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const preset = formData.get("preset") as string ?? "email";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const railwayForm = new FormData();
    railwayForm.append("file", file);
    railwayForm.append("preset", preset);

    const response = await fetch(`${RAILWAY_API_URL}/compress-pdf`, {
      method: 'POST',
      body: railwayForm,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Server error' }));
      return NextResponse.json(error, { status: response.status });
    }

    const buffer = await response.arrayBuffer();
    const originalSize = response.headers.get('X-Original-Size') ?? '0';
    const compressedSize = response.headers.get('X-Compressed-Size') ?? '0';
    const reduction = response.headers.get('X-Reduction-Percent') ?? '0';

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="compressed.pdf"',
        'X-Original-Size': originalSize,
        'X-Compressed-Size': compressedSize,
        'X-Reduction-Percent': reduction,
        'Access-Control-Expose-Headers': 'X-Original-Size, X-Compressed-Size, X-Reduction-Percent',
      },
    });
  } catch (error) {
    console.error('compress-pdf error:', error);
    return NextResponse.json({ error: 'Failed to compress PDF' }, { status: 500 });
  }
}