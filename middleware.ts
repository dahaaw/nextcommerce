import { getSledgeSession } from '@sledge-app/api';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let lastSession: any = request.cookies.get('sledgeSession')?.value || '{}';
  lastSession = JSON.parse(lastSession);

  const sledgeApiKey = process.env.SLEDGE_API_KEY || '';
  const sledgeISKey = process.env.SLEDGE_IS_KEY || '';
  const sledgeSession: any = await getSledgeSession(
    lastSession,
    sledgeApiKey,
    sledgeISKey,
    '',
    '',
    ''
  );

  let response = NextResponse.next();

  // if no session save, redirect to save session
  if (!lastSession?.token || lastSession?.token !== sledgeSession?.token) {
    response = NextResponse.redirect(new URL('/', request.url));
  }

  response.cookies.set('sledgeSession', JSON.stringify(sledgeSession));

  return response;
}
