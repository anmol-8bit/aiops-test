import { NextRequest, NextResponse } from 'next/server';

let startTime = Date.now();

export async function GET(req: NextRequest) {
  const uptime = Math.floor((Date.now() - startTime) / 1000);
  const responseBody = {
    status: 'ok',
    uptime: uptime,
  };
  return NextResponse.json(responseBody, { status: 200 });
}